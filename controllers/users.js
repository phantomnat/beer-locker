/**
 * Created by pnrisk on 11/21/2015 AD.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/users');

router.post('/', postRegister);
router.get('/:username', getUser);

function postRegister(req, res, next) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if (err)
            res.send(err);

        res.json({msg: 'register success', username: user.username});
    })
}

function getUser(req, res, next) {
    User.findOne({username: req.params.username}, function (err, user) {
        if (err)
            res.send(err);

        res.json(user);
    })
}

module.exports = router;