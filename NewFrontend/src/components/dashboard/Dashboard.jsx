import { useState } from 'react';
import { FaUser, FaPrint, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import TarjetaServicio from './TarjetaServicio';

export default function Dashboard() {
  const [user] = useState({
    name: 'Usuario General',
    email: 'usuario@utalca.cl'
  });

  // servicios disponibles
  const services = [
    {
      id: 1,
      title: 'IMPRESIÓN 3D',
      description: 'Solicita la impresión de tus diseños 3D, con opciones de materiales y acabados personalizados para prototipos o proyectos finales.',
      icon: <FaPrint className="text-white text-3xl" />,
      route: '/impresion'
    },
    {
      id: 2,
      title: 'ASESORÍA',
      description: 'Reserva una asesoría presencial u online para resolver tus dudas sobre diseño, materiales, o si tu idea puede ejecutarse con impresión 3D u otros medios.',
      icon: <FaCalendarAlt className="text-white text-3xl" />,
      route: '/asesoria'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* contenedor para sidebar y contenido principal */}
      <div className="flex flex-1">

        {/* contenido principal */}
        <div className="flex-1">
          <main className="px-6 py-8">
            {/* Bienvenida */}
            <section className="text-center mb-16">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                ¡Bienvenido a la Plataforma de Prototipaje!
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Aquí podrás acceder fácilmente a los servicios disponibles para estudiantes y académicos de la Universidad de Talca.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-12 max-w-4xl mx-auto"></div>

            {/* servicios */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-center text-primary mb-6">
                SERVICIOS
              </h2>
              <p className="text-center text-gray-600 mb-10">
                Aquí puedes realizar las solicitudes para tus laboratorios.
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {services.map(service => (
                  <TarjetaServicio 
                    key={service.id}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    route={service.route}
                  />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}