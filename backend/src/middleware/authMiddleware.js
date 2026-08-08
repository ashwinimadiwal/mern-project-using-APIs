const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/userModel');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Authentication token missing.' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token user.' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = { authenticateToken };
