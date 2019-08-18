const express = require("express");

const server = express();

server.use(express.json());
let count = 0;
server.use((req, res, next) => {
  if (req) {
    console.log((count += 1));
  }
  return next();
});
const projects = [];

function checkProjectExist(req, res, next) {
  projects.filter(({ id }, index) => {
    req.params.id !== id && res.json({ erro: "Projects not exists" });
  });
  // &&
  // ;

  next();
}

//create new project
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title });

  return res.json(projects);
});

//create new task in project
server.post("/projects/:id/tasks", checkProjectExist, (req, res) => {
  const { title } = req.body;
  projects.filter(({ id }, index) => {
    if (req.params.id == id) {
      !projects[index].tasks
        ? (projects[index] = { ...projects[index], tasks: [title] })
        : (projects[index] = {
            ...projects[index],
            tasks: [...projects[index].tasks, title]
          });
    }
  });

  return res.json(projects);
});

//list projects
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Update project
server.put("/projects/:id", checkProjectExist, (req, res) => {
  const { title } = req.body;
  projects.filter(({ id }, index) => {
    req.params.id == id && (projects[index] = { ...projects[index], title });
  });

  return res.json(projects);
});

//Delete project
server.delete("/projects/:id", checkProjectExist, (req, res) => {
  projects.filter(({ id }, index) => {
    req.params.id == id && projects.splice(index, 1);
  });

  return res.send();
});

server.listen(3000);
