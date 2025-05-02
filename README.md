# Proyecto Taller 1 - 2025

Aplicación Angular (frontend) conectada a un backend **Express** que usa **PostgreSQL** en **Neon**.

---

## 🔧 Requisitos previos

- Node.js y npm
- Git

> **(Ya no es necesario tener Python ni pip)**

---

## 🚀 Instrucciones de instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/G3-ProyTaller-1-2025.git
cd G3-ProyTaller-1-2025
```

---

### 2. Frontend (Angular + Tailwind)

```bash
cd frontend
npm install
npm start
```

La app estará disponible en `http://localhost:4200`

---

### 3. Backend (Express + PostgreSQL)

```bash
cd ../backend
npm install
```

Pega el archivo `.env` que se te proporcionó en esta carpeta.

Luego ejecuta:

```bash
node server.js
```

El backend estará disponible en `http://localhost:3000`

> Asegúrate de que el puerto 3000 esté libre o modifica la variable `PORT` en el `.env` si es necesario.

---

## 📦 Estructura del proyecto

```
G3-ProyTaller-1-2025/
├── frontend/     → Angular + Tailwind
├── backend/      → Express + PostgreSQL (Neon)
│   ├── controllers/   → Funciones de manejo de datos
│   ├── routes/        → Definición de endpoints API
│   ├── db/            → Conexión a base de datos PostgreSQL
│   ├── server.js      → Servidor principal Express
│   ├── .env           → Variables de entorno (no incluido en el repo)
│   └── package.json   → Dependencias del backend
```

---

## 📬 Notas

- El archivo `.env` se entrega por separado y **no está en el repositorio por seguridad**.
- A partir de ahora, **el backend utiliza Express**, no Django.
- **CORS** está habilitado para permitir la comunicación entre frontend y backend.
- Las rutas están organizadas modularmente para mantener limpio el proyecto.

---

## 🛠️ Flujo de trabajo para agregar nuevas funcionalidades al backend

Cuando necesites crear nuevas rutas o manejar nuevas operaciones (consultas, inserciones, etc.), sigue este flujo:

### 1. Crear un nuevo **controlador** en `backend/controllers/`

```javascript
const pool = require('../db/db');

const ejemploFuncion = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM ejemplo');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  ejemploFuncion,
};
```

---

### 2. Actualizar el archivo **apiRoutes.js** en `backend/routes/`

```javascript
const express = require('express');
const { ejemploFuncion } = require('../controllers/ejemploController');

const router = express.Router();

// Agrega tus rutas dentro de este router
router.get('/ejemplo', ejemploFuncion);

module.exports = router;
```

Con esto, la ruta `http://localhost:3000/api/ejemplo` estará disponible.

---