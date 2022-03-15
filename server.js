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



app.get('/todos', function(request, response){
	response.json(todos);
});


app.delete('/todos/id', (request, response) => {
	response.json({message: 'you deleted from your todos'});
});

app.put('/completed', function(request, response)  {
	response.json('task completed')
});

app.post('/todos/new', function(request, response){
	response.json(todos)
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
