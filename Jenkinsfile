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
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
          sh '''
            echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
            docker push aryasingh55/educart-backend
            docker push aryasingh55/educart-frontend
          '''
        }
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker compose up --build -d'
      }
    }
  }
}
