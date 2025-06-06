# 📚 Educart – DevOps Automated E-Commerce Platform

**Educart** is a full-stack web application built for learning and showcasing development and DevOps workflows. It features a responsive frontend using **React.js**, a robust backend with **Node.js**, and a CI/CD pipeline using **Docker** and **Jenkins** for efficient deployment and automation.

---

## 🚀 Tech Stack

### Frontend:
- React.js
- HTML5, CSS3

### Backend:
- Node.js
- Express.js
- MongoDB [with Mongoose ORM]
- RESTful APIs

### DevOps:
- Docker (Dockerfile, Docker Compose)
- Jenkins (CI/CD with Jenkinsfile)

---

## 🔧 Features

- 🛒 Add-to-cart functionality with quantity updates
- 🔍 Product browsing and search
- 🔐 Secure login and JWT-based user authentication
- 📦 RESTful APIs for product and user management
- 🐳 Containerized environment for consistent builds
- ⚙️ Automated CI/CD pipeline using Jenkins and GitHub integration

---

## 📁 Folder Structure

```

educart/
│
├── backend/                  # Node.js backend
├── educart/                  # Frontend           
├── docker-compose.yml        # yml file
├── Jenkinsfile               # CI/CD configuration
└── README.md

````

---

## 🛠️ How to Run the Project

### ✅ Method 1: Local Development (Frontend + Backend)

#### Prerequisites:
- Node.js & npm installed
- MongoDB running locally or on MongoDB Atlas

#### Steps:

```bash
# Clone the repository
git clone https://github.com/Aryagithubk/educart_docker.git
cd educart_docker

# Start backend
cd server
npm install
npm start
````

Backend will run on: `http://localhost:5000`

```bash
# Start frontend
cd ../client
npm install
npm start
```

Frontend will run on: `http://localhost:3000`

---

### 🐳 Method 2: Docker + Jenkins Setup (Automated CI/CD)

#### Prerequisites:

* Docker & Docker Compose installed
* Jenkins installed (locally or containerized)

#### Steps:

```bash
# In the root directory
docker-compose up --build
```

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:5000`

#### Jenkins Setup:

* Create a new Jenkins pipeline project.
* Connect it with your GitHub repo.
* Use the `Jenkinsfile` from the project for pipeline configuration.
* (Optional) Configure GitHub Webhooks for automatic build triggers.

---

## 📌 Future Enhancements

* Implement payment gateway (e.g., Stripe or Razorpay)
* Add product reviews and ratings
---

## 👩‍💻 Author

**Krisha Arya**
📧 [aryasanya55@gmail.com](mailto:aryasanya55@gmail.com)
🌐 [Portfolio](https://krisha-arya-portfolio.netlify.app) | [LinkedIn](https://linkedin.com/in/krisha-arya) | [GitHub](https://github.com/Aryagithubk)

---

## 📄 License

Licensed under the MIT License.

```
