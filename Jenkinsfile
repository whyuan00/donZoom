pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'    // Docker Hub 자격 증명 ID
        DOCKER_IMAGE = 'jooboy/donzoom'                     // Docker 이미지 이름
    }

    stages {
        stage('Start MySQL') {
            steps {
                echo 'Starting MySQL container...'
                sh """
                    docker run -d --name mysql \
                    -e MYSQL_ROOT_PASSWORD=ssafy \
                    -e MYSQL_USER=ssafy \
                    -e MYSQL_PASSWORD=ssafy \
                    -e MYSQL_DATABASE=donzoom \
                    -p 3306:3306 \
                    mysql:latest
                """
            }
        }

        stage('Build JAR') {
            steps {
                echo 'Building JAR file...'
                sh 'cd backend && chmod +x gradlew && ./gradlew clean build'
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
                echo 'Deploying Docker container to EC2...'
                sh """
                    docker stop donzoom || true &&
                    docker rm donzoom || true &&
                    docker run -d --name donzoom -p 8080:8080 ${DOCKER_IMAGE}:latest
                """
            }
        }
    }

    post {
        always {
            echo 'Cleaning up MySQL container...'
            sh 'docker stop mysql || true && docker rm mysql || true'
        }
    }
}
