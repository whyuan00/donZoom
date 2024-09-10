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
                sh './gradlew clean build'  // Gradle을 사용하여 JAR 파일 빌드
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Run Docker...'
                sh """
                    docker stop donzoom || true &&         # 기존 컨테이너를 중지
                    docker rm donzoom || true &&           # 기존 컨테이너를 삭제
                    docker run -d --name donzoom -p 8080:8080 ${DOCKER_IMAGE}:latest  # 새로운 컨테이너 실행

                """
            }
        }
    }
}
