import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Survey from './components/Survey';
import Welcome from './components/Welcome';
import Profile from './components/Profile';
import Logout from './components/Logout';
import SurveyAnswer from './components/SurveyAnswer';
import AnsweredSurvey from './components/AnsweredSurvey';

// Define the routes
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />, // Render the Login page at the root path
  },
  {
    path: '/home',
    element: <App />, // Render the App after successful login
    children: [
      {
        path: '', // This will render Welcome as the default when visiting "/createsurvey"
        element: <Welcome />,
      },
      {
        path: 'createsurvey',
        element: <Survey />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'showsurvey',
        element: <SurveyAnswer />,
      },
      {
        path: 'AnsweredSurvey',
        element: <AnsweredSurvey />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
