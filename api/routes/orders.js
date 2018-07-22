const express = require('express');
//for verbs and endpoints
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: "Handling GET requests to /orders"
	});
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: "Handling POST requests to /orders",
        createdOrder: order
	});
});

router.get('/:id', (req, res, next) => {
	res.status(200).json({
        message: "Order details",
        Orderid: req.params.id
	});
});

router.delete('/:id', (req, res, next) => {
	res.status(200).json({
        message: "Order Deleted",
        Orderid: req.params.id
	});
});

module.exports = router;