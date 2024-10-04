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
from crawl_world_news import crawl_world_news 
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.date import DateTrigger
from datetime import datetime, timedelta
from apscheduler.triggers.cron import CronTrigger
import pytz


# 종목과 stockId 매핑 (key-value 형태)
stock_mapping = {
    1: "005930",  # 삼성전자
    2: "066570",  # LG전자
    3: "035420",  # 네이버
    4: "035720"   # 카카오
}
world_stock_mapping = {
    6 : "AAPL",
    7:  "GOOGL",
    8: "TSLA"
}

# 종목과 stockId 매핑 (key-value 형태)
stock_mapping_report = {
    1: "005930 삼성전자",
    2: "066570 LG전자",
    3: "035420 NAVER",
    4: "035720 카카오"
}

# 종목과 stockId 매핑 (key-value 형태)
ticker_to_id_map = {
    "005930.KS": 1,  # 삼성전자
    "066570.KS": 2,  # LG전자
    "035420.KS": 3,  # 네이버
    "035720.KS": 4,  # 카카오
    "GC=F": 5,       # 금 선물
    "AAPL": 6,
    "GOOGL": 7,
    "TSLA": 8
}

# 환경 변수 로드
load_dotenv()

# 시간대 설정
KST = pytz.timezone('Asia/Seoul')
EST = pytz.timezone('America/New_York')

# Spring Boot 서버의 엔드포인트 URL
# spring_boot_url = os.getenv("SPRING_BOOT_URL", "http://donzoom:8081")
# stock_path = os.getenv("STOCK_PATH", "/stock")
# news_path = os.getenv("NEWS_PATH", "/news")
# report_path = os.getenv("REPORT_PATH", "/report")
spring_boot_url = os.getenv('SPRING_BOOT_URL')
stock_path = os.getenv('STOCK_PATH')
news_path = os.getenv('NEWS_PATH')
report_path = os.getenv('REPORT_PATH')
save_stock_history_url = spring_boot_url + stock_path


save_stock_history_url = spring_boot_url + stock_path
save_news_URL = spring_boot_url + news_path
save_report_URL = spring_boot_url + report_path

print(save_report_URL)

# 스케줄러 설정
scheduler = BackgroundScheduler()

# 특정 주식이나 금 데이터를 가져오고 Spring Boot 서버로 전송하는 함수
def fetch_and_send_data(ticker, stockId):
    now_kst = datetime.now(KST)
    now_est = datetime.now(EST)

    # 국내 주식: 9시 ~ 14시 30분
    if ticker.endswith(".KS"):
        if now_kst.hour < 9 or (now_kst.hour == 14 and now_kst.minute > 30) or now_kst.hour > 14:
            print(f"{ticker} - 현재 시간 {now_kst}. 국내 주식은 거래 시간이 아닙니다.")
            return

    # 금 선물: 오전 7시 ~ 다음날 오전 6시
    if ticker == "GC=F":
        if now_kst.hour < 7 and now_kst.hour >= 6:
            print(f"{ticker} - 현재 시간 {now_kst}. 금 선물은 거래 시간이 아닙니다.")
            return

    # 해외 주식: 밤 11시 30분 ~ 새벽 5시
    if ticker in ["AAPL", "GOOGL", "TSLA"]:
        if (now_est.hour < 23 or (now_est.hour == 23 and now_est.minute < 30)) or now_est.hour >= 5:
            print(f"{ticker} - 현재 시간 {now_est}. 해외 주식은 거래 시간이 아닙니다.")
            return

    print(f"실시간 데이터 가져오기 시작: {now_kst} - {ticker}")

    # 데이터 다운로드 (1분 간격 데이터)
    new_data = yf.download(ticker, period="1d", interval="1m")

    if new_data.empty:
        print(f"{ticker}에 대한 데이터 없음. 전송 중단.")
        return
    
    # 타임존에 맞게 시간 변환
    new_data.index = new_data.index.tz_convert(KST)
    
    # 가장 최신 데이터 가져오기
    if ticker in ["AAPL", "GOOGL", "TSLA","GC=F"]:
        latest_timestamp = new_data.index[-1] + timedelta(minutes=10)
    else:
         latest_timestamp = new_data.index[-1] + timedelta(minutes=20)
    latest_data = new_data.iloc[-1]
    
    # 데이터를 전송할 준비
    data = {
        "price": float(latest_data['Close']),
        "createdAt": latest_timestamp.strftime('%Y-%m-%dT%H:%M:%S')
    }
    
    print(f"전송할 데이터: {data}")
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

    return data

# 모든 종목 데이터를 가져오고 전송하는 함수
def fetch_and_send_data_all():
    for ticker, stockId in ticker_to_id_map.items():
        fetch_and_send_data(ticker, stockId)



# 뉴스 데이터 Spring Boot 서버로 전송 (모든 stockId에 대해 반복)
def send_news_data():
    for stockId in stock_mapping.keys():
        all_articles = crawl_news(stockId)

        if not all_articles:
            print(f"stockId {stockId}에 대한 뉴스가 없습니다.")
            continue

        try:
            print(f"stockId {stockId}에 대한 뉴스 본문 전송 시작")
            response = requests.post(save_news_URL + "/" + str(stockId), json=all_articles, headers={'Content-Type': 'application/json'})

            if response.status_code == 200:
                print(f"stockId {stockId}에 대한 뉴스 본문 전송 성공: {len(all_articles)}개 기사")
            else:
                print(f"stockId {stockId}에 대한 뉴스 본문 전송 실패: {response.status_code}")
        
        except requests.exceptions.RequestException as e:
            print(f"stockId {stockId}에 대한 요청 실패: {e}")


# 월드 뉴스 데이터를 Spring Boot 서버로 전송하는 함수 (모든 stockId에 대해 반복)
def send_worldNews_data():
    for stockId in world_stock_mapping.keys():
        all_world_news = crawl_world_news(stockId)
        if not all_world_news:
            print(f"stockId {stockId}에 대한 월드 뉴스가 없습니다.")
            continue

        try:
            print(f"stockId {stockId}에 대한 월드 뉴스 본문 전송 시작")
            response = requests.post(save_news_URL + "/" + str(stockId), json=all_world_news, headers={'Content-Type': 'application/json'})

            if response.status_code == 200:
                print(f"stockId {stockId}에 대한 월드 뉴스 본문 전송 성공: {len(all_world_news)}개 기사")
            else:
                print(f"stockId {stockId}에 대한 월드 뉴스 본문 전송 실패: {response.status_code}")
        
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
            print(f"stockId {stockId}에 대한 리포트 본문 전송 시작")
            response = requests.post(save_report_URL + "/" + str(stockId), json=reports, headers={'Content-Type': 'application/json'})

            if response.status_code == 200:
                print(f"stockId {stockId}에 대한 리포트 본문 전송 성공: {len(reports)}개 리포트")
            else:
                print(f"stockId {stockId}에 대한 리포트 본문 전송 실패: {response.status_code}")

        except requests.exceptions.RequestException as e:
            print(f"stockId {stockId}에 대한 요청 실패: {e}")



#현재 시간 가져오기
now = datetime.now(KST)

# 1분마다 모든 종목에 대해 데이터를 가져오고 전송하는 스케줄러 설정
scheduler.add_job(fetch_and_send_data_all, 'interval', minutes=1)
# 국내주식 뉴스 기사를 가져오고 바로 본문을 가져오도록 스케줄러 설정
scheduler.add_job(send_news_data,  trigger=CronTrigger(hour=14, minute=45))
#scheduler.add_job(send_news_data, trigger=DateTrigger(run_date=now))

# 리포트를 가져오고 바로 본문을 가져오도록 스케줄러 설정
scheduler.add_job(send_reports_to_springboot,  trigger=CronTrigger(hour=14, minute=55)) #'cron', hour=13, minute=24, timezone=KST)
#scheduler.add_job(send_reports_to_springboot, trigger=DateTrigger(run_date=now))

# 해외주식 뉴스기사를 가져오고 바로 본문을 가져오도록 스케줄러 설정
#scheduler.add_job(send_reports_to_springboot, trigger=DateTrigger(run_date=now))
scheduler.add_job(send_worldNews_data,  trigger=CronTrigger(hour=14, minute=50))

# Lifespan 이벤트 핸들러 사용
@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.start()
    print("스케줄러가 시작되었습니다.")
    yield
    scheduler.shutdown()
    print("스케줄러가 종료되었습니다.")

app = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"message": "스케줄러가 실행 중입니다."}


# 앱 실행 명령어
# uvicorn main:app --reload --port 8082


# 앱 실행 명령어
# uvicorn app:app --reload --port 8082
# uvicorn.run(app, host="0.0.0.0", port=8082, reload=true)
