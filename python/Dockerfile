# 베이스 이미지로 Python 3.9를 사용
FROM python:3.9-slim

# 필요한 패키지 설치
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    curl \
    gnupg \
    libnss3 \
    libgconf-2-4 \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 생성
WORKDIR /app

# 필요한 의존성 파일을 컨테이너에 복사
COPY requirements.txt .

# 필요한 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드를 컨테이너에 복사
COPY . .

# 환경 변수로 Chrome 경로 설정
ENV CHROME_BIN=/usr/bin/chromium
ENV CHROMEDRIVER_BIN=/usr/bin/chromedriver

# uvicorn을 사용하여 FastAPI 서버 실행 (포트 8082)
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8082", "--reload"]
