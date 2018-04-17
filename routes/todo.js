var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var util = require('../util.js');

var dbUrl = 'mongodb://localhost:27017/my_application';

/* GET home page. */
router.post('/add', function (req, res, next) {
    MongoClient.connect(dbUrl, (err, db) => {
        db.collection('todo').update({ _id: mongo.ObjectId(req.body._id) }, req.body, { upsert: true }).then((result) => {
            res.json(util.success(result, "Todo added"));
        });
    })
});
router.get('/', function (req, res, next) {
    MongoClient.connect(dbUrl, (err, db) => {
        db.collection('todo').find().toArray(function (err, result) {
            res.json(util.success(result, "ToDo List"));
        });
    })
});

router.post('/update', function (req, res, next) {
    for (let index = 0; index < req.body.length; index++) {
        MongoClient.connect(dbUrl, (err, db) => {
            req.body[index]._id = mongo.ObjectId(req.body[index]._id);
            var r = db.collection('todo').update({ _id: req.body[index]._id }, req.body[index])
        })
    }
    r.then((resu) => {
        res.json(util.success(resu, "Update successful"))
    })

});

module.exports = router;