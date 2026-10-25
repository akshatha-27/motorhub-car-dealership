# 🚗 MotorHub
### Car Dealership Inventory Management System

**A full-stack web application for smarter vehicle inventory management.**

MotorHub brings customers and dealership administrators together through a single platform for browsing vehicles, managing inventory, and handling user authentication.

<p align="center">
  <strong>React · Node.js · Express.js · MongoDB · Jest</strong>
</p>

<p align="center">
  <a href="https://github.com/akshatha-27/motorhub-car-dealership">GitHub Repository</a>
  ·
  <a href="#-getting-started">Setup Guide</a>
  ·
  <a href="#-testing-and-test-report">Test Report</a>
  ·
  <a href="#-my-ai-usage">My AI Usage</a>
</p>

---

## Deployment

MotorHub is deployed using Vercel, Render, and MongoDB Atlas.

### Live Application

- **Frontend:** https://motorhub-car-dealership.vercel.app/
- **Backend API:** https://motorhub-car-dealership.onrender.com
- **GitHub Repository:** https://github.com/akshatha-27/motorhub-car-dealership

### Deployment Architecture

- **Frontend – Vercel:** Hosts the React application built using Vite.
- **Backend – Render:** Hosts the Node.js and Express REST API.
- **Database – MongoDB Atlas:** Stores user accounts and vehicle inventory.

### Deployment Steps

1. Push the project code to GitHub.
2. Deploy the backend on Render using the `backend` directory.
3. Configure the required environment variables in Render, including `MONGODB_URI` and `JWT_SECRET`.
4. Deploy the frontend on Vercel using the `frontend` directory.
5. Configure the frontend API URL to point to the deployed backend.
6. Test the live application to verify registration, login, and vehicle inventory operations.

### Environment Configuration

The backend requires the following environment variables:

- `MONGODB_URI` – MongoDB Atlas connection string.
- `JWT_SECRET` – Secret used for JWT authentication.
- `PORT` – Port configuration; the deployed server should use the port provided by the hosting platform.

**Note:** Environment variables and secrets are configured through the hosting platform's settings and are not committed to the GitHub repository.

## Demo Admin Login

Use the following credentials to access the admin dashboard:

- **Email:** `admin@motorhub.com`
- **Password:** `admin123`

**Note:** These credentials are provided for project evaluation and demonstration purposes only.

## ✨ At a Glance

| | |
|---|---|
| **Project** | MotorHub – Car Dealership Inventory System |
| **Project Type** | Full-stack web application |
| **Frontend** | React and Vite |
| **Backend** | Node.js and Express.js |
| **Database** | MongoDB |
| **Testing** | Jest and Supertest |
| **Development Approach** | Test-Driven Development (TDD) |

## 🎯 Project Overview

Car dealerships need an effective way to maintain vehicle records, monitor inventory, and provide customers with access to available vehicles. Managing these operations without a centralized system can make inventory updates and access control more difficult.

**MotorHub addresses this problem through a full-stack inventory management application.**

The frontend provides the user interface, the Express backend handles API requests and application logic, and MongoDB stores user and vehicle information.

The project was developed as part of the **Incubyte TDD Kata: Car Dealership Inventory System**, with a focus on modular code, RESTful API design, automated testing, and maintainability.

## 🚀 Key Features

### 👤 User Authentication
- User registration and login.
- Authentication for protected operations.
- Role-based access for customers and administrators.
- Administrator initialization through a seed script.

### 🚘 Vehicle Inventory Management
- View available vehicles.
- Search and filter vehicle listings.
- Add new vehicles to inventory.
- Update existing vehicle details.
- Delete vehicle records.
- Restock inventory and update quantities.

### 🛒 Customer Functionality
- Browse available vehicles.
- Filter vehicle listings.
- Initiate vehicle purchases through the application.
- Receive feedback for application operations.

### 🛡️ Backend and Maintainability
- REST API built with Express.js.
- MongoDB persistence using Mongoose.
- Authentication middleware for protected operations.
- Modular routes, models, and middleware.
- Automated backend tests using Jest and Supertest.

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| Vite | Frontend development and build tool |
| CSS | Styling and responsive presentation |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API and server framework |
| MongoDB | Database |
| Mongoose | Database modelling |
| Jest | Backend test runner |
| Supertest | HTTP endpoint testing |
| Git and GitHub | Version control and source hosting |

## 🏗️ System Architecture

MotorHub uses a client-server architecture in which the frontend communicates with the backend through HTTP requests.

```text
┌──────────────────────────────┐
│        React Frontend        │
│                              │
│  Login and Registration      │
│  Vehicle Listings            │
│  Inventory Administration    │
│  Customer Purchase Interface │
└──────────────┬───────────────┘
               │
               │ HTTP / REST API
               ▼
┌──────────────────────────────┐
│       Express Backend        │
│                              │
│  Authentication Routes       │
│  Vehicle Routes              │
│  Authentication Middleware   │
│  Application Logic           │
└──────────────┬───────────────┘
               │
               │ Mongoose
               ▼
┌──────────────────────────────┐
│           MongoDB            │
│                              │
│  User Records                │
│  Vehicle Records             │
└──────────────────────────────┘
```

### Project Structure

```text
motorhub-car-dealership/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Vehicle.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── vehicles.js
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   │   ├── auth.test.js
│   │   └── vehicles.test.js
│   ├── seedAdmin.js
│   ├── resetInventory.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── screenshots/
├── .gitignore
└── README.md
```

## 💻 Getting Started

Follow these instructions to run MotorHub locally.

### Prerequisites

Install the following:

- [Node.js and npm](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) locally or through MongoDB Atlas
- [Git](https://git-scm.com/)
- A modern web browser

### 1. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/akshatha-27/motorhub-car-dealership.git
cd motorhub-car-dealership
```

### 2. Set Up the Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory. Add the environment variables expected by the backend configuration.

Example template:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_strong_random_secret
```

**Important:** Verify the environment variable names against the backend source code before running the application. Use your own database connection string and a strong, private authentication secret. Never commit real credentials to GitHub.

### 3. Set Up the Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

The frontend is configured to communicate with the backend API at:

```text
http://localhost:5000/api
```

If you change the backend port or API address, update the frontend configuration accordingly.

### 4. Start the Backend Server

In the first terminal, navigate to `backend/` and run:

```bash
npm run dev
```

Alternatively, use:

```bash
npm start
```

The backend should start on the configured port. Ensure MongoDB is accessible and the environment configuration is correct.

### 5. Start the Frontend Server

In the second terminal, navigate to `frontend/` and run:

```bash
npm run dev
```

Vite will display a local development URL in the terminal, commonly:

```text
http://localhost:5173
```

Open the displayed URL in your browser to use MotorHub.

### 6. Initialize the Administrator

If an administrator account is required, review the seed script and run it from the `backend/` directory:

```bash
node seedAdmin.js
```

Follow the credentials and configuration defined by the script.

> **Warning:** `resetInventory.js` deletes existing vehicle records before inserting sample inventory. Run it only when you intentionally want to reset inventory in a development database.

## 🧪 Testing and Test Report

MotorHub includes backend tests for authentication and vehicle-related operations.

### Run the Tests

From the backend directory:

```bash
npm test
```

The configured test command uses Jest, with Supertest for HTTP endpoint testing.

### Recorded Test Results

The following results were observed during development:

<img width="494" height="368" alt="Screenshot 2026-10-25 193622" src="https://github.com/user-attachments/assets/c61a7b0b-50fd-4120-8fc2-28991dc827ae" />


| Test Metric | Result |
|---|---:|
| Test suites passed | 2 / 2 |
| Tests passed | 8 / 8 |
| Failed tests | 0 |
| Overall result | **PASS** |

These results represent the recorded test run. Run the test command against the submitted code to verify the current state.

### Test Suites

- `tests/auth.test.js` — authentication-related behaviour.
- `tests/vehicles.test.js` — vehicle-related behaviour.

### Test-Driven Development Approach

The project follows the Red–Green–Refactor cycle:

1. **Red:** Write a test for the expected behaviour and verify that it fails for the intended reason.
2. **Green:** Implement the functionality needed to pass the test.
3. **Refactor:** Improve the implementation while keeping the tests passing.
4. **Repeat:** Continue for additional requirements and edge cases.

This approach helps verify application behaviour and reduces the risk of regressions.

## 🔌 API Overview

The backend organizes its API into two primary route groups:

| Route Group | Responsibility |
|---|---|
| Authentication routes | User registration and login |
| Vehicle routes | Vehicle listing, inventory management, and purchasing |

The Express application mounts the route groups under the `/api` prefix.

For the exact endpoint paths, HTTP methods, request bodies, authentication requirements, and response formats, refer to:

- `backend/src/routes/auth.js`
- `backend/src/routes/vehicles.js`

## 🔐 Security and Design Considerations

- Protected operations use authentication middleware.
- Administrative operations should be restricted to authorized roles.
- Database credentials and authentication secrets belong in environment configuration.
- Routes, models, middleware, and frontend components are organized into separate modules.
- MongoDB provides persistent storage for application records.
- Input validation and error handling are important for reliable inventory operations.

## 🤖 My AI Usage

### AI Tools Used

**ChatGPT (OpenAI)** was used as an AI assistant during the development and documentation of MotorHub.

### How I Used AI

I used ChatGPT as a support tool throughout the development process. My use of AI included:

- **Understanding requirements:** Breaking the project requirements into smaller development tasks.
- **Backend development:** Discussing REST API structure, authentication, inventory management, and the responsibilities of different backend components.
- **Test-Driven Development:** Understanding the Red–Green–Refactor cycle and how automated tests help verify functionality.
- **Debugging:** Interpreting error messages and troubleshooting issues encountered during backend testing and frontend development.
- **Frontend development:** Getting guidance on frontend and backend integration and resolving development issues.
- **Documentation:** Organizing the README, explaining the project structure, and documenting setup and testing procedures.

### My Reflection on AI Usage

Using ChatGPT helped me understand unfamiliar concepts, troubleshoot errors more efficiently, and organize my workflow. It was especially useful when I encountered development problems and needed explanations of possible causes and solutions.

I treated AI as a support tool rather than a replacement for understanding the code. I reviewed suggestions and used application execution and test results to check the implementation. The recorded backend test run completed with two passing test suites and eight passing tests.

This experience taught me that AI can improve productivity and support learning, but its suggestions must be evaluated and verified. I remain responsible for understanding the code, validating the results, and ensuring the final project meets its requirements.

## 🔮 Future Improvements

Potential improvements include:

- Add pagination and more advanced inventory filters.
- Expand automated tests for authorization, stock updates, and purchasing edge cases.
- Introduce frontend component and end-to-end testing.
- Improve accessibility and mobile responsiveness.
- Configure continuous integration to run tests on each push.
- Add production deployment configuration and monitoring.
- Improve audit logging for inventory changes.

## 📂 Repository

**GitHub:** [akshatha-27/motorhub-car-dealership](https://github.com/akshatha-27/motorhub-car-dealership)

---

<p align="center">
  <strong>MotorHub — Making dealership inventory management more organized, accessible, and maintainable.</strong>
</p>
