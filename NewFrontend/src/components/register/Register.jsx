import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfirmDialog } from '../globals/confirmDialog';
import API from '../../services/api';

export default function Register() {
  const navigate = useNavigate();
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirm: ''
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const registrar = async () => {
    if (usuario.password !== usuario.confirm) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const datos = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password
      };

      const res = await API.post('/register', datos);
      console.log('Registro exitoso', res.data);
      alert('Usuario registrado correctamente');
      navigate('/login');
    } catch (err) {
      console.error('Error en registro', err);
      alert('Error al registrar usuario');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = await confirm("¿Deseas registrar este usuario?");
    if (confirmed) {
      await registrar();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-black mb-6">Sistema de Reserva de Laboratorios</h1>

      <div className="flex items-stretch w-[700px] rounded-[2rem] overflow-hidden shadow-2xl bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-white text-black px-10 py-12 flex-1 rounded-l-[2rem] flex flex-col justify-center space-y-6"
        >
          <h2 className="text-red-600 text-2xl font-bold text-center mb-4">REGISTRARSE</h2>

          <div>
            <label className="text-sm block mb-1" htmlFor="nombre">NOMBRE COMPLETO</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full text-black text-sm focus:outline-none bg-gray-200"
              placeholder="Nombre y Apellido"
            />
          </div>

          <div>
            <label className="text-sm block mb-1" htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full text-black text-sm focus:outline-none bg-gray-200"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="text-sm block mb-1" htmlFor="password">CONTRASEÑA</label>
            <input
              type="password"
              id="password"
              name="password"
              value={usuario.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full text-black text-sm focus:outline-none bg-gray-200"
              placeholder="********"
            />
          </div>

          <div>
            <label className="text-sm block mb-1" htmlFor="confirm">CONFIRMAR CONTRASEÑA</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              value={usuario.confirm}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full text-black text-sm focus:outline-none bg-gray-200"
              placeholder="********"
            />
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold border border-gray-500 hover:bg-gray-100 transition"
            >
              REGISTRARME
            </button>
            <ConfirmDialog />
          </div>

          <div className="text-center">
            <a
              href="/login"
              className="mt-2 inline-block text-sm text-red-600 font-semibold hover:underline transition cursor-pointer"
            >
              ← Volver al inicio de sesión
            </a>
          </div>
        </form>

        <div className="bg-gray-300 border-l-8 border-gray-300 px-6 py-10 flex items-center justify-center flex-col w-[200px] rounded-r-xl">
          <div className="text-center text-black">
            <img src="/LogoUtal.png" className="w-32" alt="Logo Universidad de Talca" />
          </div>
        </div>
      </div>
    </div>
  );
}
