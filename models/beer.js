/**
 * Created by pnrisk on 11/21/2015 AD.
 */
var mongoose = require('mongoose');

var BeerSchema = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number
});

module.exports = mongoose.model('Beer', BeerSchema);
