/**
 * Created by pnrisk on 11/21/2015 AD.
 */

var express = require('express');
var router = express.Router();
var Beer = require('../models/beer');

var authCtrl = require('./auth');

router.get('/', authCtrl.isAuthenticated, getAllBeers);
router.post('/', authCtrl.isAuthenticated, postIndex);
router.get('/:beer_id', authCtrl.isAuthenticated, getBeerById);
router.put('/:beer_id', authCtrl.isAuthenticated, updateBeerQuantity);
router.delete('/:beer_id', authCtrl.isAuthenticated, deleteBeerById);


function deleteBeerById(req, res, next) {
    Beer.remove({_id: req.params.beer_id, userId: req.user._id}, function (err) {
        if (err)
            res.send(err);

        res.json({msg: 'Beer removed from the locker!'});
    })
}

function updateBeerQuantity(req, res, next) {
    Beer.update(
        {userId: req.user._id, _id: req.params.beer_id},
        {quantity: req.body.quantity},
        function (err, num) {
            if (err)
                res.send(err);

            res.json({msg: num + ' updated'});
        });
}

function getAllBeers(req, res, next) {
    Beer.find({userId: req.user._id}, function (err, beers) {
        if (err)
            res.send(err);

        res.json(beers);
    })
}

function getBeerById(req, res, next) {

    //console.log('userId : ' + req.user._id);

    Beer.findOne({_id: req.params.beer_id, userId: req.user._id}, function (err, beer) {
        if (err)
            res.send(err);

        res.json(beer);
    });
}

function postIndex(req, res, next) {

    var beer = new Beer();

    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;
    beer.userId = req.user._id;
    console.log('userId : ' + req.user._id);
    beer.save(function (err) {
        if (err)
            res.send(err);

        res.json({msg: 'Beer added to the locker!', data: beer});
    })
}

module.exports = router;