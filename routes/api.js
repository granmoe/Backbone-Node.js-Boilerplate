// module dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://localhost/items');

var Item = new mongoose.Schema({
	name: String,
	description: String
});

var ItemModel = mongoose.model('Item', Item);

router.get('/items', function(req, res) {
	return ItemModel.find(function(err, items){
		if (err) {
			res.send(err);
		} else {
			res.send(items);
		}
	});
});
router.post('/items', function(req, res) {
	var item = new ItemModel({
		name: req.body.name,
		description: req.body.description
	});
	item.save(function(err){
		if (err) {
			console.log(err);
		} else {
			console.log("item created");
		}
		return res.send(item);
	});
});

// router.get('/items', function(req, res) {
//   // var collection = db.collection('test');
//   // var doc1 = {'hello':'doc1'};
//   // var doc2 = {'hello':'doc2'};
//   // var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];
//   // collection.insert(doc1);
//   // collection.insert(doc2, {w:1}, function(err, result) {});
//   // collection.insert(lotsOfDocs, {w:1}, function(err, result) {});
//   console.log("success");
// });

module.exports = router;