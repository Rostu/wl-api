
var xmlparser = require('xml2js');

var debug;
module.exports = {
    baseform: function(val,count) {
            }}



var soap = require('soap');

var options = {
    wsdl: "Baseform" + '?wsdl',
    namespaces: {
        'xmlns:dat': 'http://datatypes.webservice.wortschatz.uni_leipzig.de',
        'xmlns:urn': "Baseform"},
    BasicAuth: ['anonymous', 'anonymous'],
    log: debug

};
var body = {
    objRequestParameters: {
        corpus:'de',
        parameters: { dataVectors: ['urn:dataRow', ['Wort', "Esel"] ] }}
};

var url = 'http://wortschatz.uni-leipzig.de/axis/services/Baseform?wsdl';

soap.createClient(url,options, function(err, client) {
    if(err){
        console.log(err)
    }else {
        console.log('Client created');
        console.log(client.describe()   );
        //console.log(client); //all methods usable in the stub

        client.execute({message: body}, function(err, result) {
            console.log(result.body);
        });
    }
});

