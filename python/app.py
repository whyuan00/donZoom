from fastapi import FastAPI
from apscheduler.schedulers.background import BackgroundScheduler
from contextlib import asynccontextmanager
import yfinance as yf
import pytz
import requests
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from crawl_reports import crawl_reports  # 크롤링 모듈 임포트
from crawl_news import crawl_news
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.date import DateTrigger
from datetime import datetime, timedelta
import pytz

# 종목과 stockId 매핑 (key-value 형태)
stock_mapping = {
    1: "005930",  # 삼성전자
    2: "001210"   # 금호전기
}

# 종목과 stockId 매핑 (key-value 형태)
stock_mapping_report = {
    1: "005930 삼성전자",
    2: "001210 금호전기"   # 금호전기
}

# 환경 변수 로드
load_dotenv()

# ChromeDriver 설정 (전역 변수로 설정)
chrome_options = Options()
chrome_options.add_argument("--headless")  # 헤드리스 모드 활성화
chrome_options.add_argument("--no-sandbox")  # 필요 시 추가
chrome_options.add_argument("--disable-dev-shm-usage")  # 필요 시 추가
chrome_options.add_argument('--disable-gpu')  # 필요 시 추가
chrome_options.add_argument('window-size=1920x1080')  # 화면 크기 설정 (필요 시)

# ChromeDriver 설정 (전역 변수로 설정)
driver = webdriver.Chrome(executable_path='/usr/bin/chromedriver', options=chrome_options)

# 금 선물 티커 심볼 (Gold Futures)
gold_ticker = "GC=F"

# 시간대 설정
KST = pytz.timezone('Asia/Seoul')

# Spring Boot 서버의 엔드포인트 URL
spring_boot_url = os.getenv("SPRING_BOOT_URL")
stock_path = os.getenv("STOCK_PATH")
news_path = os.getenv("NEWS_PATH")
report_path = os.getenv("REPORT_PATH")
save_stock_history_url = spring_boot_url + stock_path
save_news_URL = spring_boot_url + news_path
save_report_URL = spring_boot_url + report_path

# 스케줄러 설정
scheduler = BackgroundScheduler()

ticker_to_id_map = {
    "GC=F": 1,
    "AAPL": 2,
    "MSFT": 3
}

# 데이터를 가져와서 Spring Boot 서버로 보내는 함수
header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'}

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
        response = requests.post(save_stock_history_url + "/" + str(stockId), json=data)
        print(data)
        if response.status_code == 200:
            print(f"데이터 전송 성공: {data}")
        else:
            print(f"데이터 전송 실패: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"요청 실패: {e}")

# 뉴스 데이터 Spring Boot 서버로 전송 (모든 stockId에 대해 반복)
def send_news_data():
    for stockId in stock_mapping.keys():
        # 각 stockId에 대한 뉴스 크롤링
        all_articles = crawl_news(stockId)

        if not all_articles:
            print(f"stockId {stockId}에 대한 뉴스가 없습니다.")
            continue

        try:
            # Spring Boot 서버로 뉴스 데이터 전송
            print(f"stockId {stockId}에 대한 뉴스 본문 전송 시작")
            response = requests.post(save_news_URL + "/" + str(stockId), json=all_articles, headers={'Content-Type': 'application/json'})

            if response.status_code == 200:
                print(f"stockId {stockId}에 대한 뉴스 본문 전송 성공: {len(all_articles)}개 기사")
            else:
                print(f"stockId {stockId}에 대한 뉴스 본문 전송 실패: {response.status_code}")

        except requests.exceptions.RequestException as e:
            print(f"stockId {stockId}에 대한 요청 실패: {e}")

# 리포트 데이터를 Spring Boot 서버로 전송하는 함수
def send_reports_to_springboot():
    for stockId in stock_mapping_report.keys():
        reports = crawl_reports(stockId)

        if not reports:
            print(f"stockId {stockId}에 대한 리포트가 없습니다.")
            continue

        try:
            # Spring Boot 서버로 리포트 데이터 전송
            print(f"stockId {stockId}에 대한 리포트 본문 전송 시작")
            response = requests.post(save_report_URL + "/" + str(stockId), json=reports, headers={'Content-Type': 'application/json'})

            if response.status_code == 200:
                print(f"stockId {stockId}에 대한 리포트 본문 전송 성공: {len(reports)}개 리포트")
            else:
                print(f"stockId {stockId}에 대한 리포트 본문 전송 실패: {response.status_code}")

        except requests.exceptions.RequestException as e:
            print(f"stockId {stockId}에 대한 요청 실패: {e}")

# 1분마다 실행되도록 스케줄러 설정 (1분마다 fetch_gold_data 실행)
scheduler.add_job(fetch_and_send_data, 'interval', minutes=1, args=[gold_ticker])

# 현재 시간 가져오기
now = datetime.now(KST)

# 뉴스 기사를 가져오고 바로 본문을 가져오도록 스케줄러 설정
scheduler.add_job(send_news_data, trigger=DateTrigger(run_date=now))

# 리포트를 가져오고 바로 본문을 가져오도록 스케줄러 설정
scheduler.add_job(send_reports_to_springboot, trigger=DateTrigger(run_date=now))

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
