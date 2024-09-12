pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'    // Docker Hub 자격 증명 ID
        DOCKER_IMAGE = 'jooboy/donzoom'                     // Docker 이미지 이름
    }

    stages {
        stage('Build JAR') {
            steps {
                echo 'Building JAR file...'
                sh '''
                    cd backend
                    chmod +x gradlew  # gradlew 파일에 실행 권한 부여
                    ./gradlew clean bootJar --no-build-cache -x test
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    try {
                        docker.build("${DOCKER_IMAGE}:latest", "backend")
                    } catch (e) {
                        error "Failed to build Docker image. Error: ${e.message}"
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo 'Deploying with Docker Compose...'
                sh '''
                    # 기존 컨테이너를 중지 및 제거 (docker-compose를 사용해 관리)
                    docker-compose down || true
                    docker-compose up -d springboot --build  # 빌드 후 백그라운드로 컨테이너 실행
                '''
            }
        }
    }
}
