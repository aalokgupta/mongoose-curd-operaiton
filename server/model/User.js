//
var mongoose = require('mongoose');

var user = mongoose.model('user', {
                    lName: {
                      type: String,
                      required: true,
                      minLength: 2,
                      trim: true
                    },
                    fName: {
                      type: String,
                      required: true,
                      minLength: 2,
                      trim: true
                    },
                    Address: {
                      type: String,
                      required: true,
                      minLength: 2,
                      trim: true
                    }
});
module.exports = {
  user: user
}
