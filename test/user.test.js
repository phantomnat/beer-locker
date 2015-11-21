/**
 * Created by pnrisk on 11/21/2015 AD.
 */


var chai = require('chai');
var expect = require('chai').expect;
var request = require('superagent');
var should = chai.should();
var User = require('../models/users');


describe('User Api', function () {
    var port = 3000;
    var myApp = require('../server.js');
    var baseUrl = 'http://localhost:3000/';



    before(function (done) {
        myApp.start(port, done);
    });

    after(function (done) {
        myApp.stop(done);
    });

    beforeEach(createUser);

    afterEach(deleteUser);

    describe('When request to /users', function () {
        //it('should add user', function (done) {
        //    //request.get
        //});
        var _u = {username: 'bowie', password: '123456'};

        it('should add user', function (done) {
            request.post(baseUrl + 'users')
                .send(_u)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.should.have.property('msg');
                    res.body.msg.should.include('register success');
                    res.body.should.have.property('username');
                    res.body.username.should.equal(_u.username);
                    done();
                });
        });

        it('should get user "bowie"', function (done) {
            request.get(baseUrl + 'users/'+ 'pnrisk')
                .end(function (err, res) {
                    if (err)
                        return done(err);

                    res.status.should.equal(200);
                    console.log(res.body);
                    res.body.should.have.property('username');
                    res.body.username.should.equal('pnrisk');
                    done();
                })
        });

    });
});

function createUser(done) {
    var user = new User({
        username: 'pnrisk',
        password: '06112534'
    });

    user.save(function (err) {
        if (err) {
            console.log('error ' + err.message);
            return done(err);
        }
        else console.log('no error');
        done();
    });
}

function deleteUser(done) {
    User.remove({username : 'pnrisk'}, function (err, user) {

        User.remove({}, function () {
            done();
        });
        //
        //err.should.equal(null);
        //console.log('user : ' +user.username+ ' deleted.');
        //done();
    });
}

exports.createUser = createUser;
exports.deleteUser = deleteUser;