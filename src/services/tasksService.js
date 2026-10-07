// const pool = require("../config/db");
const Pool = require("../config/db");

async function getAlltasksService(){
    try{
        console.log("service");
        const result = await Pool.query("select * from tasks where isdeleted = 'false' " );
        return result.rows;
    }
    catch(error){
        console.log(error);
        return error;

    }
}


async function addTaskService(title,description,createdby,estimatedtime){
    try{
        console.log(title,description,createdby,estimatedtime);
        const result = await Pool.query(`INSERT INTO tasks(title,description,createdby,estimatedtime)
            VALUES($1,$2,$3,$4) returning *`,[title,description,createdby,estimatedtime]);
        return result.rows;
        
    }
    catch(error){
        console.log(error);
        return error;
    }
}

async function updateTaskStatusService(taskid){
    try{
        const findCompleted = await Pool.query(`select completed from tasks where taskid = $1`,[taskid]);
        console.log("findcomplete",findCompleted.rows[0].completed);
        if(findCompleted.rows[0].completed == false){
        const result = await Pool.query(`UPDATE tasks SET completed = $1
            where taskid = $2 returning *`,[true,taskid]);
        return result.rows;
        }
        else{
            const result = await Pool.query(`UPDATE tasks SET completed = $1
            where taskid = $2 returning *`,[false,taskid]);
        return result.rows;
        }
    }
    catch(error){
        return error;
    }
}


async function deleteTaskService(taskid){
    try{
    const result = await Pool.query(`update tasks set isdeleted = $1 where taskid = $2 `,[true,taskid]);
    return  `${taskid} is deleted`
    
    }
    catch(error){
        console.log(error);
        return  error;
    }

}

async function getTaskByIdService(taskid){
    try{
        console.log(taskid);
        const result = await Pool.query(`select * from tasks where taskid = $1 `, [taskid]);
        console.log(result.rows);
        return result.rows[0];
    }
    catch(error){
        console.log(error);
        return error.message;
    } 
}

module.exports = {getAlltasksService,addTaskService,updateTaskStatusService,deleteTaskService,
    getTaskByIdService
};