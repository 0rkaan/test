
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const UsuarioExterno = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const decoded = jwtDecode(token);
    if (decoded.rol !== 'Usuario_Externo') {
      alert('Acceso denegado');
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Página de Usuario_Externo</h1>
      {/* Contenido de la página */}
    </div>
  );
};

export default UsuarioExterno;
