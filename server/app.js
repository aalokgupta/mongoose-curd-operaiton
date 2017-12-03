const _ = require('lodash');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./model/Todo');
const {User} = require('./model/User');
const bodyParser = require('body-parser'); // conert text to JSOn
const express = require('express');
const mongodb = require('mongodb');
const {authenticateUser} = require('./middleware/authenticate');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.post('/user', function(req, res) {
  var body = _.pick(req.body, ['email', 'password']);
  console.log("body requested = "+JSON.stringify(req.body));
  var newUser = new User(body);

  newUser.save().then(() => {
    newUser.generateAuthTokens(function(token){
          res.header('x-auth', token).send(newUser);
    });
  }).catch((err) => {
    res.status(400).send(err);
  });
});


app.get('/user/me', authenticateUser, function(req, res){
  res.send(req.user);
});
app.post('/todos', function(req, res){
  var newTodo = new Todo({
    text: req.body.text
  });
  newTodo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e)
  });
});

app.get('/todos', function(req, res){
  Todo.find().then( (todos) => {
    res.send({
      todos: todos
    });
  }, (e) => {
    res.status(400).send(e);
  })
});


app.get('/todos/:id', function(req, res){
  var id = req.params.id;
  Todo.find({_id: id}).then((todo) => {
    if(!todo){
      res.status(404).send();
    }
      res.send({todo});
  }, (err) => {
      res.status(404).send();
  });
});

app.delete('/todos/:id', function(req, res){

  var id = req.params.id;
  // validate the id
  Todo.findByIdAndRemove({_id: id}).then( (todo) => {
    if(!todo){
      res.status(404).send();
    }
    else{
      res.send(todo);
    }
  }, (err) => {
    res.status(404).end();
  })
});

app.patch('/todos/:id', function(req, res){

  var id =  req.params.id;
  var body = _.pick(req.body, ['completed', 'text']);

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else{
    body.completedAt = null;
    body.completed = false;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then( (todo) => {
    if(!todo){
        res.status(404).send();
    }
    res.send({todo});
  }, (err) => {
      res.status(404).send();
  });
});

app.listen(PORT, function() {
  console.log("App started at port no "+PORT);
}, (e) => {
  console.log("not able to bind to Port no "+PORT);
});
