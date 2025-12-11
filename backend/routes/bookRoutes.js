const express = require('express');
const { getBooks, addBook, editBook, deleteBook, searchBooks, getCategories } = require('../controllers/bookController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/categories', getCategories);
router.post('/', auth, role('admin'), addBook);
router.put('/:id', auth, role('admin'), editBook);
router.delete('/:id', auth, role('admin'), deleteBook);

module.exports = router;
