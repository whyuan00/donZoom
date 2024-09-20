pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'donzoom/backend'  // 백엔드용 Docker 이미지: donzoom/backend
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checking out backend SCM...'
                checkout scm
            }
        }

        stage('Build JAR') {
            steps {
                echo 'Building JAR file for backend...'
                sh '''
                    cd backend
                    chmod +x gradlew  # gradlew 파일에 실행 권한 부여
                    ./gradlew clean bootJar --no-build-cache -x test
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image for backend...'
                script {
                    try {
                        docker.build("${DOCKER_IMAGE_BACKEND}:latest", "backend")
                    } catch (e) {
                        error "Failed to build Docker image. Error: ${e.message}"
                    }
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                echo 'Deploying backend with Docker Compose...'
                sh '''
                    cd backend
                    docker-compose down || true  # 기존 컨테이너 중지
                    docker-compose up -d  # 새로 컨테이너 시작
                '''
            }
        }
    }

    post {
        always {
            echo 'Backend pipeline finished.'
        }
        success {
            echo 'Backend pipeline completed successfully.'
        }
        failure {
            echo 'Backend pipeline failed.'
        }
    }
}
