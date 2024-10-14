## Aidar Connect

---
## Backend API and Database Setup
In this project, we are building a backend using Node.js, Express, and MongoDB as the database. Below are the details of the tools and setup being used, along with steps to run the API and database.
### Technologies Used
1. **Node.js**: A JavaScript runtime for building fast and scalable server-side applications.
2. **Express**: A minimal web application framework for Node.js to handle routing and middleware.
3. **MongoDB**: A NoSQL database used to store user and survey details in this project.
4. **Postman**: A tool for testing API requests and responses.
5. **Nodemon**: A utility that automatically restarts the server when changes are detected in the codebase.
6. **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, making it easier to manage database schemas and models.
7. **CORS (Cross-Origin Resource Sharing)**: A middleware that enables secure handling of cross-origin requests in your API.

### Database Details
- **Database Name**: `AidarDB`
- **Collections**:
  - **User Collection**: Stores user details.
  - **Survey Collection**: Stores survey-related data.

### API Details
- The server is running on port 9000.
- **Nodemon** is being used to automatically restart the server whenever code changes are saved.
- **Mongoose** is used to interact with MongoDB for schema definition and query building.
- **CORS** is enabled to allow requests from different origins, which is useful for frontend-backend communication in development environments.
---
## Steps to Run the Backend API and Database

### 1. Setting Up the Database (MongoDB)

#### Install MongoDB:
- Option 1 (CLI): Install [MongoDB](https://www.mongodb.com/try/download/shell) via the terminal, and run the following command to start the MongoDB server.
  ```
  mongod
  ```
- If you face permission issues, you can specify the dbpath as follows:
  ```
  sudo mongod --dbpath=/Users/yourfoldername/data/db
  ```

#### Optional (GUI for MongoDB):
- **MongoDB Compass**: Download and install [MongoDB Compass](https://www.mongodb.com/products/tools/compass) to have a graphical interface for your MongoDB database, allowing you to easily view, query, and manage your collections.
#### Common MongoDB Issues:
- **Port Already in Use Error**: If you encounter this issue after stopping the MongoDB server, follow these steps to kill the process:
  1. Run the following command to find the MongoDB process ID (PID)
  ```
  ps aux | grep mongod
  ```
  2. Kill the process using:
  ```
  sudo kill -9 <PID>
  ```
### Troubleshooting:
- If you encounter any issues during MongoDB installation or setup, you can refer to this [video tutorial](https://www.youtube.com/watch?v=8gUQL2zlpvI).
---
### 2. Running the Backend API
#### Steps:
1. **Navigate to the API Folder**:
    Open the terminal and navigate to the folder where your backend code (CRUD API) is stored.

2. **Install Dependencies**:
    Run the following command to install the required Node.js dependencies (from `package.json`):
   ```
   npm install
   ```
3. **Start the Server**:
    Use **Nodemon** to start the server so that it automatically restarts when code changes are saved:
    ```
    nodemon run start
    ```
4. **Postman for API Testing**:
    Open Postman and use the defined endpoints to test the API.
#### Common API Server Issues:
- **Port Already in Use Error**:

  If you face an issue where the port is already in use, run the following command to find and kill the process   using that port:
  ```
  sudo kill -9 <PID>
  ```
---
#### Additional Middleware
**Mongoose**: Mongoose is used to define schemas and interact with the MongoDB database. It provides an easy-to-use structure for querying and updating the database, ensuring that our data adheres to the defined schema.

**CORS**: Cross-Origin Resource Sharing (CORS) is enabled to allow the backend to accept requests from different domains. This is especially useful when your frontend and backend are hosted on different servers or during development.

---
#### Additional Notes
- **API Endpoints**: The project has multiple CRUD endpoints to handle user and survey data. Use Postman or similar tools to send HTTP requests to these endpoints.
- **Nodemon**: This tool ensures that your server restarts automatically upon any code changes, improving development efficiency.

Feel free to contribute or raise issues if you encounter any difficulties with this project.

## Front End

1.` npm install` to install the package.json dependecies
2. `npm start` to run the website at localhost:3000
