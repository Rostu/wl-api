
var xmlparser = require('xml2js');

var debug;
var cheerio = require('cheerio')
var parseString = require('xml2js').parseString; // Parsing XML to JSON
var soap = require('soap');

// Call back

module.exports = {
    baseform: function(word) {
        var url = 'http://wortschatz.uni-leipzig.de/axis/services/Baseform?wsdl';
        var options = {
            wsdl: "Baseform" + '?wsdl',
            namespaces: {
                'xmlns:dat': 'http://datatypes.webservice.wortschatz.uni_leipzig.de',
                'xmlns:urn': "Baseform"},
            log: debug
        };
        var body = {
            objRequestParameters: {
                corpus: "de",
                parameters: {
                    dataVectors: [{dataRow: ["Wort", word]}]
                }
            }
        };
        soap.createClient(url,options, function(err, client) {
            client.setSecurity(new soap.BasicAuthSecurity('anonymous', 'anonymous'));
            if(err){
                console.log(err)
            }else {
                console.log('Client created');
                //console.log(client.describe());
                //console.log(client); //all methods usable in the stub

                client.execute(body, function(err, result) {
                    if(err){
                        console.log(err.body)
                    }else {
                        //var test = JSON.stringify(result);
                        //console.log(test);
                        console.log(result.executeReturn.result.dataVectors[0].dataRow);
                        return result.executeReturn.result.dataVectors[0].dataRow;
                    }
                });
            }
        });

    }
}












