/**
 * Created by pnrisk on 11/21/2015 AD.
 */
var chai = require('chai');
var expect = require('chai').expect;
var request = require('superagent');
var should = chai.should();
var user = require('./user.test');

describe('Beer Api', function () {
    var port = 3000;
    var myApp = require('../server.js');
    var baseUrl = 'http://localhost:3000/';

    before(function (done) {
        myApp.start(port);
        user.createUser(done);
    });

    after(function (done) {
        myApp.stop();
        user.deleteUser(done);
    });

    //beforeEach();
    //afterEach(user.deleteUser);

    describe('When request /beers ', function () {
        var beer = {
            name: 'Singha',
            type: 'Beer',
            quantity: 20
        };
        var beer2 = {};
        var beerId = '';

        it('should have all beers', checkAllBeers);

        it('should return add "beer"', function (done) {

            request.post(baseUrl + "beers")
                .auth('pnrisk', '06112534')
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
                .auth('pnrisk', '06112534')
                .end(function (err, res) {
                    console.log(res.body);
                    console.log(res.body._id);
                    console.log(res.body['id']);
                    res.status.should.equal(200);
                    res.body['_id'].should.equal(beerId);
                    done();
                });
        });

        it('should update new beer quantity', function (done) {
            var newQty = 33;
            request.put(baseUrl + 'beers/' + beerId)
                .auth('pnrisk', '06112534')
                .send({quantity: newQty})
                //.set('Accept', 'application/json')
                //.send("quantity="+newQty)
                .end(function (err, res) {
                    if (err)
                        done(err);

                    res.status.should.equal(200);
                    res.body.should.have.property('msg');
                    res.body.msg.should.include('updated');
                    done();
                });
        })

        it('should return beer by id with new quantity', function (done) {
            console.log(baseUrl + 'beers/' + beerId);
            request.get(baseUrl + 'beers/' + beerId)
                .auth('pnrisk', '06112534')
                .end(function (err, res) {
                    console.log(res.body);
                    res.status.should.equal(200);
                    res.body._id.should.equal(beerId);
                    res.body.quantity.should.equal(33);
                    done();
                });
        });

        it('should remove a beer', function (done) {
            request.del(baseUrl + 'beers/' + beerId)
                .auth('pnrisk', '06112534')
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.should.have.property('msg');
                    res.body.msg.should.include('Beer removed');
                    done();
                })
        })
    });

    function checkAllBeers(done) {
        request.get(baseUrl + 'beers')
            .auth('pnrisk', '06112534')
            .end(function (err, res) {
            res.status.should.equal(200);
            done();
        })
    }
});

