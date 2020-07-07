var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect(''); // ' ' will contain your connection string to your MongoDB cluster

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item : 'buy shoes'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
// });

//var data = [{item:'get milk'}, {item:'walk dog'}, {item:'coding'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

app.get('/todo', function(req, res){
    //Get Data from MongoDB and pass it to view
    Todo.find({}, function(err, data){
        if(err) throw err;
        res.render('todo', {todos: data});
    }); 
});

app.post('/todo', urlencodedParser, function(req, res){
    //get data from view and add it to mongoDB
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item', function(req, res){
    //Delete the requested item from MongoDB
    Todo.find({item : req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

};
