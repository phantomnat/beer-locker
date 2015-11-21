
var chai = require('chai');
chai.should();

var request = require('superagent');

describe('My App', function () {
    var port = 3000;
    var myApp = require('../server.js');
    var baseUrl = 'http://localhost:3000';

    before(function (done) {
        myApp.start(port, done);
    });

    after(function (done) {
        myApp.stop(done);
    });

    describe('When request / ', function () {
        it('should return 200 code', function (done) {
            request.get(baseUrl).end(function (err, res) {
                res.status.should.equal(200);
                done();
            })
        })
    });
});