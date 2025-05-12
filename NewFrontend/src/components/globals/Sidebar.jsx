import React from 'react';
import { useState, useEffect } from 'react';
import { loadSidebarData } from '../../services/sidebar.js';
export default function Sidebar() {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [links, setLinks] = useState([]);
  
    useEffect(() => {
        const fetchSidebar = async () => {
          const cached = sessionStorage.getItem('sidebar');
          if (cached) {
            const data = JSON.parse(cached);
            setEmail(data.email);
            setNombre(data.nombre);
            setLinks(data.links);
            return;
          }
      
          const data = await loadSidebarData();
          if (data) {
            setEmail(data.email);
            setNombre(data.nombre);
            setLinks(data.links);
            sessionStorage.setItem('sidebar', JSON.stringify(data)); // Guarda para la sesión actual
          }
        };
      
        fetchSidebar();
      }, []);

  return (
    <aside className="w-64 bg-white shadow-md p-4 sticky top-16 h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-4xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A9 9 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div className="mt-2 text-sm font-medium">{nombre}</div>
        <div className="text-xs text-gray-500">{email}</div>
      </div>

      <div className="border-t border-gray-300 my-4" />

      <nav className="flex flex-col space-y-1">
      {links.map(link => (
        <a
        href={link.href}
        key={link.href}
        className="flex items-center px-4 py-2 text-sm rounded hover:bg-red-100 hover:text-red-700 transition font-medium"
      >
        {link.icon} <span className="ml-2">{link.label}</span>
      </a>
      ))}
      </nav>
    </aside>
  );
}
