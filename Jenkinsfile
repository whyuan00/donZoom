pipeline {
    agent any

    environment {
        APK_OUTPUT_DIR = '/home/ubuntu/jenkins-data/workspace/pipeline/frontend/android/app/build/outputs/apk/release/'  // APK 파일 위치를 실제 경로로 변경
        APK_FINAL_NAME = 'DONZOOM.apk'  // APK 파일 최종 이름
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checking out frontend SCM...'
                checkout scm  // Git에서 소스 코드 체크아웃
            }
        }

        stage('Install Node Modules') {
            steps {
                echo 'Installing node modules...'
                sh '''
                    cd frontend
                    npm install  # 필요한 Node 모듈 설치
                    npm install @svgr/plugin-svgo --save-dev  # 누락된 모듈 추가 설치
                '''
            }
        }

        stage('Build APK') {
            steps {
                echo 'Building APK for frontend...'
                sh '''
                    cd frontend/android
                    chmod +x gradlew  # gradlew 파일에 실행 권한 부여
                    ./gradlew assembleRelease  # APK 빌드
                '''
            }
        }

        stage('Find and Rename APK') {
            steps {
                echo 'Finding and renaming APK...'
                script {
                    def apkPath = sh(script: "find ${APK_OUTPUT_DIR} -name 'app-release.apk'", returnStdout: true).trim()
                    if (apkPath) {
                        echo "APK found at: ${apkPath}"
                        sh "mv ${apkPath} ${APK_OUTPUT_DIR}${APK_FINAL_NAME}"
                    } else {
                        error "APK 파일을 찾을 수 없습니다."
                    }
                }
            }
        }

        stage('Archive APK') {
            steps {
                echo 'Archiving DONZOOM.apk...'
                archiveArtifacts allowEmptyArchive: false, artifacts: "${APK_OUTPUT_DIR}${APK_FINAL_NAME}"  // APK 파일 아카이브
            }
        }
    }

    post {
        always {
            echo 'Frontend pipeline finished.'
        }
        success {
            echo 'Frontend pipeline completed successfully.'
        }
        failure {
            echo 'Frontend pipeline failed.'
        }
    }
}
