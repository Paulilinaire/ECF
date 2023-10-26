import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./components/projects/projectSlice";

export default configureStore({
    reducer: {
        projects: projectSlice
    }
})