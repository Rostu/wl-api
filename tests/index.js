var should = require('chai').should();
var wlapi = require('../index');
var baseform = wlapi.baseform;
var expect = require('chai').expect();
var frequencies = wlapi.frequencies;
//Tests will follow

describe('#baseform', function() {
    it('gets a String and returns an Array', function (done) {
        baseform('Test',function(err,callback){
            callback.constructor.should.equal(Array);
            done();
        });
    });

    it('returns the baseform of a german word', function (done) {
        baseform('gefahren',function(err,callback){
            callback[0][0].should.equal("fahren");
            done();
        });
    });

    it('returns the wordform of a given word', function (done) {
        baseform('gefahren',function(err,callback){
            callback[1].should.equal("V");
            done();
        });
    });

});

