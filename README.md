# wl-api
#### Still not finished... (e.g. no test cases so far)

wl-api is a javascript API for web services provided by the project Wortschatz, University of Leipzig.

http://wortschatz.uni-leipzig.de/

Their SOAP Web Service offeres different research possibilities for their German dictionary, including informations on wordfrequencies, baseforms, left and right neighbours, collocations and semantic similarity.
You can accsess those informations via SOAP requests.
This module provides functions to generate the requests and get the informations from the corresponding answers.

You may also
be interested in other language specific bindings:

* Ruby http://github.com/arbox/wlapi/
* Perl http://search.cpan.org/~schroeer/Lingua-DE-Wortschatz/
* Python  https://github.com/lehmannro/libleipzig-python
* C#  http://code-bude.net/2013/07/22/csharp-api-fuer-den-wortschatz-leipzig-thesaurus-webservic/
* PHP http://web.archive.org/web/20090418233940/http://blog.klassifikator.de/2009/03/php-implementierung-des-wortschatz-webservice-der-uni-leipzig/

You can easily use this module with nodejs projects.

just install it via 
```
npm install wl-api
````
or
```
npm install https://github.com/rostu/wl-api.git
```

after that you can use it like this:

```
var wlapi = require('wl-api');

wlapi.baseform("Wälder"); --> [ [ 'Wald', 'N' ] ]
```
##Methods

####baseform
returns the lemmatized (base) form of the input word and a pos tag or 
returns array of possible baseforms with pos tags.
```
wlapi.baseform("Bäume") --> [ [ 'Baum', 'N' ] ]
```

####frequencies
Returns the frequency and frequency class of the input word.
Frequency class is computed in relation to the most frequent word in the corpus.
The higher the class, the rarer the word.
```
wlapi.frequencies("Esel"); --> [ '3524', '12' ]
```

####domain
Returns categories for a given input word as an array.
```
wlapi.domain("Esel"); 
--> [ 'Spezielle Zoologie','Säugetiere','Nutztiere','pejorativ','Menschen psychisch' ]
```
####wordforms
For a given word form returns all other word forms of the same lemma.
```
wlapi.wordforms("word",int Limit); 
wlapi.wordforms("laufen",5); 
--> [ 'läuft', 'laufen', 'lief', 'gelaufen', 'liefen' ]
```

