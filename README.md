# Task Manager App

This is a Task Manager application built with **Node.js**, **Express**, **MongoDB**, **React**, and **Mongoose**. It allows users to create, update, and delete tasks through a REST API and provides a simple user interface for managing tasks.

## Features

- Create new tasks
- View all tasks
- Update tasks
- Delete tasks

## Technologies Used

- **Backend:**
  - Node.js
  - Express
  - MongoDB (with Mongoose for database operations)
  
- **Frontend:**
  - React

- **Testing:**
  - Jest
  - Supertest

## Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/Bfawaz2001/task-manager-app.git
  ```

2. Navigate to the project directory:
  
  ```bash
  cd task-manager-app
  ```

3. Install the dependencies:

  ```bash
  npm install
  ```
    
4. Navigate to the **client** folder and install the frontend dependencies:

  ```bash
  cd client
  npm install
  ```
    
5. Create a **.env** file in the root directory and add your MongoDB URI:

  ```bash
  MONGO_URI=<your_mongodb_connection_string>
  PORT=5001
  ```
    
6. Start the application:
- Run the backend:
  ```bash
  npm start
  ```
- Run the frontend:
  ```bash
  cd client
  npm start
  ```
The app should be running on **http://localhost:3000** for the frontend and **http://localhost:5001** for the backend API.

## API Endpoints
- **GET /api/tasks** - Fetch all tasks
- **POST /api/tasks** - Create a new task
- **PUT /api/tasks/**
  - Update a task
- **DELETE /api/tasks/**
  - Delete a task

## Running Tests
To run the test suite for the API:
  
  ``` bash
  npm test
  ```

## Contributing
Feel free to fork the repository and submit pull requests. Any contributions are welcome!

## License
This project is licensed under the MIT License - see LICENSE.md for more details.
