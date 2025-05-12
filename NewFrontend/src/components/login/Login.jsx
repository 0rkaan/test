import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { jwtDecode } from 'jwt-decode';



export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/login', {
        email: username,
        password: password,
      });

      const token = data.token; 
      localStorage.setItem('token', token); 

      if (token) {
        
        const decoded = jwtDecode(token);
        const rol = decoded.rol;
        console.log('Rol decodificado:', rol);
    

        switch (rol) {
          case "Administrador":
            navigate("/admin");
            break;
          case "Coordinador_General":
            navigate("/coordinadorGeneral");
            break;
          case "Coordinador_Laboratorio":
            navigate("/coordinadorLaboratorio");
            break;
          case "Usuario_Externo":
            navigate("/usuarioExterno");
            break;
          case "Estudiante_Academico":
            navigate("/dashboard");
            break;
          default:
            alert("Rol no reconocido");
            navigate("/login");
        }
      } else {
        alert("No se recibió token");
      }
    } catch (error) {
      console.error('Error en login:', error);
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-black mb-6">Sistema de Reserva de Laboratorios</h1>

      <form
        onSubmit={onLogin}
        className="flex items-stretch w-[600px] rounded-l-[2rem] overflow-hidden shadow-2xl rounded-r-4xl"
      >
        {/* Formulario */}
        <div className="bg-white text-black px-10 py-12 flex-1 rounded-l-[2rem] flex flex-col justify-center space-y-6">
          <div className="flex justify-center text-2xl text-red-600 font-bold">
            Inicio de sesión
          </div>

          <div>
            <label className="text-sm block mb-1" htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-full text-black text-sm focus:outline-none bg-gray-200"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div>
            <label className="text-sm block mb-1" htmlFor="password">CONTRASEÑA</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-full text-black text-sm focus:outline-none bg-gray-200"
              placeholder="********"
              required
            />
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold border border-gray-700 hover:bg-gray-100 transition"
            >
              ENTRAR
            </button>
          </div>

          <div className="text-center text-sm mt-2">
            ¿No tienes cuenta?
            <a
              href="/registro"
              className="text-red-600 font-semibold hover:underline cursor-pointer ml-1"
            >
              Regístrate aquí
            </a>
          </div>
        </div>

        {/* Logo */}
        <div className="bg-gray-200 border-l-8 border-white px-6 py-10 flex items-center justify-center flex-col w-[200px] rounded-r-xl">
          <img
            src="/LogoUtal.png"
            alt="Logo Universidad de Talca"
            className="w-32 h-32 object-contain mb-4"
          />
        </div>
      </form>
    </div>
  );
}
