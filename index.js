
//var xmlparser = require('xml2js');
//var async = require('async');
//var parseString = require('xml2js').parseString; // Parsing XML to JSON
var soap = require('soap');

// Call back

module.exports = {
    baseform: function(word) {
        //check if one string or array of strings
        var arg = [{dataRow: ["Wort", word]}];
        query("Baseform",arg, function(err,callback){
            return create_results(callback);
        });
    },
    frequencies: function(word) {
        //check if one string or array of strings
        var arg = [{dataRow: ["Wort", word]}];
        query("Frequencies",arg, function(err,callback){
            return create_results(callback);
        });
    },
    //Returns categories for a given input word as an array:
    domain: function(word) {
        var arg = [{dataRow: ["Wort", word]}];
        query("Sachgebiet",arg, function(err,callback){
            return create_results(callback);
        });
    },
    wordforms: function(word,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Word", word]},{dataRow: ["Limit", limit]}];
        query("Wordforms",arg, function(err,callback){
            return create_results(callback);
        });

    },
    baseform: function(word) {

    },
    baseform: function(word) {

    },
    baseform: function(word) {

    },
    baseform: function(word) {

    },
    baseform: function(word) {

    },
    baseform: function(word) {

    },
    baseform: function(word) {

    }

};
//Function for single query's
//For query's in a larger scale it would be preferable not to create a client each time,
//but to use one client for all query's.
//Note for me create a multi-query function.

function getOptions(name,arg){
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
                dataVectors: arg
            }
        }
    });
    return result;
}
//this function takes the name of desired service and the searchterm to create a soap client and execute the query
function query(service,arg,cb) {
    var callParams = getOptions(service,arg);
    var url = 'http://wortschatz.uni-leipzig.de/axis/services/'+service+'?wsdl';
    var options = callParams[0];
    var body = callParams[1];
    var results =[];
    //kind of a callback hell (note for me look into async)
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
                    if(result.executeReturn.result.dataVectors){
                        cb(null,result.executeReturn.result.dataVectors);
                    }else{cb(null,null);}
                }
            });
        }
    });
}

//this function gets the array of array result from the soap request
//e.g. [ { attributes: { 'xsi:type': 'ns2:DataVector' },dataRow: [ 'trübe', 'A' ] },{ attributes: { 'xsi:type': 'ns4:DataVector' },    dataRow: [ 'trüben', 'V' ] } ]
//it returns an array with one or more arrays of the results
//e.g. [ [ 'trübe', 'A' ], [ 'trüben', 'V' ] ]
function create_results(res){
    if(res){
        var resultarray = [];
        var helparray = [];
        for (var i = 0; i < res.length; i++) {
            helparray.push(res[i].dataRow);
        }
        //this is needed to delete double entry's from the results which sometimes appear
        //this creates a hash for each joined resultentry([ 'trüben', 'V' ] --> 'trübenV') and sorts the resultarray based on these hashes
        var hash = {};
        for (var i = 0, l = helparray.length; i < l; i++) {
            var key = helparray[i].join('|');
            if (!hash[key]) {
                resultarray.push(helparray[i]);
                hash[key] = 'found';
            }
        }
        return(resultarray);
    }
}

//------------------------------------------------------------------------------------------------------------------------
//test

var testarg = [{dataRow: ["Word", "laufen"]},{dataRow: ["Limit", 20]}];

query("Wordforms",testarg, function(err, callback){
    console.log(create_results(callback));
});
//console.log(client.describe());
//console.log(client.describe());
//console.log(client); //all methods usable in the stub




