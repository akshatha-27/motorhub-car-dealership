# MotorHub — Car Dealership Inventory Management System

A full-stack web application for managing car dealership inventory, built with React, Node.js, Express.js, and MongoDB. MotorHub provides a centralized interface for browsing vehicles, managing inventory, and handling user authentication and vehicle purchases.

This project was developed as part of the **Incubyte TDD Kata: Car Dealership Inventory System**, with an emphasis on clean code, test-driven development, RESTful API design, and maintainable software.

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Testing and TDD](#testing-and-tdd)
- [API Overview](#api-overview)
- [Security and Design Considerations](#security-and-design-considerations)
- [AI Usage Disclosure](#ai-usage-disclosure)
- [Future Improvements](#future-improvements)

## Overview

MotorHub is a full-stack car dealership inventory system that separates the user interface, backend business logic, and persistent data storage into distinct components.

The application supports two primary roles:

- **Customer:** Register, log in, browse available vehicles, filter inventory, and purchase vehicles.
- **Administrator:** Manage vehicle inventory, add new vehicles, update existing vehicle details, delete vehicles, and restock inventory.

The frontend communicates with the backend through HTTP API requests. The backend processes requests, applies authentication and authorization rules, and interacts with MongoDB to persist application data.

## Problem Statement

Car dealerships need a reliable way to maintain vehicle records, monitor stock availability, and provide customers with an accessible inventory browsing experience.

Manual inventory management can make it difficult to maintain accurate stock information, manage vehicle details, and control access to administrative operations.

MotorHub addresses these needs through a web-based application with persistent storage, role-based access, inventory management functionality, and automated tests.

## Key Features

### 1. User Authentication and Authorization

- User registration and login.
- Authentication for protected operations.
- Role-based access for customers and administrators.
- Restricted inventory management operations for authorized administrators.
- Admin account initialization through a dedicated seed script.

### 2. Vehicle Inventory Management

- Display available vehicles.
- Search and filter vehicles by category.
- Add new vehicles to the inventory.
- Edit existing vehicle information.
- Delete vehicle records.
- Restock vehicles and update inventory quantities.
- Maintain vehicle information in MongoDB.

### 3. Vehicle Purchasing

- Allow customers to initiate vehicle purchases through the application.
- Provide user feedback for successful operations and errors.
- Connect purchase operations to the backend inventory functionality.

### 4. User Interface

- React-based single-page application.
- Organized interface for browsing and managing inventory.
- Separate customer-facing and administrative functionality.
- Feedback messages for important actions.
- Responsive styling using CSS.

### 5. Testing and Maintainability

- Automated backend tests using Jest.
- HTTP endpoint testing with Supertest.
- Separate authentication and vehicle test suites.
- Test execution through a dedicated npm script.
- A modular backend structure separating routes, models, middleware, and server configuration.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React |
| Build tool | Vite |
| Styling | CSS |
| Backend | Node.js |
| Web framework | Express.js |
| Database | MongoDB |
| Data modelling | Mongoose |
| Authentication | Token-based authentication and authorization middleware |
| Testing | Jest and Supertest |
| Version control | Git and GitHub |

## System Architecture

MotorHub follows a client-server architecture.

```text
+-----------------------------+
|       React Frontend        |
|                             |
| Registration and Login      |
| Vehicle Search and Filters  |
| Inventory Administration   |
| Purchase Interface          |
+--------------+--------------+
               |
               | HTTP / REST API
               v
+-----------------------------+
|      Express Backend        |
|                             |
| Authentication Routes       |
| Vehicle Routes              |
| Authentication Middleware   |
| Business Logic              |
+--------------+--------------+
               |
               | Mongoose
               v
+-----------------------------+
|          MongoDB            |
|                             |
| User Records                |
| Vehicle Records             |
+-----------------------------+
```

The frontend handles user interaction and presentation. The backend exposes API endpoints and enforces access restrictions, while MongoDB stores application data persistently.

## Project Structure

```text
MotorHub-Submission/
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
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the application:

- Node.js and npm.
- MongoDB, either a local instance or a MongoDB Atlas database.
- Git.
- A modern web browser.

### 1. Clone the Repository

```bash
git clone https://github.com/akshatha-27/motorhub-car-dealership.git
cd motorhub-car-dealership
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory.

Configure the MongoDB connection string, authentication secret, and port using the environment variable names expected by the backend configuration. Keep actual credentials and secrets out of version control.

Example configuration template:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_strong_random_secret
```

**Note:** Ensure the variable names match those referenced in the backend source code. Never commit real database credentials or authentication secrets.

### 3. Configure the Frontend

Open another terminal from the project root:

```bash
cd frontend
npm install
```

The frontend currently communicates with the backend API at:

```text
http://localhost:5000/api
```

Ensure the backend is running on the corresponding port. If the API URL is changed, update the frontend configuration accordingly.

## Running the Application

### Start the Backend

From the `backend/` directory:

```bash
npm run dev
```

The development server uses Nodemon to restart when backend files change.

Alternatively, start the server without Nodemon:

```bash
npm start
```

### Start the Frontend

From the `frontend/` directory, open a separate terminal and run:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

### Initialize the Administrator

The repository includes an administrator seed script:

```bash
node seedAdmin.js
```

Run it from the `backend/` directory after configuring the database. Review the script first and use the credentials configured by the seed process.

**Important:** The `resetInventory.js` script deletes existing vehicle records before inserting sample inventory. Use it only when you intentionally want to reset the inventory, preferably in a development database.

## Testing and TDD

Testing is an important part of the MotorHub implementation. The backend contains separate test suites for authentication and vehicle operations.

### Run the Backend Tests

From the `backend/` directory:

```bash
npm test
```

The test command runs Jest serially using the configured `--runInBand` option.

The test suites are:

- `tests/auth.test.js` — authentication-related behaviour.
- `tests/vehicles.test.js` — vehicle-related behaviour.

### Test Results

During development, the following verification results were observed:

<img width="494" height="368" alt="image" src="https://github.com/user-attachments/assets/170308ad-1de7-4595-8e9c-dc92eeca2b60" />

These results reflect the recorded development run. Run the commands again against the submitted code to verify the current state.

### Test-Driven Development Approach

The intended TDD workflow is:

1. **Red:** Write a test that describes the expected behaviour and confirm that it fails for the intended reason.
2. **Green:** Implement the minimum code necessary to make the test pass.
3. **Refactor:** Improve the implementation while keeping the tests passing.
4. **Repeat:** Apply the cycle to additional requirements and edge cases.

The automated tests help verify backend behaviour and reduce the risk of regressions when the implementation changes.

## API Overview

The backend organizes its HTTP API into two main route groups:

| Route group | Responsibility |
|---|---|
| Authentication routes | User registration and login |
| Vehicle routes | Vehicle listing, inventory operations, and purchasing |

The Express application mounts these routes under the `/api` API prefix.

For the precise endpoint paths, HTTP methods, request bodies, authentication requirements, and response formats, refer to the implementations in:

- `backend/src/routes/auth.js`
- `backend/src/routes/vehicles.js`

Protected operations should be accessed with the required authentication credentials and permissions.

## Security and Design Considerations

- **Authentication:** Authentication middleware protects operations that require a logged-in user.
- **Authorization:** Administrative operations should be restricted to users with the appropriate role.
- **Credential management:** Database connection strings and authentication secrets belong in local environment configuration, not in source control.
- **Separation of concerns:** Routes, data models, middleware, and frontend components are maintained in separate modules.
- **Persistent storage:** MongoDB is used for application data rather than relying exclusively on browser state.
- **Input validation:** Requests should be validated before modifying database records.
- **Error handling:** The application provides feedback for failed operations and errors.

## AI Usage Disclosure

AI tools were used as development assistance during the project for tasks such as understanding implementation approaches, troubleshooting errors, refining documentation, and improving development workflow.

The submitted source code, application behaviour, test execution, and project-specific decisions should be reviewed and verified by the developer. AI assistance does not replace responsibility for understanding, testing, and maintaining the implementation.

A separate `PROMPTS.md` file should contain the relevant original AI prompts and responses or public conversation links, as required by the assignment. Do not fabricate conversation records or claim that unverified suggestions were implemented.

## Future Improvements

Potential extensions include:

- Add pagination and more advanced vehicle filtering.
- Improve request validation and centralized error handling.
- Add integration tests for authorization, stock updates, and purchasing edge cases.
- Add frontend component and end-to-end tests.
- Improve accessibility and mobile responsiveness.
- Add continuous integration to run tests on each push.
- Add deployment configuration and production environment settings.
- Improve audit logging for inventory changes.

## Repository

**GitHub:** https://github.com/akshatha-27/motorhub-car-dealership

## Conclusion

MotorHub demonstrates a full-stack approach to dealership inventory management by combining a React frontend, an Express REST API, MongoDB persistence, authentication and authorization, and automated backend testing.

The project is structured to support maintainability, testability, and further development, with a focus on implementing and verifying core inventory management functionality.
