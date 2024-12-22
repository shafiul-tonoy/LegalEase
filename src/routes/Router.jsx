import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services";
import AddService from "../pages/AddService";
import BookedService from "../pages/BookedService";
import ManageService from "../pages/ManageService";
import ServiceToDo from "../pages/ServiceToDo";
import PrivateRoute from "../routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "addService",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "bookedService",
        element: (
          <PrivateRoute>
            <BookedService />
          </PrivateRoute>
        ),
      },
      {
        path: "manageService",
        element: (
          <PrivateRoute>
            <ManageService />
          </PrivateRoute>
        ),
      },
      {
        path: "serviceToDo",
        element: (
          <PrivateRoute>
            <ServiceToDo />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
