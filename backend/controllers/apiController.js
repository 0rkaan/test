const pool = require('../db/db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
// Secret dinámico
const { SECRET_KEY } = require('../config.js');


// escriban sus funciones aquí, y añadanlas en el export, para que el router las encuentre

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.stl', '.obj'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se aceptan .stl y .obj'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 50 // Límite de 50MB
  }
});

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


// Controlador para solicitudes de impresión
const crearSolicitud = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Archivo inválido o no proporcionado' });
    }

    const { id_usuario, id_laboratorio, id_material, comentarios } = req.body;
    
    // Validar campos requeridos
    if (!id_usuario || !id_laboratorio || !id_material) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Verificar existencia de recursos
    const [usuario, laboratorio, material] = await Promise.all([
      pool.query('SELECT 1 FROM usuario WHERE id_usuario = $1', [id_usuario]),
      pool.query('SELECT 1 FROM laboratorio WHERE id_laboratorio = $1', [id_laboratorio]),
      pool.query('SELECT 1 FROM material WHERE id_material = $1', [id_material])
    ]);

    if (!usuario.rows.length || !laboratorio.rows.length || !material.rows.length) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    // Insertar solicitud
    const { rows } = await pool.query(
      `INSERT INTO solicitud (
        id_usuario, 
        id_laboratorio, 
        id_material, 
        archivo, 
        estado, 
        fecha_solicitud, 
        comentarios
      ) VALUES ($1, $2, $3, $4, 'Recibida', NOW(), $5)
      RETURNING *`,
      [id_usuario, id_laboratorio, id_material, req.file.path, comentarios]
    );

    res.status(201).json(rows[0]);

  } catch (error) {
    console.error('Error en solicitud:', error);
    res.status(500).json({ 
      error: error.message || 'Error procesando la solicitud' 
    });
  }
};

// Controlador para asesorías
const crearAsesoria = async (req, res) => {
  try {
    const { id_usuario, id_coordinador, fecha_reserva } = req.body;

    // Validaciones básicas
    if (!id_usuario || !fecha_reserva) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    if (new Date(fecha_reserva) < new Date()) {
      return res.status(400).json({ error: 'La fecha debe ser futura' });
    }

    // Verificar usuarios
    const [usuario, coordinador] = await Promise.all([
      pool.query('SELECT 1 FROM usuario WHERE id_usuario = $1', [id_usuario]),
      id_coordinador 
        ? pool.query('SELECT 1 FROM usuario WHERE id_usuario = $1', [id_coordinador])
        : { rows: [] }
    ]);

    if (!usuario.rows.length || (id_coordinador && !coordinador.rows.length)) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Crear asesoría
    const { rows } = await pool.query(
      `INSERT INTO asesoria (
        id_usuario, 
        id_coordinador, 
        fecha_solicitud, 
        fecha_reserva, 
        estado
      ) VALUES ($1, $2, NOW(), $3, 'pendiente')
      RETURNING *`,
      [id_usuario, id_coordinador || null, fecha_reserva]
    );

    res.status(201).json(rows[0]);

  } catch (error) {
    console.error('Error en asesoría:', error);
    res.status(500).json({ 
      error: error.message || 'Error creando la asesoría' 
    });
  }
};

const getSidebarInformation = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { rol, email } = decoded;

    // Buscar nombre del usuario en la base de datos
    const { rows } = await pool.query('SELECT nombre FROM usuario WHERE email = $1', [email]);

    if (!rows.length) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const nombre = rows[0].nombre;

    // Links base
    const links = [
      
    ];

    if (rol === 'Coordinador_General') {
      links.unshift(
        { label: 'Perfil', icon: '🙍‍♂️', href: '/perfil' },
        { label: 'Mantenedor Laboratorios', icon: '🏢', href: '/laboratorios' },
        { label: 'Mantenedor Materiales', icon: '📦', href: '/materiales' },
        { label: 'Mantenedor Personal', icon: '👥', href: '/personal' },
        { label: 'Mantenedor Maquinaria', icon: '🛠️', href: '/maquinaria' },
        { label: 'Mantenedor Asesorías', icon: '📅', href: '/asesorias' },
        { label: 'Mantenedor Proyectos', icon: '📂', href: '/proyectos' },
        { label: 'Mantenedor Usuarios', icon: '👤', href: '/usuarios' },
        { label: 'Solicitudes', icon: '📝', href: '/solicitudes' },
      );
    }

    if (rol === 'Coordinador_Laboratorio') {
      links.unshift(
        { label: 'Perfil', icon: '🙍‍♂️', href: '/perfil' },
        { label: 'Mantenedor Maquinaria', icon: '🛠️', href: '/maquinaria' },
        { label: 'Mantenedor Materiales', icon: '📦', href: '/materiales' },
        { label: 'Mantenedor Laboratorios', icon: '🏢', href: '/laboratorios' },
        { label: 'Mantenedor Proyectos', icon: '📂', href: '/proyectos' },
        { label: 'Mantenedor Usuarios', icon: '👤', href: '/usuarios' },
        { label: 'Solicitudes', icon: '📝', href: '/solicitudes' },
      );
    }

    if (rol === 'Administrador') {
      links.unshift(
        { label: 'Perfil', icon: '🙍‍♂️', href: '/perfil' },
        { label: 'Mantenedor Laboratorios', icon: '🏢', href: '/laboratorios' },
        { label: 'Mantenedor Materiales', icon: '📦', href: '/materiales' },
        { label: 'Mantenedor Personal', icon: '👥', href: '/personal' },
        { label: 'Mantenedor Maquinaria', icon: '🛠️', href: '/maquinaria' },
        { label: 'Mantenedor Asesorías', icon: '📅', href: '/asesorias' },
        { label: 'Mantenedor Proyectos', icon: '📂', href: '/proyectos' },
        { label: 'Mantenedor Usuarios', icon: '👤', href: '/usuarios' },
        { label: 'Solicitudes', icon: '📝', href: '/solicitudes' },
      );
    }

    if (rol === 'Estudiante_Academico') {
      links.unshift(
        { label: 'Perfil', icon: '🙍‍♂️', href: '/perfil' },
        { label: 'Historial', icon: '📜', href: '/historial' },
        { label: 'Solicitudes', icon: '📝', href: '/formularioImpresion' },
        { label: 'Asesorías', icon: '📅', href: '/asesoria' },
      );
    }

    // Responder con nombre + email + links
    res.json({ nombre,email, links });

  } catch (err) {
    console.error('Error en getSidebarInformation:', err);
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};




module.exports = {
  getNow,
  login, SECRET_KEY,
  register,
  crearSolicitud,
  crearAsesoria,
  upload,
  getSidebarInformation,
};
