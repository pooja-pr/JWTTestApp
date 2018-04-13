var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var util = require('../util.js');
var jwt = require('jsonwebtoken');

const secret = 'poojarajjwttrailapp';
var dbUrl = 'mongodb://localhost:27017/my_application';

/* GET home page. */
router.post('/', function (req, res, next) {
    MongoClient.connect(dbUrl, (err, db) => {
        db.collection('users').findOne({ 'email': req.body.email, 'password': req.body.password }).then((result) => {
            var token = jwt.sign(result, secret);
            res.json(util.success(result, "user added", token));
        });
    })
});

module.exports = router;