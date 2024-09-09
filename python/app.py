from fastapi import FastAPI
from apscheduler.schedulers.background import BackgroundScheduler
from contextlib import asynccontextmanager
import yfinance as yf
import pytz
import requests
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

# 금 선물 티커 심볼 (Gold Futures)
gold_ticker = "GC=F"

# 시간대 설정
KST = pytz.timezone('Asia/Seoul')

# Spring Boot 서버의 엔드포인트 URL
spring_boot_url = os.getenv("SPRING_BOOT_URL")
print("SPRING BOOT URL:",spring_boot_url)
# 스케줄러 설정
scheduler = BackgroundScheduler()

# 데이터를 가져와서 Spring Boot 서버로 보내는 함수
def fetch_and_send_data():
    print(f"실시간 데이터 가져오기 시작: {datetime.now(KST)}")

    # 금 선물 데이터를 가져옴 (1분 간격 데이터)
    new_data = yf.download(gold_ticker, period="1d", interval="1m")
    print(new_data);
    # 데이터의 시간대를 한국 시간으로 변환
    if new_data.index.tzinfo is None:
        new_data.index = new_data.index.tz_localize('America/New_York').tz_convert(KST)
    else:
        new_data.index = new_data.index.tz_convert(KST)
    
    # 각 데이터를 Spring Boot 서버로 전송
    for timestamp, row in new_data.iterrows():
        close_price = row['Close']
        
        # 전송할 데이터 생성
        data = {
            "date": timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            "close": close_price
        }
        
        # Spring Boot 서버로 데이터 전송
        try:
            response = requests.post(spring_boot_url, json=data)
            print(data);
            if response.status_code == 200:
                print(f"데이터 전송 성공: {data}")
            else:
                print(f"데이터 전송 실패: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"요청 실패: {e}")

# 1분마다 실행되도록 스케줄러 설정 (1분마다 fetch_and_send_data 실행)
scheduler.add_job(fetch_and_send_data, 'interval', minutes=1)

# Lifespan 이벤트 핸들러 사용
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 앱 시작 시 스케줄러 시작
    scheduler.start()
    print("스케줄러가 시작되었습니다.")
    yield
    # 앱 종료 시 스케줄러 종료
    scheduler.shutdown()
    print("스케줄러가 종료되었습니다.")

# FastAPI 인스턴스 생성 및 lifespan 핸들러 연결
app = FastAPI(lifespan=lifespan)

# 기본 라우트
@app.get("/")
def read_root():
    return {"message": "스케줄러가 실행 중입니다. 1분마다 실시간 데이터를 가져와서 Spring Boot로 전송합니다."}

# 앱 실행 명령어
# uvicorn app:app --reload