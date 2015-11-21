/**
 * Created by pnrisk on 11/21/2015 AD.
 */
var mongoose = require('mongoose');

var BeerSchema = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number,
    userId: String
});

module.exports = mongoose.model('Beer', BeerSchema);
