import { useDispatch, useSelector } from "react-redux";
import { setFormMode } from "../projectSlice";
import { deleteProject } from "../projectSlice";

const DeleteProject = () => {
    const selectedProject = useSelector(state => state.projects.selectedProject)
    const dispatch = useDispatch()

    const deleteFormHandler = async (event) => {
        event.preventDefault()

        dispatch(deleteProject(selectedProject))
        dispatch(setFormMode("delete"))
    }

    return ( 
        <>
            <h3>Supprimer ce projet</h3>
            <hr />
            <form onSubmit={deleteFormHandler}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titre:</label>
                    <input type="text" className="form-control" disabled defaultValue={selectedProject.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Contenu:</label>
                    <textarea className="form-control" rows="3" disabled defaultValue={selectedProject.content}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Statut:</label>
                    <select name="status" id="status" className="form-select" required disabled defaultValue={selectedProject.status}>
                         <option>Non débuté</option>
                         <option>En cours</option>
                         <option>En attente</option>
                         <option>Terminé</option>
                    </select>
                </div>
                <div className="text-end">
                    <button className="btn btn-danger">Supprimer</button>
                </div>
            </form>
        </>
     );
}
 
export default DeleteProject;