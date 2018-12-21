var express = require('express');
var connection = require('../DbFields');
var router = express.Router();

router.post('/signup', (req, res) => {

    let insertUser = 'INSERT INTO users (email, user_password) VALUES (?,?);';
    let query = connection.query(insertUser, [req.body.email, req.body.user_password], ( err, result ) => {
        if (err) throw err;
        res.send('User successfully signed up');
    });
});

module.exports = router;