const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'],
}
));
app.use(express.json());


// var allowlist = ['http://localhost:3000']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

const todos = [];

const completed = [];


app.get('/todos', function(request, response){
  response.json(todos);
});

app.get('/todo/id', function(request, response){
  let todoParam = request.query.id
 
  todoParam = Number(todoParam);
  if(isNaN(todoParam) || (todoParam <= 0) || (todoParam  > todos.length)) {
    const result = {
      error: true,
			description: `please type in a valid number. A number between 1 and ${todos.length}`,
      payload: "Null"
      
		} 
		response.json(result);
		return;
	}else{
    let todo = todos[todoParam-1]
  
    response.json({
      error: false,
      description: "Got the todo item",
      payload: todo
      
    })
  }
  


})

app.post("/todo", function (request, response) {
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
    todos.includes(
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
    todos.push(payload);
    response.json({
      error: false,
      description: "Your todo was added successfully",
      payload: todos,
    });
  }
 
});

app.put('/todo/id', function(request, response)  {
  
  let taskId = request.query.id;
  
	taskId = Number(taskId)
  
	if(isNaN(taskId) || (taskId <= 0) || (taskId  > todos.length)) {
    const result = {
      error: true,
			description: `please type in a valid number. A number between 1 and ${todos.length}`,
      payload: "Null"
      
		} 
		response.json(result);
		return;
	}	
  
	let removedTodo = todos.splice(taskId - 1, 1)
  
	completed.push(...removedTodo)
  
	const result = {
    error: false,
		description: "Completed",
    payload: completed
	}
  
  response.json(result);
});

app.get('/completed/todo', (request, response)=>{
  response.json(completed)
})

app.delete('/todo/id', (request, response) => {
  let taskId = request.query.id;
  taskId = Number(taskId);

  if(isNaN(taskId) || (taskId <= 0) || (taskId  > todos.length)) {
    const result = {
      error: true,
			description: `please type in a valid number. A number between 1 and ${todos.length}`,
      payload: "Null"
      
		} 
		response.json(result);
		return;
	}else{
    todos.splice(taskId-1, 1)
    response.json({
      error: false,
      description: "Deleted successfully",
      payload: todos
    })
  }
  
});


app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
