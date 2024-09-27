from fastapi import FastAPI
from apscheduler.schedulers.background import BackgroundScheduler
from contextlib import asynccontextmanager
import yfinance as yf
import pytz
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

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
spring_boot_url = os.getenv('SPRING_BOOT_URL')
stock_path = os.getenv('STOCK_PATH')

save_stock_history_url = spring_boot_url + stock_path

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
    latest_timestamp = new_data.index[-1] + timedelta(minutes=10)
    latest_data = new_data.iloc[-1]
    
    # 데이터를 전송할 준비
    data = {
        "price": float(latest_data['Close']),
        "createdAt": latest_timestamp.strftime('%Y-%m-%dT%H:%M:%S')
    }
    
    print(f"전송할 데이터: {data}")
    return data

# 모든 종목 데이터를 가져오고 전송하는 함수
def fetch_and_send_data_all():
    for ticker, stockId in ticker_to_id_map.items():
        fetch_and_send_data(ticker, stockId)

# 1분마다 모든 종목에 대해 데이터를 가져오고 전송하는 스케줄러 설정
scheduler.add_job(fetch_and_send_data_all, 'interval', minutes=1)

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
# uvicorn app:app --reload --port 8082


# 앱 실행 명령어
# uvicorn app:app --reload --port 8082
# uvicorn.run(app, host="0.0.0.0", port=8082, reload=true)
