import { createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "../pages/root/Home.jsx";
import LoginPage from "../pages/root/Login.jsx";
import RegisterPage from "../pages/root/Register.jsx";
import ProfilePage from "../pages/root/Profile.jsx";
import RootLayout from "../pages/layouts/Root.jsx";
import DashboardPage from "../pages/dashboard/Dashboard.jsx";
import TasksLayout from "../pages/layouts/TasksLayout.jsx";

import Projects from "../pages/dashboard/Projects.jsx";
import Tasks from "../pages/dashboard/Tasks.jsx";
import Users from "../pages/dashboard/Users.jsx";

export const  router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: "login",
          element: <LoginPage />
        },
        {
          path: "register",
          element: <RegisterPage />
        },
        {
        path: "dashboard",
        element: <TasksLayout />,
        children: [
            {
              index: true,
              element: <DashboardPage />,
            },
            {
              path: "projects",
              element: <Projects />
            },
            {
              path: "users",
              element: <Users />
            },
            {
              path: "tasks",
              element: <Tasks />
            }, 
            {
            path: "profile",
            element: <ProfilePage />
            },
        ],
      }, 
    ],      
  },
  
]);