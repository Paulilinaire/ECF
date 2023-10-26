import Modal from './components/shared/Modal'
import { useDispatch, useSelector } from "react-redux";
import AddProject from "./components/projects/forms/AddProject";
import { setFormMode } from "./components/projects/projectSlice";
import ProjectDisplay from "./components/projects/ProjectDisplay";
import { fetchProjects } from './components/projects/projectSlice';
import { useEffect } from 'react';
import EditProject from './components/projects/forms/EditProject';
import DeleteProject from './components/projects/forms/DeleteProject';
import { setFilter } from './components/filter/filterSlice';


function App() {
  const formMode = useSelector(state => state.projects.formMode)
  const projects = useSelector(state => state.projects.projects)
  const dispatch = useDispatch()
  const filterBy = useSelector(state => state.filter.filter)
  const filter = useSelector(state => state.filter.filter)

  const refreshProjects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3002/")

      if(!response.ok){
        throw new Error("Une erreur est intervenur lors de la requête GET")
      }

      const data = await response.json()

      const tmpProjects = []
      for (const key in data) {
        tmpProjects.push({id: key, ...data[key]})
      }

      dispatch(fetchProjects(tmpProjects))
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    refreshProjects()
  }, [])


  return (
    <>
    {formMode === "add" && <Modal onClose={() => dispatch(setFormMode(""))}><AddProject/></Modal>}
    {formMode === "edit" && <Modal onClose={() => dispatch(setFormMode(""))}><EditProject/></Modal>}  
    {formMode === "delete" && <Modal onClose={() => dispatch(setFormMode(""))}><DeleteProject/></Modal>}  
      <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <span className="navbar-brand"><i className="bi bi-cast me-2"></i>ProjectTracker Pro</span>
                </div>
            </nav>
      </header>
      <main className='container'>
        <div className='row my-3'>
          <div className='col-12 bg-dark bg-gradient rounded text-light p-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <h3>Projects</h3>
              <button className='btn btn-success' onClick={() => dispatch(setFormMode("add"))}><i class="bi bi-plus-circle me-2"></i>Ajouter Projet</button>
            </div>
            <div className='col-3'>
                <input
                    onChange={(e) => dispatch(setFilter(e.target.value))}
                    type="text"
                    className='form-control'
                    value={filter}
                    placeholder="Filtrer par statut"
                  ></input>
            </div>
            <hr />
            <div className="d-flex flex-wrap align-items-center">
            {
              projects.length === 0 ? (
                <p>Il n'y a pas de projet...</p>
              ) : projects.filter((project) =>
              filterBy ? project.status.toLowerCase().startsWith(filterBy) : true
              ).map(project => <ProjectDisplay key={project.id} project={project} />)
            }
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
