const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { getDashboard, getSalesTrends, getAllUsers, deleteUser, getTopBooks, getRevenueByCategory } = require('../controllers/adminController');
// Analytics
router.get('/analytics/top-books', auth, role('admin'), getTopBooks);
router.get('/analytics/revenue-category', auth, role('admin'), getRevenueByCategory);



// Dashboard and sales
router.get('/dashboard', auth, role('admin'), getDashboard);
router.get('/sales', auth, role('admin'), getSalesTrends);

// User management
router.get('/users', auth, role('admin'), getAllUsers);
router.delete('/users/:id', auth, role('admin'), deleteUser);

module.exports = router;
