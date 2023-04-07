const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderController = require('../controllers/order');

router.post('/', orderController.order_post_all)
router.get('/', checkAuth, orderController.order_get_all)
router.get('/:orderId',orderController.order_get_by_id)
router.delete('/:orderId',orderController.order_delete_by_id)

module.exports = router;