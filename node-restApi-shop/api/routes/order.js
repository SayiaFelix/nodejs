const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order')

router.get('/', orderController.order_get_all)
router.post('/', orderController.order_post_all)
router.get('/:orderId',orderController.order_get_by_id)
router.delete('/:orderId',orderController.order_delete_by_id)

module.exports = router;