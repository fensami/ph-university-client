import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";
import About from "../pages/About";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routeGeneretor";
import { facultyPaths } from "./faculty.routes";
import ProtectedRoutes from "../components/layout/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "contact", element: <Contact></Contact> },
      { path: "about", element: <About></About> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutes role="admin">
        <App></App>
      </ProtectedRoutes>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoutes role="faculty">
        <App></App>
      </ProtectedRoutes>
    ),
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoutes role="student">
        <App></App>
      </ProtectedRoutes>
    ),
    children: routeGenerator(facultyPaths),
  },
  { path: "login", element: <Login></Login> },
  { path: "register", element: <Register></Register> },
]);

export default router;
