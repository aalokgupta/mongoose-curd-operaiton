const {mongoose} = require('./db/mongoose');
const {Todo} = require('./model/Todo');
const {user} = require('./model/User');
const bodyParser = require('body-parser'); // conert text to JSOn
const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.post('/todos', function(req, res){
  var newTodo = new Todo();
  newTodo.text = req.body.text;
  console.log("body.text = "+req.body.text);
  console.log("req.body = "+req.body);
  newTodo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e)
  });
});

app.get('/todos', function(req, res){
  res.sendStatus(JSON.stringify({status: 200}));
});

app.listen(PORT, function() {
  console.log("App started at port no "+PORT);
}, (e) => {
  console.log("not able to bind to Port no "+PORT);
});
