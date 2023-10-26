import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putProject } from "../projectSlice";
import { setFormMode } from "../projectSlice";

const EditProject = () => {
    const dispatch = useDispatch()
    const selectedProject = useSelector(state => state.projects.selectedProject)

    const titleRef = useRef()
    const contentRef = useRef()
    const statusRef = useRef()

    const editFormHandler = (event) => {
        event.preventDefault()

        const newProject = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            status: statusRef.current.value,
        }
        dispatch(putProject({...newProject, id: selectedProject.id}))
        dispatch(setFormMode("edit"))
        console.log(newProject);
    }

    return ( 
        <>
            <h3>Editer ce projet</h3>
            <hr />
            <form onSubmit={editFormHandler}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titre:</label>
                    <input type="text" className="form-control" required ref={titleRef} defaultValue={selectedProject.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Contenu:</label>
                    <textarea className="form-control" rows="3" ref={contentRef} defaultValue={selectedProject.content}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Statut:</label>
                    <select name="status" id="status" className="form-select" required ref={statusRef} defaultValue={selectedProject.status}>
                         <option>Non débuté</option>
                         <option>En cours</option>
                         <option>En attente</option>
                         <option>Terminé</option>
                    </select>
                </div>
                <div className="text-end">
                    <button className="btn btn-warning">Editer</button>
                </div>
            </form>
        </>
     );
}
 
export default EditProject;