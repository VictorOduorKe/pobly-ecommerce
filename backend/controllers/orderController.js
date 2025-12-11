const pool=require('../config/db');
exports.getOrders = async (req, res) => {
  try {
    const [orders] = req.user.role === 'admin'
      ? await pool.query('SELECT * FROM orders')
      : await pool.query('SELECT * FROM orders WHERE user_id=?', [req.user.id]);
    res.json(orders);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createOrder = async (req, res) => {
  const { items, total, address, city, postal_code, phone } = req.body;
  console.log('Received order payload:', req.body);
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Order must have at least one item.' });
  }
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.query(
      'INSERT INTO orders (user_id, total, address, city, postal_code, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, total, address, city, postal_code, phone]
    );
    const orderId = result.insertId;
    for (const item of items) {
      if (!item.book_id || !item.quantity || !item.price) {
        await conn.rollback();
        return res.status(400).json({ message: 'Invalid order item.' });
      }
      await conn.query(
        'INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.book_id, item.quantity, item.price]
      );
      await conn.query(
        'UPDATE books SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.book_id]
      );
    }
    await conn.commit();
    res.status(201).json({ message: 'Order placed', orderId });
  } catch (err) {
    await conn.rollback();
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    conn.release();
  }
};

exports.confirmOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', ['confirmed', id]);
    res.json({ message: 'Order confirmed' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { address, city, postal_code, phone } = req.body;
  try {
    await pool.query(
      'UPDATE orders SET address=?, city=?, postal_code=?, phone=? WHERE id=?',
      [address, city, postal_code, phone, id]
    );
    res.json({ message: 'Order updated' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    // Check order status
    const [rows] = await pool.query('SELECT status FROM orders WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (rows[0].status !== 'pending') {
      return res.status(400).json({ message: 'Only pending orders can be deleted' });
    }
    await pool.query('DELETE FROM orders WHERE id = ?', [id]);
    res.json({ message: 'Order deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};