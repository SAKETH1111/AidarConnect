## Aidar Connect Form Builder
### Front End UI
In this project, we are using React.js for building the front-end user interface of the AidarConnect form builder.

#### Prerequisites
Before starting, ensure that the following are installed on your system:

1. **Node.js**: Download and install the [latest stable version of Node.js](https://nodejs.org/en) from the official website. Node.js comes with **npm** (Node Package Manager) which is required to install project dependencies.
2. **React.js**: React is a JavaScript library for building user interfaces. It will be automatically installed when setting up the project dependencies through npm.
3. **Tailwind CSS**: A utility-first CSS framework used for designing modern and responsive user interfaces.

4. **@hello-pangea/dnd**: A drag-and-drop library used for managing the form builder's dynamic drag-and-drop functionality.

---
### Steps to Set Up and Run the Front End
**1. Clone the Project**

First, clone the AidarFormBuilder project from the repository to your local machine:
```
git clone <repository-url>
cd aidarformbuilder
```
**2. Install Project Dependencies**

Navigate to the project folder (aidarformbuilder) using the terminal, then run the following command to install all required dependencies listed in the package.json file:
```
npm install
```
This will install all necessary packages, including **React, Tailwind CSS, @hello-pangea/dnd**, and other third-party libraries required for the project.

**3. Tailwind CSS Setup**

- Tailwind CSS has been integrated into the project for efficient and flexible UI design. It provides utility classes that allow you to create complex layouts with minimal custom CSS.
- Make sure **Tailwind CSS** is configured properly in the tailwind.config.js file. The configuration file is already set up in this project, but if you need to customize it further, you can do so in this file.

You can also visit the [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation) for more information on usage and customization.

**4. Drag-and-Drop Functionality**

- The form builder leverages the @hello-pangea/dnd library to enable drag-and-drop interactions for form elements.
- This allows users to rearrange and manage form components dynamically, providing a more interactive and user-friendly experience.
For more details on how drag-and-drop is implemented, refer to the [@hello-pangea/dnd](https://www.npmjs.com/package/@hello-pangea/dnd) documentation.

**5. Start the Application**

After the installation process completes, you can start the development server by running:
```
npm run start
```
This will launch the React application, and it will be accessible at http://localhost:3000 in your web browser.

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
    Open Postman and use the [defined endpoints](https://github.com/SAKETH1111/AidarConnect/tree/main/CrudAPI#readme) to test the API.
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
- **[API Endpoints](https://github.com/SAKETH1111/AidarConnect/tree/main/CrudAPI#readme)**: The project has multiple CRUD endpoints to handle user and survey data. Use Postman or similar tools to send HTTP requests to these endpoints.
- **Nodemon**: This tool ensures that your server restarts automatically upon any code changes, improving development efficiency.

Feel free to contribute or raise issues if you encounter any difficulties with this project.


