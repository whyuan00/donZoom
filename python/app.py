from fastapi import FastAPI
from apscheduler.schedulers.background import BackgroundScheduler
from contextlib import asynccontextmanager
import yfinance as yf
import pytz
import requests
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from pathlib import PurePosixPath
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from crawl_reports import crawl_reports  # 크롤링 모듈 임포트
from crawl_news import crawl_news 
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.date import DateTrigger
from datetime import datetime, timedelta
import pytz

# 환경 변수 로드
load_dotenv()

# ChromeDriver 설정 (전역 변수로 설정)
chrome_options = Options()
chrome_options.add_argument("--headless")  # 헤드리스 모드 활성화
chrome_options.add_argument("--no-sandbox")  # 필요 시 추가
chrome_options.add_argument("--disable-dev-shm-usage")  # 필요 시 추가

# ChromeDriver 설정 (전역 변수로 설정)
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

# 금 선물 티커 심볼 (Gold Futures)
gold_ticker = "GC=F"

# 시간대 설정
KST = pytz.timezone('Asia/Seoul')

# Spring Boot 서버의 엔드포인트 URL
spring_boot_url = os.getenv("SPRING_BOOT_URL")
stock_path = os.getenv("STOCK_PATH")
news_path = os.getenv("NEWS_PATH")
report_path = os.getenv("REPORT_PATH")
save_stock_history_url = spring_boot_url+stock_path
save_news_URL = spring_boot_url+news_path
save_report_URL = spring_boot_url+report_path

# 스케줄러 설정
scheduler = BackgroundScheduler()

ticker_to_id_map = {
    "GC=F": 1,
    "AAPL": 2,
    "MSFT": 3
}


# 데이터를 가져와서 Spring Boot 서버로 보내는 함수

header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'}

# 뉴스 기사 정보를 저장할 리스트
all_news_data = []


# 데이터를 가져오는 함수
def fetch_and_send_data(ticker):
    print(f"실시간 데이터 가져오기 시작: {datetime.now(KST)}")
    
    # 금 선물 데이터를 가져옴 (1분 간격 데이터)
    new_data = yf.download(ticker, period="1d", interval="1m")
    # 데이터의 시간대를 한국 시간으로 변환
    if new_data.index.tzinfo is None:
        new_data.index = new_data.index.tz_localize('America/New_York').tz_convert(KST)
    else:
        new_data.index = new_data.index.tz_convert(KST)
    
    now = datetime.now(KST)

    data = {}
    # 데이터 출력
    for timestamp, row in new_data.iterrows():
        close_price = row['Close']
        # 타임스탬프에 10분을 더한 시간 계산
        adjusted_timestamp = timestamp + timedelta(minutes=11)    
        # 조정된 타임스탬프가 현재 시각과 같거나 커야 함
        if adjusted_timestamp >= now:
            # 전송할 데이터 생성
            data = {
                "price": float(close_price),
                "createdAt": adjusted_timestamp.strftime('%Y-%m-%dT%H:%M:%S')
            }
            print(data)
    # Spring Boot 서버로 데이터 전송
    stockId = ticker_to_id_map.get(ticker)
    try:
        response = requests.post(save_stock_history_url+"/"+str(stockId), json=data)
        print(data)
        if response.status_code == 200:
            print(f"데이터 전송 성공: {data}")
        else:
            print(f"데이터 전송 실패: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"요청 실패: {e}")


# 뉴스 데이터 Spring Boot 서버로 전송
def send_news_data():

    all_articles = crawl_news()
   
    try:
        print("뉴스 본문 전송 시작")
        response = requests.post(save_news_URL, json={"articles": all_articles}, headers={'Content-Type': 'application/json'})
        if response.status_code == 200:
            print(f"뉴스 본문 전송 성공: {len(all_articles)}개 기사")
        else:
            print(f"뉴스 본문 전송 실패: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"요청 실패: {e}")


# Spring Boot로 데이터 전송하는 함수
def send_reports_to_springboot():
    print(f"리포트 크롤링 및 전송 시작: {datetime.now(KST)}")
    
    # 크롤링 함수 호출
    reports = crawl_reports()
    
    # Spring Boot 서버로 전송
    for report in reports:
        try:
            response = requests.post(save_report_URL, json=report, headers={'Content-Type': 'application/json'})
            if response.status_code == 200:
                print(f"리포트 전송 성공: {report['title']}")
            else:
                print(f"리포트 전송 실패: {response.status_code}, {report['title']}")
        except requests.exceptions.RequestException as e:
            print(f"리포트 전송 오류 발생: {e}")



# 1분마다 실행되도록 스케줄러 설정 (1분마다 fetch_gold_data 실행)
scheduler.add_job(fetch_and_send_data, 'interval', minutes=1, args=[gold_ticker])



# 현재 시간 가져오기
now = datetime.now(KST)

# 1분 후 시간 계산
#one_minute_later =  + timedelta(minutes=1)

# 뉴스 기사를 가져오고 바로 본문을 가져오도록 스케줄러 설정
scheduler.add_job(send_news_data, trigger=DateTrigger(run_date=now))

# 리포트를 가져오고 바로 본문을 가져오도록 스케줄러 설정
scheduler.add_job(send_reports_to_springboot, trigger=DateTrigger(run_date=now)) #'cron', hour=13, minute=24, timezone=KST)

# Lifespan 이벤트 핸들러 사용
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 앱 시작 시 스케줄러 시작
    scheduler.start()
    print("스케줄러가 시작되었습니다.")
    fetch_and_send_data(gold_ticker)
    yield
    # 앱 종료 시 스케줄러 종료
    scheduler.shutdown()
    print("스케줄러가 종료되었습니다.")

# FastAPI 인스턴스 생성 및 lifespan 핸들러 연결
app = FastAPI(lifespan=lifespan)

# 기본 라우트
@app.get("/")
def read_root():
    return {"message": "스케줄러가 실행 중입니다."}

# 앱 실행 명령어
# uvicorn app:app --reload --port 8082
