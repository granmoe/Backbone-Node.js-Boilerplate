// module dependencies
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

// move db connect setup stuff to app.js
// remember we're passing ref to db obj to middleware

// db.open(function(err, db) {
//   if(err) throw err    
  
//   //  !!! CHANGE
//   db.ensureIndex("locations", {loc:"2d"}, function(err, result) {
//     if(err) throw err    

// notice we only start app if db success

//     app.listen(8124);
//   })  
// });

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(err) { return console.dir(err); }
	
	router.get('/items', function(req, res) {
	  // var collection = db.collection('test');
	  // var doc1 = {'hello':'doc1'};
	  // var doc2 = {'hello':'doc2'};
	  // var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];
	  // collection.insert(doc1);
	  // collection.insert(doc2, {w:1}, function(err, result) {});
	  // collection.insert(lotsOfDocs, {w:1}, function(err, result) {});
	  console.log("success");
	});
});

module.exports = router;