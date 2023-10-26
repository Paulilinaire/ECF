import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./components/projects/projectSlice";
import filterSlice from "./components/filter/filterSlice";

export default configureStore({
    reducer: {
        projects: projectSlice,
        filter: filterSlice
    }
})