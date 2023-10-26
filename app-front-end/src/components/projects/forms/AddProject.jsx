import { useRef } from "react";
import { useDispatch } from "react-redux";
import { postProject, setFormMode } from "../projectSlice";

const AddProject = () => {
    const dispatch = useDispatch()

    const titleRef = useRef()
    const contentRef = useRef()
    const statusRef = useRef()

    const addFormHandler = (event) => {
        event.preventDefault()

        const newProject = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            status: statusRef.current.value,
        }
        dispatch(postProject(newProject))
        dispatch(setFormMode("add"))
    }

    return ( 
        <>
            <h3>Ajouter un projet</h3>
            <hr />
            <form onSubmit={addFormHandler}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titre:</label>
                    <input type="text" className="form-control" required ref={titleRef}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Contenu:</label>
                    <textarea className="form-control" rows="3" required ref={contentRef}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Statut:</label>
                    <select name="status" id="status" className="form-select" required ref={statusRef}>
                         <option>Non débuté</option>
                         <option>En cours</option>
                         <option>En attente</option>
                         <option>Terminé</option>
                    </select>
                </div>
                <div className="text-end">
                    <button className="btn btn-success">Ajouter</button>
                </div>
            </form>
        </>
     );
}
 
export default AddProject;