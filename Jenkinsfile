pipeline {

    agent any

    stages {

        stage("build") {

            steps {
                echo 'Building'
                sh 'java -version'
                sh 'gradle -version'
            }
        }

        stage("test") {

            steps {
                echo 'Testing'
            }
        }

        stage("deploy") {

            steps {
                echo 'Deploying'
            }
        }
    }
}