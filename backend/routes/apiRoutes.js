const express = require('express');
const {getNow,login,register} = require('../controllers/apiController');
const {verifyToken } = require('../middleware/authmiddleware');
const router = express.Router();

//añadan sus funciones en el const para que se traigan desde el controlador
// definan sus rutas aqui, así se exportan con el router
router.get('/now', getNow);
router.post('/login', login);
router.post('/register', register);

module.exports = router;
