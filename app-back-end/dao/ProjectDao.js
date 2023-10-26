import { readFileSync, writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";


export class ProjectDao {
    constructor(){
        this.file = resolve("./data/dataBase.json");
        this.projects = [];
    }

    readFile(){
        const file = readFileSync(this.file, {encoding: "utf-8"});
        this.projects = JSON.parse(file);
    }

    writeFile() {
        writeFileSync(this.file, JSON.stringify(this.projects));
    }

    getAll() {
        return this.projects;
    }

    save(project) {
        project.id = uuidv4();
        this.projects.push(project);
        this.writeFile();
        return project;
    }

    findById(id) {
        return this.projects.find((p) => p.id === id);
    }

    deleteProject(id) {
        this.projects = this.projects.filter((p) => p.id !== id);
    }

    updateProject(projectUpdate) {
        const project = this.findById(projectUpdate.id);
        if (project == undefined) {
            return false;
        }
        project.status = projectUpdate.status;
        project.title = projectUpdate.title;
        project.content = projectUpdate.content;

        this.writeFile();
        return true;
    }

    updateStatus(id) {
        const project = this.findById(id);
        if (project == undefined) {
            return false;
        }
        project.status = !project.status;
        this.writeFile();

        return true;
    }

}