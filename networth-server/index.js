var connection = require('./DbFields');
var express = require('express');

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
  });

var app = express();

 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 });
