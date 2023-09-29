// pipeline {
//     agent any

//     environment {
//         DOCKERHUB_CREDENTIALS = credentials('docker_login')
//         DOCKERHUB_REPO = 'divanshreevatsa/jenkins_test_docker'
//     }

//     stages {
//         stage('Build and Push Backend') {
//             steps {
//                 dir('backend') {
//                     checkout scm
//                     script {
//                         def imageTag = "backend-${BUILD_NUMBER}"
//                         sh "docker build -t ${DOCKERHUB_REPO}:${imageTag} ."
//                         sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
//                         sh "docker push ${DOCKERHUB_REPO}:${imageTag}"
//                     }
//                 }
//             }
//         }

//         stage('Build and Push Frontend') {
//             steps {
//                 dir('frontend') {
//                     checkout scm
//                     script {
//                         def imageTag = "frontend-${BUILD_NUMBER}"
//                         sh "docker build -t ${DOCKERHUB_REPO}:${imageTag} ."
//                         sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
//                         sh "docker push ${DOCKERHUB_REPO}:${imageTag}"
//                     }
//                 }
//             }
//         }

//         stage('Deploy with Docker Compose') {
//             steps {
//                 script {
//                     def backendImageTag = "backend-${BUILD_NUMBER}"
//                     def frontendImageTag = "frontend-${BUILD_NUMBER}"
//                     sh "docker-compose pull" // Pull the latest images from Docker Hub
//                     sh "docker-compose up -d" // Run the containers
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             sh 'docker logout'
//         }
//     }
// }
// pipeline {
//     agent any

//     environment {
//         DOCKER_HUB_CREDENTIALS = credentials('docker_login') // Add your Jenkins credential ID here
//     }

//     stages {
//         stage('Build and Push Backend Image') {
//             steps {
//                 dir('backend') {
//                     script {
//                         def backendImage = docker.build("lavakumar7619/hotel_ease:backend-${BUILD_NUMBER}", "-f Dockerfile .")
//                         docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
//                             backendImage.push()
//                         }
//                     }
//                 }
//             }
//         }
        
//         // stage('Build and Push Frontend Image') {
//         //     steps {
//         //         dir('frontend') {
//         //             script {
//         //                 def frontendImage = docker.build("lavakumar7619/hotel_ease:frontend", "-f Dockerfile .")
//         //                 docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
//         //                     frontendImage.push()
//         //                 }
//         //             }
//         //         }
//         //     }
//         // }
        
//         stage('Pull and Run Images') {
//             steps {
//                 script {
//                     docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
//                         //docker.image("lavakumar7619/hotel_ease:frontend-${BUILD_NUMBER}").pull()
//                         docker.image("lavakumar7619/hotel_ease:backend-5").pull()
//                     }
                    
//                     docker.run("-p 5000:5000 -d lavakumar7619/hotel_ease:backend-5")
//                    // docker.run("-p 3000:3000 -d lavakumar7619/hotel_ease:frontend-${BUILD_NUMBER}")
//                 }
//             }
//         }
    
//     }
//     post {
//         always {
//             sh 'docker logout'
//         }
//     }
// }
// pipeline {
//     agent any

//     environment {
//         DOCKER_HUB_CREDENTIALS = credentials('docker_login') // Add your Jenkins credential ID here
//     }

//     stages {
//         stage('Build and Push Docker Compose Images') {
//             steps {
//                 script {
//                     // Build and push Docker Compose images
//                     sh 'docker-compose build'
//                     docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
//                         sh 'docker-compose push'
//                     }
//                 }
//             }
//         }
        
//         stage('Pull and Run Docker Compose Images') {
//             steps {
//                 script {
//                     // Pull and run Docker Compose images
//                     sh 'docker-compose pull'
//                     sh 'docker-compose up'
//                 }
//             }
//         }
//     }
// }
// pipeline {
//     agent any

//     environment {
//         DOCKERHUB_CREDENTIALS = credentials('docker_login')
//         DOCKERHUB_REPO = 'lavakumar7619/hotel_ease'
//     }

//     stages {
//         stage('Build and Push Docker Compose Images') {
//             steps {
//                 script {
//                     def backendImageTag = "backend-${BUILD_NUMBER}"
//                     def frontendImageTag = "frontend-${BUILD_NUMBER}"
                    
//                     // Build backend and frontend images
//                     dir('backend') {
//                         sh "docker build -t ${DOCKERHUB_REPO}:${backendImageTag} ."
//                     }
//                     // Authenticate and push images
//                     sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
//                     sh "docker push ${DOCKERHUB_REPO}:${backendImageTag}"   
                            
//                     // dir('frontend') {
//                     //     sh "docker build -t ${DOCKERHUB_REPO}:${frontendImageTag} ."
//                     // }
                    
//                     // sh "docker push ${DOCKERHUB_REPO}:${frontendImageTag}"
//                 }
//             }
//         }

//         // stage('Deploy with Docker Compose') {
//         //     steps {
//         //         script {
//         //             // Pull and run Docker Compose images
//         //             sh "docker-compose pull" // Pull the latest images from Docker Hub
//         //             sh "docker-compose up -d" // Run the containers
//         //         }
//         //     }
//         // }
//         stage('Pull and Run Backend Image') {
//             steps {
//                 script {
//                     // Authenticate to Docker Hub
//                     sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    
//                     // Pull and run the backend image
//                     sh "docker pull ${DOCKERHUB_REPO}:${backendImageTag}"
//                     sh "docker run -d -p 5000:5000 --name backend ${DOCKERHUB_REPO}:${backendImageTag}"
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             sh 'docker logout'
//         }
//     }
// }
// pipeline {
//     agent any

//     environment {
//         DOCKERHUB_CREDENTIALS = credentials('docker_login')
//         DOCKERHUB_REPO = 'lavakumar7619/hotel_ease'
//     }

//     stages {
//         stage('Build and Push Docker Compose Images') {
//             steps {
//                 script {
//                     // Build and push Docker Compose images
//                     sh "docker-compose -f docker-compose.yml build"
//                     sh "docker-compose -f docker-compose.yml push"
//                 }
//             }
//         }

//         stage('Deploy with Docker Compose') {
//             steps {
//                 script {
//                     // Pull and run Docker Compose images
//                     sh "docker-compose -f docker-compose.yml pull"
//                     sh "docker-compose -f docker-compose.yml up -d"
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             //sh 'docker-compose -f docker-compose.yml down' // Stop and remove containers when the pipeline is done
//             sh 'docker logout'
//         }
//     }
// }

//last try lava
pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker_login')
        DOCKERHUB_REPO = 'lavakumar7619/book_ease'
        BACKEND_IMAGE_TAG = "backend-${BUILD_NUMBER}"
        FRONTEND_IMAGE_TAG = "frontend-${BUILD_NUMBER}"
        BACKEND_CONTAINER_NAME = "backend-${BUILD_NUMBER}-c"
        FRONTEND_CONTAINER_NAME = "frontend-${BUILD_NUMBER}-c"
    }

    stages {
        // stage('Delete Containers') {
        //     steps {
        //         script {
        //             // Stop and remove all running containers
        //             sh 'docker stop $(docker ps -q)'
        //             // Remove all stopped containers
        //             sh 'docker rm $(docker ps -aq)'
        //         }
        //     }
        // }

        stage('Build and Push BACKEND Docker Image') {
            steps {
                script {
                    // Build backend image
                    dir('backend') {
                        sh "docker build -t ${DOCKERHUB_REPO}:${BACKEND_IMAGE_TAG} ."
                    }
                    
                    // Authenticate and push the backend image
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    sh "docker push ${DOCKERHUB_REPO}:${BACKEND_IMAGE_TAG}"   
                }
            }
        }
        stage('Build and Push frontend Docker Image') {
            steps {
                script {
                    // Build frontend image
                    dir('frontend') {
                        sh "docker build -t ${DOCKERHUB_REPO}:${FRONTEND_IMAGE_TAG} ."
                    }
                    
                    // Authenticate and push the FRONTEND image
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    sh "docker push ${DOCKERHUB_REPO}:${FRONTEND_IMAGE_TAG}"   
                }
            }
        }
        stage('Pull and Run Backend AND FRONTEND Image') {
            steps {
                script {
                    // Authenticate to Docker Hub
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    
                    // Pull and run the backend image with a custom container name
                    sh "docker pull ${DOCKERHUB_REPO}:${BACKEND_IMAGE_TAG}"
                    sh "docker pull ${DOCKERHUB_REPO}:${FRONTEND_IMAGE_TAG}"
                    //sh "docker pull lavakumar7619/book_ease:book_ease_frontend"
                    sh "docker run -d -p 5000:5000 --name ${BACKEND_CONTAINER_NAME} ${DOCKERHUB_REPO}:${BACKEND_IMAGE_TAG}"
                    sh "docker run -d -p 3000:3000 --name ${FRONTEND_CONTAINER_NAME} ${DOCKERHUB_REPO}:${FRONTEND_IMAGE_TAG}"
                    //sh "docker run -d -p 3000:3000 --name ${FRONTEND_CONTAINER_NAME} lavakumar7619/book_ease:book_ease_frontend"
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
// pipeline {
//     agent any

//     environment {
//         DOCKERHUB_CREDENTIALS = credentials('docker_login')
//         DOCKER_COMPOSE_FILE = 'docker-compose.yml'
//     }

//     stages {
//         stage('Build and Push Docker Images') {
//             steps {
//                 script {
//                     // Authenticate to Docker Hub
//                     sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    
//                     // Build and push Docker images using Docker Compose
//                     sh "docker-compose -f $DOCKER_COMPOSE_FILE build"
//                     sh "docker-compose -f $DOCKER_COMPOSE_FILE push"
//                 }
//             }
//         }

//         stage('Run Containers') {
//             steps {
//                 script {
//                     // Run containers using Docker Compose
//                     sh "docker-compose -f $DOCKER_COMPOSE_FILE up -d"
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             script {
//                 // Stop and remove containers after the job is done
//                 //sh "docker-compose -f $DOCKER_COMPOSE_FILE down"
//                 sh 'docker logout'
//             }
//         }
//     }
// }
