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

router.delete('/items/:id', function(req, res) {
    return ItemModel.findById(req.params.id, function(err, item) {
        return item.remove(function(err) {
            if (!err) {
              console.log('Item ' + req.params.id + ' removed');
              return res.send('');
            } else {
              console.log(err);
            }
        });
    });
});

module.exports = router;

// url             HTTP Method  Operation
// /api/items      GET          Get an array of all items
// /api/items/:id  GET          Get the item with id of :id
// /api/items      POST         Add a new item and return the item with an id attribute added
// /api/items/:id  PUT          Update the item with id of :id
// /api/items/:id  DELETE       Delete the item with id of :id