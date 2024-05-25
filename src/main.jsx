// --> Default imports
import React from "react";
import ReactDOM from "react-dom/client";

// --> Styles imports
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// --> External imports
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppProvider";

// --> Pages
import Root from "./pages/Root";
import Register from "./pages/Register/Register";
import SignIn from "./pages/SignIn/SignIn";
import Confirm from "./pages/Confirm/Confirm";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ForgotPasswordSuccessMessage from "./pages/ForgotPasswordSuccessMessage/ForgotPasswordSuccessMessage";

// --> Private and public routes
import PublicRoutes from "./auth/PublicRoutes";
import PrivateRoutes from "./auth/PrivateRoutes";

const router = createBrowserRouter([
  // --> Public Routes
  {
    element: <PublicRoutes />,
    children: [
      {
        element: <Root />,
        children: [
          {
            element: <Register />,
            path: "/register",
          },

          {
            element: <SignIn />,
            path: "/sign-in",
          },

          {
            element: <Confirm />,
            path: "/confirmaccount/:tokenid",
          },

          {
            element: <ForgotPassword />,
            path: "/forgot-password",
          },

          {
            element: <ForgotPasswordSuccessMessage />,
            path: "/forgot-password-message",
          },

          {
            element: <ChangePassword />,
            path: "/changepassword/:tokenid",
          },
        ],
      },
    ],
  },

  // --> Private Routes
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Root />,
        children: [],
      },
    ],
  },

  // --> Non public or private route
  {
    element: <Root />,
    children: [
      {
        element: <h2>Home</h2>,
        index: true,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <ToastContainer stacked position="top-center" />
      <RouterProvider router={router} />
    </AppProvider>
  </QueryClientProvider>
);
