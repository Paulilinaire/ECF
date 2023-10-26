import Modal from './components/shared/Modal'
import { useDispatch, useSelector } from "react-redux";
import AddProject from "./routes/AddProject";
import { setFormMode } from "./components/projects/projectSlice";
import ProjectDisplay from "./components/projects/ProjectDisplay";

function App() {
  const formMode = useSelector(state => state.projects.formMode)
  const projects = useSelector(state => state.projects.projects)
  const dispatch = useDispatch()

  return (
    <>
    {formMode === "add" && <Modal onClose={() => dispatch(setFormMode(""))}><AddProject/></Modal>}
      <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <span className="navbar-brand"><i className="bi bi-cast me-2"></i>eProjects</span>
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
            <div>
                {/* <input
                    onChange={(e) => dispatch(setFilter(e.target.value))}
                    type="text"
                    value={filter}
                    placeholder="filter by title"
                  ></input> */}
            </div>
            <hr />
            <div className="d-flex flex-wrap align-items-center">
            {
              projects.length === 0 ? (
                <p>There is no project...</p>
              // ) : projects.filter((project) =>
              // filterBy ? project.title.toLowerCase().includes(filterBy) : true
              ) :
              projects.map(project => <ProjectDisplay key={project.id} project={project} />)
            }
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
