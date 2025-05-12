import React from 'react';
import { Link } from 'react-router-dom';

const NotAvailable = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md text-center">
        <div className="mx-auto mb-6">
          <img
            src="/LogoUtal.png"
            alt="Logo Universidad de Talca"
            className="w-32 h-32 object-contain mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-utalca-red mb-4">
          Funcionalidad No Disponible
        </h1>
        <p className="text-gray-600 mb-8">
          Lo sentimos, esta funcionalidad aún se encuentra en desarrollo y no está disponible en este momento. 
          Estamos trabajando para implementarla lo antes posible.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-6 py-2 bg-utalca-red text-white font-medium rounded hover:bg-utalca-red-dark transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotAvailable;