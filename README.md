# wl-api
#### Still not finished... (e.g. the output of some functions need further formatting also no test cases so far)

wl-api is a javascript API for web services provided by the project Wortschatz, University of Leipzig.

http://wortschatz.uni-leipzig.de/

Their SOAP Web Service offers different research possibilities for their German dictionary, including informations on wordfrequencies, baseforms, left and right neighbours, collocations and semantic similarity.
You can access those informations via SOAP requests.
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
not published so far.. will be online the next days
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
all the following examples assume you have declared a variable wlapi that require wl-api
e.g.
```
var wlapi = require('wl-api');
```

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

wlapi.wordforms("string word",int limit); 
```
wlapi.wordforms("laufen",5); 
--> [ 'läuft', 'laufen', 'lief', 'gelaufen', 'liefen' ]
```

####synonyms
Returns synonyms of the input word. In other words, this is a thesaurus.

wlapi.synonyms("string word",int limit); 
```
wlapi.synonyms("Esel",5); 
-->[ [ 'Depp', 's' ],
  [ 'Dummkopf', 's' ],
  [ 'Grauchen', 'S' ],
  [ 'Langohr', 'S' ],
  [ 'Grautier', 'S' ] ]
```

####thesaurus
Similarly the Synonyms services returns synonyms of the given input word. However, this first lemmatizes the input word and thus returns more synonyms.

wlapi.thesaurus("string word",int limit); 
```
wlapi.wordforms("Esel",5); 
-->[ 'Pferd', 'Esel', 'Rind', 'Kamel', 'Büffel' ]
```

####sentences
Returns sample sentences containing the input word.

wlapi.sentences("string word",int limit); 
```
wlapi.sentences("Bücher",2); 
-->[ [ '40587352',
    'So etwas hilft der positiven Identifikation mit den Kandidaten, und das heißt: Alle begleitenden Produkte wie CDs oder Bücher verkaufen sich vermutlich besser.' ],
  [ '40586269',
    'Nachdem er 1973 die Leitung des Feuilletons aufgegeben hatte und stellvertretender Chefredakteur geworden war, wurde das Spektrum seiner Artikel und Bücher noch breiter.' ] ]
```

####left_neighbours
 For a given input word, returns statistically significant left neighbours. (words co-occurring immediately to the left of the input word)
 wlapi.left_neighbours("string word",int limit);
```
wlapi.left_neighbours("Esel",5); 
-->[ [ 'Ochs', 'Esel', '40' ],
  [ 'trojanischen', 'Esel', '21' ],
  [ 'störrische', 'Esel', '21' ],
  [ 'alter', 'Esel', '19' ],
  [ 'dummer', 'Esel', '16' ] ]
```
 
####right_neighbours
For a given input word, returns statistically significant right neighbours. (words co-occurring immediately to the right of the input word).
wlapi.right_neighbours("string word",int limit);
```
wlapi.right_neighbours("Esel",5); 
-->[ [ 'Esel', 'reitend', '23' ],
  [ 'Esel', 'streck', '23' ],
  [ 'Esel', 'Ziegen', '19' ],
  [ 'Esel', 'reiten', '17' ],
  [ 'Esel', 'I-Aah', '14' ] ]
```

####similarity
Returns automatically computed contextually similar words of the input word. Such similar words may be antonyms, hyperonyms, synonyms, cohyponyms or other. Note that due to the huge amount of data any query to this services may take a long time.
wlapi.similarity("string word",int limit);
```
wlapi.similarity("Esel",5); 
-->[ [ 'Esel', 'Rappen', '18' ],
  [ 'Esel', 'Gaul', '17' ],
  [ 'Esel', 'Pferd', '17' ],
  [ 'Esel', 'Roß', '15' ],
  [ 'Esel', 'andern', '14' ] ]
```

####experimental_synonyms
This service delivers an experimental synonyms request for internal tests.
wlapi.experimental_synonyms("string word",int limit);
```
wlapi.experimental_synonyms("Esel",5); 
-->[ [ 'Grautier', 'v' ],
  [ 'Langohr', 'v' ],
  [ 'Lasttier', 'v' ],
  [ 'Lama', 'v' ],
  [ 'Muli', 'v' ] ]
```

####right_collocation_finder
Attempts to find linguistic collocations that occur to the right of the given input word. The parameter Wortart accepts four values A,V,N,S which stand for adjective, verb, noun and stopword, respectively. The parameter restricts the type of words found.
wlapi.right_collocation_finder("string word",string postag,int limit); 
```
wlapi.right_collocation_finder("Esel","V",5); 
-->[ 'Esel', 'anbinden', 'V' ],
  [ 'Esel', 'anreiten', 'V' ],
  [ 'Esel', 'begegnen', 'V' ],
  [ 'Esel', 'bepacken', 'V' ],
  [ 'Esel', 'beschimpfen', 'V' ]]
```



####left_collocation_finder
Attempts to find linguistic collocations that occur to the left of the given input word. The parameter Wortart accepts four values A,V,N,S which stand for adjective, verb, noun and stopword, respectively. The parameter restricts the type of words found.
wlapi.left_collocation_finder("string word",string postag,int limit); 
```
wlapi.left_collocation_finder("Esel","A",7); 
-->[ 'Golden', 'A', 'Esel' ],
  [ 'alt', 'A', 'Esel' ],
  [ 'andalusisch', 'A', 'Esel' ],
  [ 'beladen', 'A', 'Esel' ],
  [ 'bepackt', 'A', 'Esel' ],
  [ 'bockend', 'A', 'Esel' ],
  [ 'dumm', 'A', 'Esel' ]]
```
