pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/prashantsinghranjan/ecomm_application.git'
            }
        }

        stage('Build') {
            steps {
                echo "Build stage (static app)"
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop ecomm || true
                docker rm ecomm || true
                docker build -t ecomm-app .
                docker run -d -p 80:80 --name ecomm ecomm-app
                '''
            }
        }
    }
}
