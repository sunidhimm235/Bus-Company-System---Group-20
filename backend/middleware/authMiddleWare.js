const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey12345';

const isAuthenticated = (req, res, next) => {
    console.log('isAuthenticating!!!!')
    

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header is missing or invalid.' });
    }
    console.log('isAuthenticating!!!!')
    const token = authHeader.split(' ')[1];
    console.log('verifying')
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded;
        next();
    } 
    
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token has expired." });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: "Invalid token." });
        } else {
            return res.status(403).json({ message: "Invalid or expired token.", error: error.message });
        }
    }
};

module.exports = { isAuthenticated };