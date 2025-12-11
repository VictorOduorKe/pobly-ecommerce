exports.getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT DISTINCT category FROM books');
    const categories = rows.map(row => row.category).filter(Boolean);
    res.json(categories);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
const pool = require('../config/db');

exports.searchBooks = async (req, res) => {
  const { q, category, min, max } = req.query;
  let sql = 'SELECT * FROM books WHERE 1=1';
  const params = [];
  if (q) {
    sql += ' AND (title LIKE ? OR author LIKE ? OR description LIKE ?)';
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }
  if (min) {
    sql += ' AND price >= ?';
    params.push(min);
  }
  if (max) {
    sql += ' AND price <= ?';
    params.push(max);
  }
  try {
    const [books] = await pool.query(sql, params);
    res.json(books);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getBooks = async (req, res) => {
  try {
    const [books] = await pool.query('SELECT * FROM books');
    res.json(books);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addBook = async (req, res) => {
  const { title, author, description, category, price, stock, image_url } = req.body;
  try {
    await pool.query(
      'INSERT INTO books (title, author, description, category, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, author, description, category, price, stock, image_url]
    );
    res.status(201).json({ message: 'Book added' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.editBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, category, price, stock, image_url } = req.body;
  try {
    await pool.query(
      'UPDATE books SET title=?, author=?, description=?, category=?, price=?, stock=?, image_url=? WHERE id=?',
      [title, author, description, category, price, stock, image_url, id]
    );
    res.json({ message: 'Book updated' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM books WHERE id=?', [id]);
    res.json({ message: 'Book deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
