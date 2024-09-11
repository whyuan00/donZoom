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
import json

# 환경 변수 로드
load_dotenv()

# OpenAI API 키 설정
api_key = os.getenv("OPENAI_API_KEY")  # .env 파일에서 API 키 로드

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
save_stock_history_url = spring_boot_url+stock_path
save_news_URL = spring_boot_url+news_path

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

# GPT 요약 함수
def summarize_text(text):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    payload = {
        "model": "gpt-4o",
        "messages": [
            {"role": "system", "content": "너는 경제뉴스 기사를 7살 이하의 아이들이 이해할 수 있게 설명해주는 역할을 맡고 있어. 금리같은 경제단어는 뜻을 같이 말해줘. 요약한 티 내지말고"},
            {"role": "user", "content": f"이 뉴스 기사를 아이들이 이해할 수 있게 쉽게 풀어주고 요약해줘: {text}"}
        ]
    }
    
    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()  # HTTPError 발생 시 예외 발생
        data = response.json()
        summary = data['choices'][0]['message']['content'].strip()
        return summary
    except requests.exceptions.RequestException as e:
        print(f"GPT API 요청 실패: {e}")
        return text  # 요약 실패 시 원본 텍스트 반환


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
                "createdAt": adjusted_timestamp.strftime('%Y-%m-%dT%H:%M:%S'),
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

def fetch_news_articles():
    global all_news_data
    print(f"뉴스 기사를 가져오기 시작: {datetime.now(KST)}")

    # 오늘 날짜를 YYYYMMDD 형식으로 생성
    today = datetime.now(KST).strftime('%Y%m%d')

    # 뉴스 목록 페이지 URL
    base_url = "https://finance.naver.com"
    topics = [
        {"id": 401, "name": "시황,전망"},
        {"id": 404, "name": "채권,선물"}
    ]
    
    for topic in topics:
        url = f"{base_url}/news/news_list.naver?mode=LSS3D&section_id=101&section_id2=258&section_id3={topic['id']}&date={today}"
        print(f"URL: {url}")

        # 크롬 드라이버에 URL 주소 넣고 실행
        driver.get(url)

        # 페이지가 완전히 로딩되도록 10초 대기
        time.sleep(3)

        # 기사 목록 가져오기 (li.newsList top 내부의 dl 태그)
        articles = driver.find_elements(By.CSS_SELECTOR, 'li.newsList.top')

        # 상위 5개의 dd.articleSubject 가져오기
        for article in articles:
            dl_tag = article.find_element(By.TAG_NAME, 'dl')
            
            # 제목과 링크 가져오기
            subject_dd = dl_tag.find_elements(By.CSS_SELECTOR, 'dd.articleSubject')
            
            # 상위 5개 dd.articleSubject 가져오기
            for subject in subject_dd[:5]:
                link_tag = subject.find_element(By.TAG_NAME, 'a')
                article_title = link_tag.text
                article_url = link_tag.get_attribute('href')

                # 뉴스 링크를 리스트에 저장 (주제 ID 포함)
                all_news_data.append({
                    "topic_id": topic["id"],
                    "title": article_title,
                    "url": article_url
                })

                # 기사 정보 출력
                print(f"Title: {article_title}")
                print(f"URL: {article_url}")
                print("-" * 40)

    # 기사 본문 가져오기
    fetch_article_contents()

def fetch_article_contents():
    global all_news_data
    print(f"기사 본문 가져오기 시작: {datetime.now(KST)}")

    all_articles = []

    for news in all_news_data:
        title = news["title"]
        url = news["url"]
        topic_id = news["topic_id"]

        # 기사 본문 페이지로 이동
        driver.get(url)

        # 새로운 페이지가 완전히 로드될 때까지 대기
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'div.newsct_article'))
        )

        # 본문 추출
        article_div = driver.find_element(By.CSS_SELECTOR, 'div.newsct_article')
        article_content = article_div.find_element(By.CSS_SELECTOR, 'article.go_trans').text

        # 날짜와 시간 추출 (class="media_end_head_info_datestamp_bunch" 내의 data-date-time 속성에서 가져오기)
        date_time_element = driver.find_element(By.CSS_SELECTOR, 'div.media_end_head_info_datestamp_bunch span.media_end_head_info_datestamp_time._ARTICLE_DATE_TIME')
        date_time_str = date_time_element.get_attribute('data-date-time')  # data-date-time 속성에서 값을 가져옴
        date_time = datetime.strptime(date_time_str, "%Y-%m-%d %H:%M:%S")  # 날짜와 시간 문자열을 datetime 객체로 변환
       
        # GPT API로 요약하기
        #article_content = summarize_text(article_content)

        # 데이터 생성
        data = {
            "title": title,
            "summary": article_content,
            "date_time": date_time,
            "topic_id": topic_id  # 주제 ID 포함
        }

        # 기사 정보를 리스트에 추가
        all_articles.append(data)

        # 기사 정보 출력
        print(f"Title: {title}")
        print(f"Summary: {article_content}")
        print(f"DateTime: {date_time}")
        print(f"Topic ID: {topic_id}")
        print("-" * 40)

    # 뉴스 데이터 리스트를 Spring Boot 서버로 전송
    send_news_data(all_articles)

    # 뉴스 데이터 리스트 초기화
    all_news_data = []

    # 드라이버 종료
    driver.quit()

def send_news_data(all_articles):
    print(all_articles)
    try:
        print("뉴스 본문 전송 시작")
        response = requests.post(save_news_URL, json={"articles": all_articles}, headers={'Content-Type': 'application/json'})
        if response.status_code == 200:
            print(f"뉴스 본문 전송 성공: {len(all_articles)}개 기사")
        else:
            print(f"뉴스 본문 전송 실패: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"요청 실패: {e}")

# 1분마다 실행되도록 스케줄러 설정 (1분마다 fetch_gold_data 실행)
scheduler.add_job(fetch_and_send_data, 'interval', minutes=1, args=[gold_ticker])

# 매일 오후 4시 20분에 뉴스 기사를 가져오고 바로 본문을 가져오도록 스케줄러 설정
scheduler.add_job(fetch_news_articles, 'cron', hour=16, minute=43, timezone=KST)

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
