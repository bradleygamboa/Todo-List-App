 var express = require('express');
var PORT = process.env.PORT || 8080;
var app = express();
var Sequelize = require('sequelize');
var handlebars = require('handlebars');

var models = require('./models');

models.TodoItem.bulkCreate(
[{
	task: "watch rouge one",
	done: false
},
{
	task: "bathe dog",
	done: false
},
{
	task: 'brush cat',
	done: false
}]

);

app.get('/', function(req, res){
	//Grabs all todos
	models.TodoItem.findAll({}).then(function(data){
		res.render('home', data)
	})
});

app.post('/todos/', function(req, res){
	//Adds a new todo
	res.send('Add');

});

app.put('/todos/:id', function(req, res){
	//Updates todo with specific id
	res.send('Update');

});

app.delete('/todos/:id', function(req, res){
	//Deletes todo with specific id
	res.send('Deleted');

});

app.listen(PORT, function(){
	console.log('Magic Happens on Port 8080');
});

