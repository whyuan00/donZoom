# crawl_reports.py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime,timedelta
import time
from dotenv import load_dotenv
import os
import requests
import json

# 환경 변수 로드
load_dotenv()

# OpenAI API 키 설정
api_key = os.getenv("OPENAI_API_KEY")  # .env 파일에서 API 키 로드

# 종목과 stockId 매핑 (key-value 형태)
stock_mapping = {
    1: "005930 삼성전자"
}

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
            {"role": "system", "content": "너는 종목분석 리포트 요약글을 아이들이 이해할 수 있도록 잘 설명해줄거야"},
            {"role": "user", "content": f"이 종목분석 리포트 요약글을 설명해줘: {text}"}
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
    
# Selenium 크롤링 함수 정의
def crawl_reports():
    # ChromeDriver 설정
    options = Options()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--headless')  # 백그라운드 모드
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    # 네이버 금융 리서치 페이지로 이동
    driver.get('https://finance.naver.com/research/company_list.naver')

    # 페이지 로딩을 기다리기 위해 최대 10초 동안 대기
    wait = WebDriverWait(driver, 10)

    # 전체 데이터 리스트를 저장할 리스트
    all_data_list = []

    # 모든 stockId에 대해 반복
    for stockId, stock_name in stock_mapping.items():
        print(f"{stock_name}의 데이터를 처리합니다...")

        # 종목명 입력란 클릭해서 팝업 창 띄우기
        search_input = wait.until(EC.element_to_be_clickable((By.NAME, 'itemName')))
        search_input.click()

        # 팝업 창이 뜨면 해당 창으로 전환
        driver.switch_to.window(driver.window_handles[-1])

        # 선택된 stockId에 맞는 종목 검색
        search_option = wait.until(EC.element_to_be_clickable((By.XPATH, f"//option[contains(text(), '{stock_name}')]")))
        search_option.click()

        # '확인' 버튼 클릭 (팝업에서 값 전송)
        choice_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//a[@href='javascript:choiceBtnClick()']")))
        choice_button.click()

        # 팝업 창 닫기 후 원래 창으로 전환
        driver.switch_to.window(driver.window_handles[0])

        # 페이지 로딩 대기
        time.sleep(2)

        # '검색' 버튼 클릭
        search_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//input[@alt='검색']")))
        search_button.click()

        # 오늘 날짜 가져오기 (예: '23.09.12' 형식)
        today = datetime.now().strftime("%y.%m.%d")

        # 오늘 날짜
        today = datetime.now()

        # 하루 전 날짜
        yesterday = today - timedelta(days=1)

        # 원하는 포맷으로 변환
        formatted_yesterday = yesterday.strftime("%y.%m.%d")

        # 리포트 목록을 담고 있는 테이블의 행 가져오기
        report_rows = driver.find_elements(By.XPATH, "//div[@class='box_type_m']//table//tr")

        # 리포트 목록을 담을 리스트 생성
        report_list = []

        # 오늘 날짜의 리포트만 출력 및 링크 저장
        for row in report_rows[2:]:  # 첫 번째와 두 번째 행은 제목 및 공백이므로 제외
            try:
                date_time = row.find_element(By.CSS_SELECTOR, 'td:nth-child(5)').text
                if date_time == formatted_yesterday:  # 게시일이 오늘 날짜와 일치하는지 확인
                    title = row.find_element(By.CSS_SELECTOR, 'td:nth-child(2) a').text
                    title_link = row.find_element(By.CSS_SELECTOR, 'td:nth-child(2) a').get_attribute('href')
                    report_list.append({'title': title, 'link': title_link, 'date_time': date_time})
            except Exception as e:
                continue
    
        # 저장된 목록을 순회하며 상세 조회 및 데이터 생성
        for report in report_list:
            driver.get(report['link'])
            time.sleep(2)

            # 본문 스크래핑
            try:
                report_title = driver.find_element(By.CSS_SELECTOR, '.view_sbj').text
                article_content = driver.find_element(By.CSS_SELECTOR, '.view_cnt').text

                # GPT API로 요약하기 (필요시 사용)
                #article_content = summarize_text(article_content)

                # 데이터 생성
                data = {
                    "title": report['title'],
                    "summary": article_content,
                    "date": report['date_time'],
                    "stockId": stockId  # 선택된 stockId 저장
                }
                all_data_list.append(data)  # 모든 데이터를 저장하는 리스트에 추가
            except Exception as e:
                print(f"오류 발생: {e}")

    # 최종 본문 데이터를 출력 (최종 한 번만 출력)
    for report in all_data_list:
        print(f"제목: {report['title']}")
        print(f"날짜: {report['summary']}")
        print(f"매체: {report['date']}")
        print(f"본문: {report['stockId']}")
        print("=" * 80)

    # 브라우저 종료
    driver.quit()

    return all_data_list

