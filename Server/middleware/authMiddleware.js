const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assumes Bearer token
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Invalid token
        }
        req.user = user;
        next();
    });
};

exports.checkRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).send('Insufficient permissions');
    }
    next();
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.sendStatus(403); // User role not authorized
        }
        next();
    };
};
