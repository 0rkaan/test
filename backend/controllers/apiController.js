const pool = require('../db/db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// Secret dinámico
const SECRET_KEY = crypto.randomBytes(64).toString('hex');


// escriban sus funciones aquí, y añadanlas en el export, para que el router las encuentre

const getNow = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    res.json({ server_time: rows[0].now });
  } catch (error) {
    console.error('Error consultando la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (user.contraseña !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token incluyendo el rol
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        rol: user.rol
      },
      SECRET_KEY,
      { expiresIn: '15m' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    // Verificar si ya existe
    const { rows } = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
    if (rows.length > 0) {
      return res.status(409).json({ error: 'El usuario ya está registrado' });
    }

    // Insertar
    await pool.query(
      `INSERT INTO usuario (nombre, email, contraseña, rol, activo) VALUES ($1, $2, $3, 'Estudiante_Academico', TRUE)`,
      [nombre, email, password]
    );

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



module.exports = {
  getNow,
  login, SECRET_KEY,
  register, 
};
