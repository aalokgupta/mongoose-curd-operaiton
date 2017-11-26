
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo', {
                    text : {
                      type: String,
                      minLength: 1,
                      trim: true,
                      require: true
                    },
                    completed: {
                      type: Boolean,
                      default: false
                    },
                    completedAt: {
                      type: Number,
                      default: null
                    }

});

module.exports = {
  Todo: Todo
};
