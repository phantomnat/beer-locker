/**
 * Created by pnrisk on 11/21/2015 AD.
 */

var express = require('express');
var router = express.Router();
var Beer = require('../models/beer');

//router.get('/', getIndex);
router.post('/', postIndex);
router.get('/:beer_id', getBeerById);
router.put('/:beer_id', updateBeerQuantity);
router.delete('/:beer_id', deleteBeerById);


function deleteBeerById (req, res, next) {
    Beer.findByIdAndRemove(req.params.beer_id, function (err) {
        if (err)
            res.send(err);

        res.json({msg: 'Beer removed from the locker!'});
    })
}

function updateBeerQuantity(req, res, next) {
    Beer.findById(req.params.beer_id, function (err, beer) {
        if (err)
            res.send(err);

        beer.quantity = req.body.quantity;

        beer.save(function (err) {
            if (err)
                res.send(err);

            res.json(beer);
        })
    });
}

function getBeerById(req, res, next) {
    Beer.findById(req.params.beer_id, function (err, beer) {
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

    beer.save(function (err) {
        if (err)
            res.send(err);

        res.json({msg: 'Beer added to the locker!', data: beer});
    })
}

module.exports = router;