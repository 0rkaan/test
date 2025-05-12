require('dotenv').config();

module.exports = {
  SECRET_KEY: process.env.JWT_SECRET || 'clave-fija-de-respaldo'
};