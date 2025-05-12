import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');               
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-20">
      <div className="w-full bg-gray-400 h-4"></div>
      <div className="bg-white w-full py-2 px-4 flex justify-between items-center shadow">
        <div className="flex items-center space-x-2">
          <img
            src="/Utalca.png"
            alt="Logo Universidad de Talca"
            className="w-12 h-12 object-contain"
          />
          <div>
            <div className="text-sm font-semibold">Plataforma de Reserva de Laboratorios</div>
            <div className="text-xs text-gray-600">Universidad de Talca</div>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <span className="mr-4">Campus Curicó, Los Niches</span>
          <span className="mr-4">Estudiantes a star.staff@gmail.com</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-1 rounded text-xs border-none hover:bg-red-700 transition duration-200"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
