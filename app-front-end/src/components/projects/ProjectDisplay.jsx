import { useDispatch } from "react-redux";
import { setFormMode, setSelectedProject } from "./projectSlice";


const ProjectDisplay = (props) => {
    const project = props.project
    const dispatch = useDispatch()


    const editProjectHandler = () => {
        dispatch(setFormMode("edit"))
        dispatch(setSelectedProject(project))
    }

    const deleteProjectHandler = () => {
        dispatch(setFormMode("delete"))
        dispatch(setSelectedProject(project))
    }
    
    return ( 
        <>
        
            <div className="col-3 bg-dark bg-gradient rounded border border-secondary text-light p-2">
                <h5 className="mb-3">{project.title}</h5>
                <div className="text-center">
                    <span><strong>Contenu:</strong> {project.content}</span>
                    <hr />
                    <span><strong>Statut:</strong> {project.status}</span>
                    <hr />
                </div>
                    <div className="text-end">
                        <button className="btn btn-warning me-2" onClick={() => editProjectHandler()}><i class="bi bi-pencil-square me-1"></i>Edit</button>
                        <button className="btn btn-danger me-2" onClick={() => deleteProjectHandler()}><i class="bi bi-trash3 me-1"></i>Delete</button>
                    </div>
            </div>
        </>
     );
}
 
export default ProjectDisplay;