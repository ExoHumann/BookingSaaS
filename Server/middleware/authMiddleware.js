import { verify } from 'jsonwebtoken';

// Middleware to authenticate JWT tokens
export function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Assumes Bearer token
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Authentication token is missing' });
  }
  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden', message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Middleware to check user roles
export function checkRole(roles) { return (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden', message: 'Insufficient permissions' });
  }
  next();
};     }

// Middleware to authorize specific roles
export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden', message: 'User role not authorized' });
    }
    next();
  };
}
