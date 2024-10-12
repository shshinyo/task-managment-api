# Task Management API

## Description

The **Task Management API** is an application designed to help users manage their tasks efficiently. Built using **Node.js** and **TypeScript**, this application provides a RESTful API to perform operations such as creating, retrieving, updating, and deleting tasks. It leverages **MongoDB** for data persistence and **Redis** for caching, enhancing performance and responsiveness.

### Features
- User registration and authentication (JWT-based)
- CRUD operations for tasks
- Role-based access control (admin and regular user)
- Rate limiting to prevent abuse
- Caching of user tasks using Redis to improve performance
- API documentation using Swagger
- API Testing using Jest



## Caching Mechanism

To optimize performance, the Task Management API employs **Redis** as a caching layer. When a user requests a task, the API first checks if the data is available in the Redis cache. If it is, the data is returned directly from the cache, significantly reducing response times. If the data is not cached, the API retrieves it from **MongoDB**, stores it in Redis for subsequent requests, and then returns it to the user.

## Rate Limiting

To protect the API from excessive requests, we implement rate limiting using a middleware that restricts the number of requests a user can make within a specified time window. This helps ensure fair usage and enhances the overall stability of the API.


## Swagger API Documentation

The Task Management API uses **Swagger** for interactive API documentation. This provides a user-friendly interface to explore the available API endpoints, including their descriptions, parameters, and response formats.


### Accessing Swagger Documentation

Once the application is running, you can access the Swagger documentation at: http://localhost:3000/api-docs
This page allows you to view all the API endpoints, try out requests directly from the browser, and see responses in real time. Swagger generates documentation based on the defined routes and their respective controllers, making it easier to understand and use the API.


##  API TESTING

The Task Management API uses **Jest** for  API TESTING. make sure that Redis is running before run tests .
 ```bash
   git clone https://github.com/shshinyo/task-managment-api.git
   cd task-management-api
   npm test


## Technologies Used
- **Node.js**: JavaScript runtime for building the server-side application.
- **TypeScript**: Superset of JavaScript that adds static typing, enhancing code quality and maintainability.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Redis**: In-memory data structure store, used for caching.
- **Joi**: Validation library for request payloads.
- **Swagger**: API documentation tool for generating and maintaining documentation.


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/) (locally or via a cloud provider)
- [Redis](https://redis.io/) (locally or via a cloud provider)
- [Docker](https://www.docker.com/) (optional, for containerization)

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shshinyo/task-managment-api.git
   cd task-management-api
   npm install
   npm run start  

### Docker Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shshinyo/task-managment-api.git
   cd task-management-api
   docker-compose up --build

now server is running on port 3000 enjoy hitting the apis http://localhost:3000/api-docs .

