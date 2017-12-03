//
var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var userSchema = new mongoose.Schema({
                    email: {
                      type: String,
                      unique: true,
                      required: true,
                      trim: true,
                      validate: {
                        validator:  function(value) {
                          return validator.isEmail(value);
                        },  message: `{value} is not a valid email`
                      }
                    },
                    password: {
                      type: String,
                      required: true,
                      minLength: 6
                    },
                    tokens: [{
                      access: {type: String, required: true},
                      token: {type: String, required: true}
                    }]
})

userSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
   return _.pick(userObject, ['email', '_id',]);
};

userSchema.methods.generateAuthTokens = function(callback)  {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens.push({access, token});
  user.save().then(() => {
    callback(token);
  })
};

userSchema.statics.findBytoken =  function(token){
  var User = this;
  var decoded;
  try{
    decoded = jwt.verify(token, 'abc123');
  } catch(e){
    return new Promise((resolve,reject) => {
      reject();
    });
  }
  return User.findOne({
    '_id':decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}
var User = mongoose.model('user', userSchema);
module.exports = {
  User: User
}
