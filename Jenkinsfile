pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        FRONTEND_IMAGE_NAME = 'lavakumar7619/hotel_ease'
        BACKEND_IMAGE_NAME = 'lavakumar7619/hotel_ease'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Push Frontend') {
            steps {
                dir('frontend') {
                    script {
                        def frontendImage = docker.build("${FRONTEND_IMAGE_NAME}:${env.BUILD_ID}")
                        docker.withRegistry('', DOCKER_HUB_CREDENTIALS) {
                            frontendImage.push()
                        }
                    }
                }
            }
        }

        stage('Build and Push Backend') {
            steps {
                dir('backend') {
                    script {
                        def backendImage = docker.build("${BACKEND_IMAGE_NAME}:${env.BUILD_ID}")
                        docker.withRegistry('', DOCKER_HUB_CREDENTIALS) {
                            backendImage.push()
                        }
                    }
                }
            }
        }
    }
    
    post {
        always {
            cleanWs() // Clean up workspace
        }
    }
}
