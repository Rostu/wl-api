var should = require('chai').should();
var wlapi = require('../index');
var baseform = wlapi.baseform;

//Tests will follow

describe('#baseform', function() {
    it('gets a String and returns an Array', function () {
        baseform('Test').constructor.should.equal(Array);
    });

    it('returns the baseform of a german word', function () {
        baseform('gefahren')[0].should.equal("fahren");
    });

    it('returns the wordform of a given word', function () {
        baseform('gefahren')[1].should.equal("V");
    });

});

