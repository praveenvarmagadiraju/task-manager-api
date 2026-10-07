const express = require("express");
const pool = require("./config/db");
const tasksController = require("./controllers/tasksController");

const app = express();
app.use(express.json()); 
//tells Express: "When the client sends JSON in the request body, parse it and put the result in req.body"


require("dotenv").config();

const port = process.env.PORT || 3000;

//create user routes


//Tasks Routes
app.get('/getAllTasks', tasksController.getAllTasksController);
app.post('/addTask',tasksController.addTaskController);
app.post('/updateTask',tasksController.updateTaskStatusController);
app.post('/deleteTask',tasksController.deleteTaskController);
app.get('/getTaskById/:taskid',tasksController.getTaskByIdController);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});