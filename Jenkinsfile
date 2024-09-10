pipeline {

    agent any

    stages {

        stage("build") {

            steps {
                echo 'Building'
                bat 'java -version'
                bat 'mvn -version'
                bat 'gradle -version'
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