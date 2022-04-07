const express = require ('express');
const router = express.Router();
const data = require('../utils/data');


router.get('/',function(request, response){
        response.json(data.todos)
    })

router.get('/id', function(request, response){
    let todoParam = request.query.id

    todoParam = Number(todoParam);
    if(isNaN(todoParam) || (todoParam <= 0) || (todoParam  > data.todos.length)) {
    const result = {
        error: true,
            description: `please type in a valid number. A number between 1 and ${data.todos.length}`,
        payload: "Null"
        
        } 
        response.json(result);
        return;
    }else{
        let todo = data.todos[todoParam-1]
    
        response.json({
            error: false,
            description: "Got the todo item",
            payload: todo
        
        })
    }
})

router.post('/',function (request, response) {
    let payload = request.body.task;
    payload = payload.replace(/\s+/g, " ").trim();
    payload = payload.toLowerCase();
    if(
        payload === ""
        ) {
        response.json({
        error: true,
        description: "Enter a task",
        payload: "Null"
        })
        return
    }
    if (
        data.todos.includes(
        payload
        )
    ) {
        response.json({
        error: true,
        description: "todo already exists",
        payload: "Null",
        });
        return;
    }else{
        data.todos.push(payload);
        response.json({
        error: false,
        description: "Your todo was added successfully",
        payload: data.todos,
        });
    }
    
})


router.put('/id', function(request, response)  {

    let taskId = request.query.id;
    
    taskId = Number(taskId)

    if(isNaN(taskId) || (taskId <= 0) || (taskId  > data.todos.length)) {
        const result = {
            error: true,
            description: `please type in a valid number. A number between 1 and ${data.todos.length}`,
            payload: "Null"
        
            } 
        response.json(result);
        return;
    }	

    let removedTodo = data.todos.splice(taskId - 1, 1)

    data.completed.push(...removedTodo)

    const result = {
        error: false,
        description: "Completed",
        payload: data.completed
    }
    
    response.json(result);
})

router.delete('/id', (request, response) => {
    let taskId = request.query.id;
    taskId = Number(taskId);
    
    if(isNaN(taskId) || (taskId <= 0) || (taskId  > data.todos.length)) {
        const result = {
            error: true,
            description: `please type in a valid number. A number between 1 and ${todos.length}`,
            payload: "Null"
        
        } 
        response.json(result);
        return;
    }else{
        data.todos.splice(taskId-1, 1)
        response.json({
        error: false,
        description: "Deleted successfully",
        payload: data.todos
        })
    }
    
})

module.exports = router