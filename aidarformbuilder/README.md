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
