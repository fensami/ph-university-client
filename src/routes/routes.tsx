import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";
import About from "../pages/About";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routeGeneretor";
import { facultyPaths } from "./faculty.routes";

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
    element: <App></App>,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <App></App>,
    children: routeGenerator(facultyPaths),
  },
  { path: "login", element: <Login></Login> },
  { path: "register", element: <Register></Register> },
]);

export default router;
