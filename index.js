import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let currentDay = 0, currentMonth = 0, currentYear = 0;
let dailyTasks = [];
let workTasks = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function getCurrentDate(req, res, next) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const date = new Date();
  currentDay = days[date.getDay()];
  currentMonth = months[date.getMonth()];
  currentYear = date.getFullYear();

  next();
}

app.use(getCurrentDate);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    day: currentDay,
    month: currentMonth,
    year: currentYear,
    tasklist: dailyTasks
  });
});

app.get("/work", (req, res) => {
  res.render("work.ejs", {
    tasklist: workTasks
  });
});

app.post("/", (req, res) => {
  dailyTasks.push(req.body["newItem"]);
  res.render("index.ejs", {
    day: currentDay,
    month: currentMonth,
    year: currentYear,
    tasklist: dailyTasks
  });

})

app.post("/work", (req, res) => {
  workTasks.push(req.body["newItem"]);
  res.render("work.ejs", {
    tasklist: workTasks
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});