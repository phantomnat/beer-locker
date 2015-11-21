/**
 * Created by pnrisk on 11/21/2015 AD.
 */
var chai = require('chai');
var expect = require('chai').expect;
var request = require('superagent');
var should = chai.should();

describe('Beer Ctrl', function () {
    var port = 3000;
    var myApp = require('../server.js');
    var baseUrl = 'http://localhost:3000/';

    before(function (done) {
        myApp.start(port, done);
    });

    after(function (done) {
        myApp.stop(done);
    });

    describe('When request /beers ', function () {
        var beer = {
            name: 'Singha',
            type: 'Beer',
            quantity: 20
        };
        var beer2 = {};
        var beerId = '';

        it('should return add "beer"', function (done) {

            request.post(baseUrl + "beers")
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Accept', 'application/json')
                .send(beer)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.should.have.property("msg");
                    res.body.should.have.property("data");
                    res.body.msg.should.include("Beer added");
                    res.body.data.should.have.property("name");
                    res.body.data.should.have.property("quantity");
                    res.body.data.should.have.property("type");
                    res.body.data.name.should.equal(beer.name);
                    beerId = res.body.data._id;
                    done();
                })
        });

        it('should return beer by id', function (done) {
            beerId.should.not.empty;
            console.log(baseUrl + 'beers/' + beerId);
            request.get(baseUrl + 'beers/' + beerId)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.name.should.equal(beer.name);
                    done();
                });
        })

        it('should update new beer quantity', function (done) {
            var newQty = 33;
            request.put(baseUrl + 'beers/' + beerId)
                .set('Content-Type', 'application/json')
                .send({"quantity": newQty})
                //.set('Accept', 'application/json')
                //.send("quantity="+newQty)
                .end(function (err, res) {
                    if (err)
                        done(err);

                    res.status.should.equal(200);
                    res.body.should.have.property('quantity');
                    res.body.quantity.should.equal(newQty);
                    done();
                });
        })

        it('should remove a beer', function (done) {
            request.del(baseUrl + 'beers/' + beerId)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.should.have.property('msg');
                    res.body.msg.should.include('Beer removed');
                    done();
                })
        })
    });
});