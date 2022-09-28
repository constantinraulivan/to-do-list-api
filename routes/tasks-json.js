var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/tasks.json";

/**
 *
 */
router.get("/", function (req, res, next) {
  console.log("reading file %o", DATA_PATH);
  const tasks = getTasks();
  res.json(tasks);
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const name = req.body.name;
  const completed = false;

  const tasks = getTasks();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();
  tasks.push({
    id,
    name,
    completed
  });

  setTasks(tasks);

  res.json({ success: true, id });
  res.status(201);
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  const tasks = getTasks().filter(task => task.id != id);

  setTasks(tasks);

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const name = req.body.name;
  const completed = req.body.completed;

  const tasks = getTasks();

  const task = tasks.find(task => task.id == id);
  if (task) {
    task.name = name;
    task.completed = completed;
  }

  setTasks(tasks);

  res.json({ success: true });
});

function getTasks() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setTasks(tasks) {
  const content = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
