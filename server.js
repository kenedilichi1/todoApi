const express = require('express');

const app = express();
const PORT = 5001;

const todos = [
	'Visit Saloon',
	'Finish Mathematics',
	'Get Grocery',
	'Finish todo app',
	'Do a major product',
	'Review code',
]
completed = [];

app.use(express.json());

app.get('/todos', function(request, response){
	response.json(todos);
});


app.delete('/todo/id', (request, response) => {
	response.json({message: 'you deleted from your todos'});
});

app.put('/todo/complete', function(request, response)  {

	let taskId = request.query.taskID;

	taskId = Number(taskId)

	if(isNaN(taskId) || (taskId === 0) || (taskId  > todos.length)) {
		const result = {
			error: true,
			description: `please type in a valid number. A number between 1 and ${todos.length}`
	
		} 
		response.send(result);
		return;
	}	

	let removedTodo = todos.splice(taskId - 1, 1)

	completed.push(removedTodo[0])

	const result = {
		"completed-task": completed,
		"incompleted-task": todos
	}

	 response.json(result);
});

app.post('/todo', function(request, response){
	response.json(todos)
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
