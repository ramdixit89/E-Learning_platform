const jwt = require("jsonwebtoken");
// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'You are not logged in..' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        req.userRole = decoded.role; // Attach role to request
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};
// Middleware to optionally read JWT token (no hard failure if missing)
const optionalAuth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return next();
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        req.userRole = decoded.role;
    } catch (error) {
        // Ignore invalid token for optional auth
    }
    next();
};
// Middleware to verify Admin role
const verifyAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ error: "Access denied, admin privileges required" });
    }
    next();
};
// Middleware to verify Instructor or Admin role
const verifyInstructorOrAdmin = (req, res, next) => {
    if (req.userRole !== 'admin' && req.userRole !== 'instructor') {
        return res.status(403).json({ error: "Access denied, instructor privileges required" });
    }
    next();
};
module.exports = { verifyToken, verifyAdmin, verifyInstructorOrAdmin, optionalAuth };
