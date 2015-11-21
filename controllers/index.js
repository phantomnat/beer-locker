/**
 * Created by pnrisk on 11/21/2015 AD.
 */

var express = require('express');
var router = express.Router();

router.get('/', getIndex);


function getIndex(req, res, next) {
    res.json({msg: 'You are running low on Beer!'});
}

module.exports = router;