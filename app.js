var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cron = require("node-cron");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tasksRouter = require("./routes/tasks-json");

var fs = require("fs");
const DATA_PATH = "data/tasks.json";

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

function processingSimulate(req, res, next) {
  const wait = 500 + Math.floor(Math.random() * 6) * 100; // min-500ms + max-500ms
  setTimeout(() => {
    console.log("processing << exit");
    next();
  }, wait);
}
app.use("/tasks-json", processingSimulate, tasksRouter);
//app.use("/tasks-json", tasksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

cron.schedule("*/2 * * * *", () => {
  var tasks = getTasks();
  tasks.forEach(task => {
    task.completed = false;
  });
  setTasks(tasks);
});

function getTasks() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setTasks(tasks) {
  const content = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = app;
