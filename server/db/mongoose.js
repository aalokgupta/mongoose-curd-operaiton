var mongoose = require('mongoose');

// mongoose.Promise = global.Promise();
mongoose.connect('mongodb://localhost:27017/Todo', () => {
  console.log("mongoose connected to Todo Database");
});


module.exports = {
  mongoose: mongoose
}
