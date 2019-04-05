'use strict';

var express = require('express');
var router = express.Router();

var OrdersController = require('../controllers/orders');
var CheckToken = require('../middlewares/check-auth-token');

router.get('/', CheckToken, OrdersController.all_orders);

router.post('/', CheckToken, OrdersController.post_order);

router.get('/:orderId', CheckToken, OrdersController.get_order_by_id);

router.patch('/:orderId', CheckToken, OrdersController.update_order);

router.delete('/:orderId', CheckToken, OrdersController.delete_order);

module.exports = router;