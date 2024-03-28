const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // Assumes Bearer token
  if (!token) {
    return res.status(403).json({ message: 'Token is required for authentication' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};