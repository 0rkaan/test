const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/apiRoutes');
const bodyParser = require('body-parser');

dotenv.config(); // cargar variables de entorno

const app = express();

// Configuraciones esenciales
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// config
app.use(cors());
app.use(express.json());

// ruta
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
const DEBUG = process.env.DEBUG === 'True';

// init del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  if (DEBUG) {
    console.log('Modo DEBUG activado');
  }
});
