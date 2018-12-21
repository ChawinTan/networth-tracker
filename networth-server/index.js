var connection = require('./DbFields');
var express = require('express');
var bodyParser = require('body-parser');

connection.connect(function(err) {
    if (err) throw err;
    console.log('You are now connected...');
  });

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/signup', (req, res) => {

    let insertUser = 'INSERT INTO users (email, user_password) VALUES (?,?);';
    let query = connection.query(insertUser, [req.body.email, req.body.user_password], ( err, result ) => {
        if (err) throw err;
        res.send('User successfully signed up');
    });
});

 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 });
