exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing.' });
  }
  
  const token = authHeader.split(' ')[1]; 
  
  if (!token) {
      return res.status(401).json({ message: 'Token is missing.' });
  }
  
  try {
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } 
  
  catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};