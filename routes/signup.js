var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var util = require('../util.js');

var dbUrl = 'mongodb://localhost:27017/my_application';

/* GET home page. */
router.post('/add', function (req, res, next) {
    console.log("add")
    MongoClient.connect(dbUrl, (err, db) => {
        db.collection('users').insert(req.body).then((err, result) => {
            console.log(err)
            res.json(util.success(result,"user added"));
        });
    })
});

module.exports = router;