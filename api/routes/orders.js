const express = require('express');

//for verbs and endpoints
const router = express.Router();

//for jwt verify
const checkAuth = require('../middleware/check-auth');

//importing controllers
const OrdersController = require('../controller/orders');
router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_post);

router.get('/:id', checkAuth, OrdersController.orders_get_single);

router.delete('/:id', checkAuth, OrdersController.orders_delete_single);

module.exports = router;