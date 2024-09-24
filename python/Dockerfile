# 베이스 이미지로 Python 3.9를 사용
FROM python:3.9-slim

# 작업 디렉토리 생성
WORKDIR /app

# 필요한 의존성 파일을 컨테이너에 복사
COPY requirements.txt .

# 필요한 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드를 컨테이너에 복사
COPY . .

# uvicorn을 사용하여 FastAPI 서버 실행 (포트 8082)
CMD ["python"m "-m" "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8082", "--reload"]