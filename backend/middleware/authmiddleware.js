const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config.js');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    console.error('Error verificando token:', error);
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = { verifyToken };
