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
    "project/postProject",
    async (newProject) => {
        const response = await fetch("http://127.0.0.1:3002/projects", {
            method: "POST",
            headers: {
                "Content-Type" : "application.json"
            },
                body: JSON.stringify(newProject)
        })
        if(!response.ok) {
            throw new Error("Something went wrong with the POST project request")
        }
        const data = await response.json()
        return {
            id: data.name, ...newProject
        }
    }
)

export const putProject = createAsyncThunk(
    "project/putProject",
    async (project) => {
        const response = await fetch(`http://127.0.0.1:3002/projects/${project.id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application.json"
            },
                body: JSON.stringify(project)
        })
        if(!response.ok) {
            throw new Error("Something went wrong with the PUT project request")
        }
        const data = await response.json()
        return {
            id: data.title,
            ...project
        }
    }
)

export const deleteProject = createAsyncThunk(
    "projects/deleteProject",
    async(selectedProject) => {      
        const response = await fetch(`http://127.0.0.1:3002/projects/${selectedProject.id}`, {
            method: "DELETE"
        })
        if(!response.ok) {
            throw new Error("Something went wrong during the DELETE request")
        }
        const data = await response.json()
        return selectedProject.id

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
    //edit project
    builder.addCase(putProject.fulfilled, (state, action) => { 
        let foundProject = state.projects.find(project => project.id === action.payload.id)
        if (foundProject) {
            state.projects = [...state.projects.filter(project => project.id !== action.payload.id), action.payload]
        }
    })
    // delete project
    builder.addCase(deleteProject.fulfilled, (state, action) => { 
        console.log("test");
        let foundProject = state.projects.find(a => a.id === action.payload)
        if (foundProject) {
            state.projects = state.projects.filter(a => a.id !== action.payload)
        }
    }) 
    }
});

export default projectSlice.reducer
export const {setFormMode, setSelectedProject, setFilteredProjects}= projectSlice.actions