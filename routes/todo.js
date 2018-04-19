var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var util = require('../util.js');

var dbUrl = 'mongodb://localhost:27017/my_application';

/* GET home page. */
router.post('/add', function (req, res, next) {
    MongoClient.connect(dbUrl, (err, db) => {
        if (req.body._id) {
            req.body._id = mongo.ObjectId(req.body._id)
        }
        db.collection('todo').update({ _id: req.body._id }, req.body, { upsert: true }).then((result) => {
            res.json(util.success(result, "Todo added"));
        });
    })
});
router.get('/', function (req, res, next) {
    MongoClient.connect(dbUrl, (err, db) => {
        db.collection('todo').find({ $or: [{ 'completed': false }, { 'completed': { $exists: false } }] }).toArray(function (err, result) {
            res.json(util.success(result, "ToDo List"));
        });
    })
});
router.get('/completed', function (req, res, next) {
    MongoClient.connect(dbUrl, (err, db) => {
        db.collection('todo').find({ 'completed': true }).toArray(function (err, result) {
            res.json(util.success(result, "ToDo List"));
        });
    })
});



module.exports = router;