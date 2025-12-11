
const pool = require('../config/db');

// Analytics: Top selling books
exports.getTopBooks = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT b.id, b.title, SUM(oi.quantity) as sold
      FROM order_items oi
      JOIN books b ON oi.book_id = b.id
      GROUP BY b.id, b.title
      ORDER BY sold DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Analytics: Revenue by category
exports.getRevenueByCategory = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT b.category, SUM(oi.price * oi.quantity) as revenue
      FROM order_items oi
      JOIN books b ON oi.book_id = b.id
      GROUP BY b.category
      ORDER BY revenue DESC
    `);
    res.json(rows);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const [[{ users }]] = await pool.query('SELECT COUNT(*) as users FROM users');
    const [[{ books }]] = await pool.query('SELECT COUNT(*) as books FROM books');
    const [[{ orders }]] = await pool.query('SELECT COUNT(*) as orders FROM orders');
    const [[{ sales }]] = await pool.query('SELECT IFNULL(SUM(total),0) as sales FROM orders WHERE status = "confirmed"');
    res.json({ users, books, orders, sales });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSalesTrends = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT DATE(created_at) as date, SUM(total) as total FROM orders WHERE status = "confirmed" GROUP BY DATE(created_at) ORDER BY date ASC');
    res.json(rows);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role, created_at FROM users');
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
