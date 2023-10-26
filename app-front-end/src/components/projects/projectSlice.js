import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk(
    "project/fetchProjects",
    async () => {
        const response = await fetch("http://127.0.0.1:3002/")
        const data = await response.json()
        const projects = []
        console.log(data);
        for (const key in data){
            projects.push({id: key, ...data[key]})
        }
        return projects
    }
)

export const postProject = createAsyncThunk(
    "project/postAlbum",
    async (newProject) => {
        const response = await fetch("http://127.0.0.1:3002/projects", {
            method: "POST",
            headers: {
                "Content-Type" : "application.json"
            },
                body: JSON.stringify(newProject)
        })
        if(!response.ok) {
            throw new Error("Une erreur est intervenue lors de la POST project request")
        }
        const data = await response.json()
        return {
            id: data.name, ...newProject
        }
    }
)



const projectSlice = createSlice({
    name:"projects",
    initialState: {
        formMode: "",
        projects: [],
        filteredProjects: [],
        selectedProject: null
    },
    reducers: {
        setFormMode: (state, action) => {
            state.formMode = action.payload
        },
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload
        },
    },
    extraReducers: (builder) => {
    //set projects
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload
    })
    //add project
    builder.addCase(postProject.fulfilled, (state, action) => {
        state.projects.push(action.payload)
    })
    }
});

export default projectSlice.reducer
export const {setFormMode, setSelectedProject, setFilteredProjects}= projectSlice.actions