pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'jooboy/donzoom'  // Docker 이미지 이름
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checking out SCM...'
                checkout scm
            }
        }
        
        stage('Prepare SonarQube Analysis') {
            steps {
                echo 'Setting executable permissions for gradlew...'
                sh '''
                    cd backend
                    chmod +x gradlew  # gradlew 파일에 실행 권한 부여
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube analysis...'
                withSonarQubeEnv('SonarQube'){  // SonarQube 인스턴스 이름을 사용
                    sh '''
                        cd backend
                        ./gradlew sonar
                    '''
                }
            }
        }

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
                        docker.build("${DOCKER_IMAGE}:latest", "backend")  // Spring Boot Docker 이미지 빌드
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
                    docker-compose up -d  # 기존 이미지를 사용해 모든 컨테이너 실행
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
