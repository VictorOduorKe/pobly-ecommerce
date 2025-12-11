const jwt = require('jsonwebtoken');
// Request password reset (send token)
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const [user] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (!user.length) return res.status(404).json({ message: 'User not found' });
    // In production, send this token via email
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ message: 'Password reset token generated', token });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hash = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password=? WHERE id=?', [hash, decoded.id]);
    res.json({ message: 'Password reset successful' });
  } catch {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
const pool = require('../config/db');
const bcrypt = require('bcrypt');

exports.getProfile = async (req, res) => {
  try {
    const [user] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [req.user.id]);
    if (!user.length) return res.status(404).json({ message: 'User not found' });
    res.json(user[0]);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      await pool.query('UPDATE users SET name=?, email=?, password=? WHERE id=?', [name, email, hash, req.user.id]);
    } else {
      await pool.query('UPDATE users SET name=?, email=? WHERE id=?', [name, email, req.user.id]);
    }
    res.json({ message: 'Profile updated' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
