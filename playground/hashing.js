const {SHA256} = require('crypto-js');
const JWT = require('jsonwebtoken');
var data = {
  id: 10
};

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "mysecret").toString()
// }
//
// var hash = SHA256(JSON.stringify(data.id) + "mysecret").toString();
// console.log(""+hash);
// var hash = SHA256(JSON.stringify(10) + "mysecret").toString();
// console.log(""+hash);

var token = JWT.sign(data, 'mysecret');
console.log(token);

var decoded = JWT.verify(token, 'mysecret');
console.log(decoded);
