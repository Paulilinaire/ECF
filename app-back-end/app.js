import express from "express";
import { ProjectDao } from "./dao/ProjectDao.js";
import { Project } from "./models/Project.js";

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

const projectDao = new ProjectDao();

app.use(express.json());

//return all projects
app.get ('/', (req, res) => {
    res.json(projectDao.getAll());
});

//return one single project
app.get('/projects/:projectId', (req, res) => {
    let project = projectDao.findById(req.params.projectId);

    if(todo == undefined) {
        res.status(404).json({code: 404, message: "Oops ! Aucun projet n'a été trouvé avec cet id."});
    }
    res.json(project);
});

//add project
app.post('/projects', (req, res) => {
    const {title, content, status} = req.body;
    let project = new Project(null, title, content, status);
    res.json(projectDao.save(project));
});

//update project
app.put('/projects/:projectId', (req, res) => {
    const {id, title, content, status} = req.body;

    if (req.params.projectId != id) res.sendStatus(409);

    let project = new Project(id, title, content, status);
    projectDao.updateProject(project) ? res.sendStatus(200) : res.status(400).json({code: 400, message: "Attention ! Problème lors de la mise à jour du projet." })
});

//change status
app.patch('/projects/:projectId/status', (req, res) => {
    projectDao.updateStatus(req.params.projectId) ? res.sendStatus(200) : res.sendStatus(400);
});

//delete project
app.delete('/projects/:projectId', (req, res) => {
    projectDao.deleteProject(req.params.projectId);
    res.status(200).json({code: 200, message: "Projet supprimé !" });
});

//serach project by status
app.get('/search/:search', (req, res) => {
    res.json(projectDao.searchByStatus(req.params.search));
});


app.listen(3002, () => {
    projectDao.readFile();
    console.log('http://127.0.0.1:3002');
});