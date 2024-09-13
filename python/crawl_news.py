from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime

# ChromeDriver 설정
chrome_options = Options()
chrome_options.add_argument("--headless")  # 헤드리스 모드 활성화
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# 종목과 stockId 매핑 (key-value 형태)
stock_mapping = {
    1: "005930",  # 삼성전자
    2: "001210"   # 금호전기
}

# 뉴스 기사 크롤링 함수 (제목과 링크 먼저 가져오기)
def crawl_news():
    print(f"뉴스 목록을 가져오기 시작: {datetime.now()}")

    # 크롬 드라이버 설정
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    # 네이버 금융 종목 뉴스 페이지 URL
    base_url = "https://finance.naver.com"

    datalist = []  # 최종 본문 데이터를 저장할 리스트

    # 모든 stockId에 대해 반복
    for stockId, stock_name in stock_mapping.items():
        print(base_url + f"/item/news.naver?code={stock_name}" + " 정보 가져오기")
        # 크롬 드라이버에 URL 실행
        driver.get(base_url + f"/item/news.naver?code={stock_name}")

        # 페이지 로딩 대기
        wait = WebDriverWait(driver, 20)

        try:
            # iframe으로 전환
            wait.until(EC.frame_to_be_available_and_switch_to_it((By.ID, 'news_frame')))
            print("iframe으로 전환 완료.")

            # iframe 내부의 뉴스 목록에서 제목과 링크 가져오기
            news_section = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "table.type5")))
            articles = news_section.find_elements(By.CSS_SELECTOR, "tbody > tr")

            # 각 종목의 제목과 링크만을 임시로 저장할 리스트 (매번 초기화)
            temp_news_list = []
            inside_cluster = False  # _clusterId 태그에 들어간 상태인지 여부를 추적하는 변수

            for article in articles:
                class_name = article.get_attribute("class")

                # `_clusterId`가 포함된 `tr` 태그를 발견하면 자손 태그를 무시하기 위해 플래그 설정
                if "_clusterId" in class_name:
                    inside_cluster = True
                    continue  # 이 `tr` 태그는 건너뛰기

                # `inside_cluster`가 True면 자손 태그를 계속 무시
                if inside_cluster:
                    if class_name.strip() == "" or "relation_lst" in class_name:
                        inside_cluster = False  # 자손 태그 무시 종료
                    continue  # 자손 태그 무시

                try:
                    # 제목과 링크 추출
                    title_element = article.find_element(By.CLASS_NAME, 'title')
                    title = title_element.text.strip()  # 제목 텍스트 추출 및 공백 제거

                    # 제목이 없는 경우 건너뛰기
                    if not title:
                        continue

                    link = title_element.find_element(By.TAG_NAME, 'a').get_attribute('href')  # 링크 추출

                    # 날짜 추출
                    date_element = article.find_element(By.CLASS_NAME, 'date')
                    date = date_element.text.strip()  # 날짜 텍스트 추출 및 공백 제거

                    # 매체 추출
                    source_element = article.find_element(By.CLASS_NAME, 'info')
                    source = source_element.text.strip()  # 매체 텍스트 추출 및 공백 제거
                    
                    # GPT API로 요약하기 (필요시 사용)
                    #article_content = summarize_text(article_content)

                    # 기사 정보를 temp_news_list에 저장
                    data = {
                        "title": title,
                        "link": link,
                        "date": date,
                        "source": source,
                        "stockId": stockId
                    }
                    temp_news_list.append(data)

                except Exception as inner_e:
                    print(f"기사 처리 중 오류 발생: {inner_e}")

            # temp_news_list에 저장된 뉴스들에 대해 본문 가져오기
            print("뉴스 본문을 가져오기 시작합니다.")

            for news in temp_news_list:
                driver.get(news['link'])  # 뉴스 링크로 이동
                try:
                    # 뉴스 본문이 있는 div 태그를 찾기
                    content_section = WebDriverWait(driver, 10).until(
                        EC.presence_of_element_located((By.CSS_SELECTOR, "div#newsct_article article#dic_area"))
                    )
                    content = content_section.text.strip()  # 본문 텍스트 추출

                    news['content'] = content  # 본문을 데이터에 추가

                    # datalist에 본문 데이터를 추가
                    datalist.append(news)

                except Exception as e:
                    print(f"본문을 가져오는 중 오류 발생: {e}")
                    news['content'] = "본문을 가져오는 중 오류 발생"

        except Exception as e:
            print(f"뉴스 목록을 가져오는 중 오류 발생: {e}")
    
    # 최종 본문 데이터를 출력 (최종 한 번만 출력)
    for news in datalist:
        print(f"제목: {news['title']}")
        print(f"날짜: {news['date']}")
        print(f"매체: {news['source']}")
        print(f"본문: {news['content']}")
        print("=" * 80)

    driver.quit()

    return datalist


