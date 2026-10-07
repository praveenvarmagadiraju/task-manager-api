const { Result } = require("pg");
const tasksService = require("../services/tasksService");

async function getAllTasksController(req,res)  {
    try{
        console.log("controller");
        const result = await tasksService.getAlltasksService();
        console.log(result);
        res.status(200).json(result);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

async function addTaskController(req,res){
    try{
        const {title,description,createdby,estimatedtime} = req.body; 
        if(!title || !description || !createdby || !estimatedtime){
          return res.status(400).json({
                success: false,
                message: "title, description, createdby and estimatedtime are required"
            });
        }
        
        const result = await tasksService.addTaskService(title,description,createdby,estimatedtime);
        res.status(201).json(result);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
}

async function updateTaskStatusController(req,res){
    try{
        const taskid = req.body.taskid;
        const result = await tasksService.updateTaskStatusService(taskid);
        res.status(200).json(result);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

async function deleteTaskController(req,res){
    try{
        const taskid = req.body.taskid;
        const result = await tasksService.deleteTaskService(taskid);
        res.status(200).json(result);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
}

async function getTaskByIdController(req,res){
    try{
        const taskid = req.params.taskid;
        console.log(taskid);
        const result = await tasksService.getTaskByIdService(taskid);
        res.status(200).json(result);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {getAllTasksController,addTaskController,updateTaskStatusController,
    deleteTaskController,getTaskByIdController};