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
    sh 'echo "dckr_pat_Bq2vDNN0C84Zvn3yLhhnmb4ACWo" | docker login -u aryasingh55 --password-stdin'
    sh 'docker push aryasingh55/educart-backend'
    sh 'docker push aryasingh55/educart-frontend'
  }
}


    stage('Deploy') {
      steps {
        sh 'docker compose up --build -d'
      }
    }
  }
}
