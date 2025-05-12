// components/Footer.js
import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white text-xs mt-8 px-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col space-y-1">
          <span className="font-bold text-sm">Plataforma de Reserva de Laboratorios</span>
          <span>Universidad de Talca</span>
          <span>reservalabos@utalca.cl</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Síguenos:</span>
            <a href="#" className="text-white hover:text-gray-400"><FaFacebookF /></a>
            <a href="#" className="text-white hover:text-gray-400"><FaLinkedinIn /></a>
            <a href="#" className="text-white hover:text-gray-400"><FaInstagram /></a>
            <a href="#" className="text-white hover:text-gray-400"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
}
