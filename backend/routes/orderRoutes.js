const express = require('express');
const router = express.Router();
const { getOrders, createOrder, confirmOrder, deleteOrder, updateOrder } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/', auth, getOrders);
router.post('/', auth, createOrder);
router.put('/:id/confirm', auth, role('admin'), confirmOrder);
router.put('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder);

module.exports = router;
