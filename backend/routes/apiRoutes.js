const express = require('express');
const {getNow,login,register,crearSolicitud,crearAsesoria,upload,getSidebarInformation } = require('../controllers/apiController');
const {verifyToken} = require('../middleware/authmiddleware');
const router = express.Router();

//añadan sus funciones en el const para que se traigan desde el controlador
// definan sus rutas aqui, así se exportan con el router
router.get('/now', getNow);
router.post('/login', login);
router.post('/register', register);
router.post('/solicitudes', verifyToken, upload.single('archivo'), crearSolicitud);
router.post('/asesorias', verifyToken, crearAsesoria);
router.get('/loadsidebar', verifyToken, getSidebarInformation);

module.exports = router;
