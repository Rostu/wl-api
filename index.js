
var soap = require('soap');
var underscore = require("underscore");

module.exports = {
    //Should returns the lemmatized (base) form of the input word.
    //returns array of possible baseforms in some cases
    //wlapi.baseform("")-->
    baseform: function(word) {
        var arg = [{dataRow: ["Wort", word]}];
        query("Baseform",arg, function(err,callback){
            return create_results(callback);
        });
    },
    //Returns the frequency and frequency class of the input word.
    //Frequency class is computed in relation to the most frequent word in the corpus.
    // The higher the class, the rarer the word.
    //wlapi.frequencies("Esel")-->[ '3524', '12' ]
    frequencies: function(word) {
        var arg = [{dataRow: ["Wort", word]}];
        query("Frequencies",arg, function(err,callback){
            return underscore.flatten(create_results(callback));
        });
    },
    //Returns categories for a given input word as an array:
    domain: function(word) {
        var arg = [{dataRow: ["Wort", word]}];
        query("Sachgebiet",arg, function(err,callback){
            return create_results(callback);
        });
    },
    //For a given word form returns all other word forms of the same lemma
    wordforms: function(word,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Word", word]},{dataRow: ["Limit", limit]}];
        query("Wordforms",arg, function(err,callback){
            return create_results(callback);
        });
    },
    thesaurus: function(word,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ["Limit", limit]}];
        query("Thesaurus",arg, function(err,callback){
            return underscore.flatten(create_results(callback));
        });
    },
    synonyms: function(word,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ["Limit", limit]}];
        query("Synonyms",arg, function(err,callback){
            return create_results(callback);
        });

    },
    sentence: function(word,limit) {
        if(!limit){limit = 5;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ["Limit", limit]}];
        query("Sentences",arg, function(err,callback){
            return create_results(callback);
        });
    },
    left_neighbours: function(word,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ["Limit", limit]}];
        query("LeftNeighbours",arg, function(err,callback){
            return create_results(callback);
        });

    },
    right_neighbours: function(word,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ["Limit", limit]}];
        query("RightNeighbours",arg, function(err,callback){
            return create_results(callback);
        });
    },
    similarity: function(word,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ["Limit", limit]}];
        query("Similarity",arg, function(err,callback){
            return create_results(callback);
        });
    },
    experimental_synonyms: function(word,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ["Limit", limit]}];
        query("ExperimentalSynonyms",arg, function(err,callback){
            return create_results(callback);
        });
    },
    /*not working so far----------------------------
    ngrams: function(pattern,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Pattern", pattern]},{dataRow: ["Limit", limit]}];
        query("NGrams",arg, function(err,callback){
            return create_results(callback);
        });
    },
    ngram_references: function(word,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ["Limit", limit]}];
        query("NGramReferences",arg, function(err,callback){
            return create_results(callback);
        });
    },
    */
    right_collocation_finder: function(word,postag,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ["Wortart", postag]},{dataRow: ["Limit", limit]}];
        query("RightCollocationFinder",arg, function(err,callback){
            return create_results(callback);
        });
    },
    left_collocation_finder: function(word,postag,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ["Wortart", postag]},{dataRow: ["Limit", limit]}];
        query("LeftCollocationFinder",arg, function(err,callback){
            return create_results(callback);
        });
    },
    cooccurrences: function(word,sign,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ["Mindestsignifikanz", sign]},{dataRow: ["Limit", limit]}];
        query("Cooccurrences",arg, function(err,callback){
            return create_results(callback);
        });
    },
    //to use this service you have to have a user account different from anonymous
    cooccurrences_all: function(word,sign,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ["Mindestsignifikanz", sign]},{dataRow: ["Limit", limit]}];
        query("CooccurrencesAll",arg, function(err,callback){
            return create_results(callback);
        });
    },
    //to use this service you have to have a user account different from anonymous
    intersection: function(word1,word2,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort 1", word1]},{dataRow: ["Wort 2", word2]},{dataRow: ["Limit", limit]}];
        query("Kookkurrenzschnitt",arg, function(err,callback){
            return create_results(callback);
        });
    },
    //Takes some time
    crossword: function(word, word_length,limit) {
        if(!limit){limit = 10;}
        var arg = [{dataRow: ["Wort", word]},{dataRow: ['Wortlaenge', word_length]},{dataRow: ["Limit", limit]}];
        query("Kreuzwortraetsel",arg, function(err,callback){
            return create_results(callback);
        });
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
            console.log("Client create Error: "+err);
            return (err);
        }else {
            console.log("Client created");
            client.execute(body, function(err, result) {
                if(err){
                    console.log("query Error: "+err.body);
                    return (err.body);
                }else {
                    if(result.executeReturn.result.dataVectors){
                        //console.log(result.executeReturn.result);
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
/*
var testarg = [{dataRow: ["Pattern", "Esel"]},{dataRow: ["Limit", 5]}];
var testarg2 = [{dataRow: ["Wort", "Esel"]}];
var testarg3 = [{dataRow: ["Wort", "Esel"]},{dataRow: ["Wortart", "A"]},{dataRow: ["Limit", 10]}];
var coocurencearg = [{dataRow: ["Wort", "Esel"]},{dataRow: ["Mindestsignifikanz", 200]},{dataRow: ["Limit", 10]}];
var Kookurrenzschnitt = [{dataRow: ["Wort 1", "Esel"]},{dataRow: ["Wort 2", "Karren"]},{dataRow: ["Limit", 5]}];
var crossword = [{dataRow: ["Wort", "Flug"]},{dataRow: ['Wortlaenge', 6]},{dataRow: ["Limit", 5]}];

query("Frequencies",testarg2, function(err, callback){
    //console.log(callback);
    //console.log(underscore.flatten(create_results(callback)));
    console.log(create_results(callback));
});
*/
//console.log(client.describe());
//console.log(client.describe());
//console.log(client); //all methods usable in the stub




