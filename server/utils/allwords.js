var Wordnik = require('wordnik');
 
var wn = new Wordnik({
    api_key: 'your api key'
});
 
wn.word('minimalism', {
    useCanonical: true
  , includeSuggestions: true
}, function(e, word) {
  console.log(e, word);
 
  word.related({
      limit: 1
  }, console.log);
});
 
wn.definitions('pernicious', function(e, defs) {
  console.log(e, defs);
});