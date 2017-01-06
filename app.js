var express = require('express');
var PORT = process.env.PORT || 8080;
var app = express();
var Sequelize = require('sequelize');

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));

var models = require('./models');
models.TodoItem.sync({ force: true }).then(function() {
        return models.TodoItem.bulkCreate(
            
            [{
                task: "watch rouge one",
                done: false
            }, {
                task: "bathe dog",
                done: false
            }, {
                task: 'brush cat',
                done: false
            }]

        );
});


app.get('/', function(req, res){
	//Grabs all todos
	//Select all todo items
	models.TodoItem.findAll({}).then(function(data){
		console.log(data)
		res.render('home', {tasks: data});
	})

});

app.post('/todos/', function(req, res){
	//Adds a new todo
	console.log(req.body.newTask);
	models.TodoItem.create({
		task: req.body.newTask,
		done: false
	}).then(function(){
		res.redirect('/');
	});
	
	

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

