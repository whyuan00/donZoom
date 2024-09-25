pipeline {
    agent any

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

        stage('Deploy with Docker Compose') {
            steps {
                echo 'Deploying with Docker Compose...'
                sh '''
                    # 기존 컨테이너를 중지 및 제거 (docker-compose를 사용해 관리)
                    docker-compose down || true
                    # 새로운 이미지를 빌드하고 모든 컨테이너 실행
                    docker-compose up -d --build --no-cache
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
