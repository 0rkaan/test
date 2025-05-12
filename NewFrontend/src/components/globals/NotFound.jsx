import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Página no encontrada</h2>
      <p className="text-gray-600 mb-6">
        Lo sentimos, la página que estás buscando no existe o fue movida.
      </p>
      <Link to="/" className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
        Volver al inicio
      </Link>
    </div>
  );
}
