const express = require('express');
//for verbs and endpoints
const router = express.Router();

//for mongoose
const mongoose = require('mongoose');
const Product = require('../models/product')

router.get('/', (req, res, next) => {
	Product.find()
		.exec()
		.then(docs => {
			console.log(docs);
			// if(docs.length >= 0){
			res.status(200).json(docs);
			// } else{
			// 	res.status(404).json({message: "No entires found"})
			// }		
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.post('/', (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId,
		name: req.body.name,
		price: req.body.price
	});
	product.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: "Handling POST requests to /products",
				createdProduct: result
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Product.findById(id)
		.exec()
		.then(doc => {
			console.log(`From DB: ${doc}`);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({ message: "Requested data not found" });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const updateOps = {};
	for (const key in req.body) {		//or const key of Object.keys(req.body)
		updateOps[key] = req.body[key];
	}

	Product.update({ _id: id }, {
		$set: updateOps
	})
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	Product.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.send(500).json({ error: err });
		});
});

module.exports = router;