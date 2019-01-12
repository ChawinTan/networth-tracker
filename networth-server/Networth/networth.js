var express = require('express');
var connection = require('../DbFields');
var router = express.Router();

router.post('/update-networth', (req, res) => {

    let checkExist = 'SELECT COUNT(*) AS cnt FROM networth WHERE entry_date = ? and user_email = ?';
    connection.query(checkExist, [req.body.entry_date, req.body.user_email], (err, data) => {
        if (err) {
            throw err;
        } else {
            if (data[0].cnt > 0) {
                res.status(200).json('Cannot update');
            } else if (data[0].cnt === 0) {
                let updateNetworth = `INSERT INTO networth (entry_date, user_email, cash, investments, other_assets, 
                    total) VALUES (?,?,?,?,?,?)`;
                connection.query(updateNetworth, [req.body.entry_date, req.body.user_email, req.body.cash,
                req.body.investments, req.body.other_assets, req.body.total], (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        res.status(200).json('Update successful');
                    }
                });
            }
        }
    });
});

router.post('/delete-networth', (req, res) => {
    let checkExist = 'SELECT COUNT(*) AS cnt FROM networth WHERE entry_date = ? and user_email = ?';
    connection.query(checkExist, [req.body.entry_date, req.body.user_email], (err, data) => {
        if (err) {
            throw err;
        } else {
            if (data[0].cnt === 0) {
                res.status(200).json('User email does not exist');
            } else if (data[0].cnt === 1) {
                let deleteEntry = `DELETE FROM networth WHERE entry_date=? and user_email=?`;
                connection.query(deleteEntry, [req.body.entry_date, req.body.user_email], (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        res.status(200).json('Delete successful');
                    }
                });
            }
        }
    });
});

module.exports = router;