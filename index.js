
var xmlparser = require('xml2js');

var debug;
var async = require('async');
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
                return client.execute(body, function(err, result) {
                    if(err){
                        console.log(err.body)
                    }else {
                        return result.executeReturn.result.dataVectors[0].dataRow;
                    }
                });
            }
        });

    },

    frequencies: function(word) {

        //check if one string or array of strings

        query("Frequencies",word, function(err,callback){
            console.log(callback);
        });



    }

}
//Function for single query's
//For query's in a larger scale it would be preferable not to create a client each time,
//but to use one client for all query's.
//Note for me create a multi-query function.

function getOptions(name,arg1){
    var result =[];
    //options
    result.push( {
        wsdl: name + '?wsdl',
        namespaces: {
            'xmlns:dat': 'http://datatypes.webservice.wortschatz.uni_leipzig.de',
            'xmlns:urn': name}
    });
    //body
    result.push( {
        objRequestParameters: {
            corpus: "de",
            parameters: {
                dataVectors: [arg1]
            }
        }
    });


    return result;
}

function query(service,word,cb) {
    var arg = {dataRow: ["Wort", word]};
    var callParams = getOptions(service,arg);
    var url = 'http://wortschatz.uni-leipzig.de/axis/services/'+service+'?wsdl';
    var options = callParams[0];
    var body = callParams[1];


    soap.createClient(url,options, function(err, client) {
        client.setSecurity(new soap.BasicAuthSecurity('anonymous', 'anonymous'));
        if(err){
            console.log(err);
            return (err);
        }else {
            console.log("Client created");

            client.execute(body, function(err, result) {
                if(err){
                    console.log(err.body);
                    return (err.body);
                }else {
                    //console.log(result.executeReturn.result.dataVectors[0].dataRow);
                    if(result.executeReturn.result.dataVectors){
                        cb(null,result.executeReturn.result.dataVectors[0].dataRow);
                    }else{
                        cb(null,null);
                    }


                }
            });
        }
    });
}

//------------------------------------------------------------------------------------------------------------------------
//test
/*
query("Frequencies","Esdfsel", function(err, callback){
console.log(callback);
});
*/

//console.log(client.describe());
//console.log(client); //all methods usable in the stub




