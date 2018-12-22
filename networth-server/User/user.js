var express = require('express');
var connection = require('../DbFields');
var router = express.Router();

router.post('/signup', (req, res) => {

    let checkUserExist = 'SELECT COUNT(*) AS cnt FROM users WHERE email = ?';
    connection.query(checkUserExist, req.body.email, (err, data) => {
        if (err) console.log(err);
        else {
            if (data[0].cnt > 0) {
                res.send("Email already exist");
            } else {
                let insertUser = 'INSERT INTO users (email, user_password) VALUES (?,?);';
                connection.query(insertUser, [req.body.email, req.body.user_password], ( err, result ) => {
                    if (err) throw err;
                    res.send('User successfully signed up');
                });
            }
        }
    });
});

module.exports = router;