var router = require('express').Router;
var jwt = require('jsonwebtoken');
const secret = 'poojarajjwttrailapp';

module.exports = {
    validate: router().use(function (req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.status(401);
                    res.send("Invalid Token");
                } else {
                    req.usr = decoded;
                    next();
                }
            });
        } else {
            res.send("No token");
        }
    })
}