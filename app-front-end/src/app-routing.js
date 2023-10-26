import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProjectDisplay from "./components/projects/ProjectDisplay";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/detail/:id",
        element: <ProjectDisplay />
    }
]);

export default router