import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProjectDisplay from "./components/projects/ProjectDisplay";
import AddProject from "./components/projects/forms/AddProject";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/add",
        element: <AddProject />
    },
    {
        path: "/detail/:id",
        element: <ProjectDisplay />
    }
]);

export default router