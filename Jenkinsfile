pipeline {
  agent any

  stages {
    stage('Clone from GitHub') {
      steps {
        git branch: 'main', url: 'https://github.com/Aryagithubk/educart_docker.git'
      }
    }

    stage('Build Backend') {
      steps {
        sh 'docker build -t aryasingh55/educart-backend ./backend'
      }
    }

    stage('Build Frontend') {
      steps {
        sh 'docker build -t aryasingh55/educart-frontend ./educart'
      }
    }

    stage('Push Images') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh 'docker push aryasingh55/educart-backend'
          sh 'docker push aryasingh55/educart-frontend'
        }
      }
    }

    stage('Deploy to Swarm') {
      steps {
        sh 'docker stack deploy -c docker-compose.yml educart-stack'
      }
    }
  }
}
