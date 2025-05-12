import { useState } from 'react';
import { FaClock } from 'react-icons/fa';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-calendar/dist/Calendar.css';
import './SolicitarAsesoriaStyles.css';

export default function SolicitarAsesoria() {

  const [formData, setFormData] = useState({
    solicitante: '',
    email: '',
    matricula: '',
    actividad: '',
    fecha: new Date(),
    horaInicio: '',
    horaFin: ''
  });

  // año y mes actual para el calendario
  const currentDate = new Date();
  const currentDay = currentDate.getDate(); 
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  
  const availableDays = [currentDay];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      fecha: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Solicitud de asesoría enviada correctamente.');
    console.log(formData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* contenedor para sidebar y contenido principal */}
      <div className="flex flex-1">

        {/* contenido principal */}
        <div className="flex-1">
          <main className="px-6 py-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-utalca-red">ASESORÍA ONLINE</h1>
                <p className="text-gray-600 mt-2">
                  Aquí puedes solicitar asesoría para tu laboratorio.
                </p>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* columna izquierda - formulario */}
                <div className="w-full md:w-1/2 md:pr-8">
                  <div className="mb-4">
                    <label htmlFor="solicitante" className="block text-sm font-medium text-gray-600 mb-1">
                      Solicitante:
                    </label>
                    <input
                      type="text"
                      id="solicitante"
                      name="solicitante"
                      value={formData.solicitante}
                      onChange={handleChange}
                      placeholder="Ej: Rodrigo Paredes"
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ej: rapa@alumnos.utalca.cl"
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="matricula" className="block text-sm font-medium text-gray-600 mb-1">
                      Matrícula:
                    </label>
                    <input
                      type="text"
                      id="matricula"
                      name="matricula"
                      value={formData.matricula}
                      onChange={handleChange}
                      placeholder="Ej: 202012345"
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="actividad" className="block text-sm font-medium text-gray-600 mb-1">
                      Actividad:
                    </label>
                    <input
                      type="text"
                      id="actividad"
                      name="actividad"
                      value={formData.actividad}
                      onChange={handleChange}
                      placeholder="Ej: Prototipado con Arduino"
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* columna derecha - calendario */}
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Seleccione una fecha:
                    </label>
                    <div className="calendar-container">
                      <div className="calendar-header">
                        <h3 className="calendar-title">
                          {monthNames[currentMonth]} {currentYear}
                        </h3>
                      </div>
                      <Calendar
                        onChange={handleDateChange}
                        value={formData.fecha}
                        locale="es"
                        minDate={new Date()}
                        className="react-calendar"
                        tileClassName={({ date }) => {
                          // marcar días disponibles
                          if (availableDays.includes(date.getDate())) {
                            return 'highlight-available';
                          }
                          return null;
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Horario:
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="horaInicio" className="block text-xs text-gray-500 mb-1">
                          Inicio
                        </label>
                        <div className="relative">
                          <input
                            type="time"
                            id="horaInicio"
                            name="horaInicio"
                            value={formData.horaInicio}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 pl-8 focus:outline-none"
                            required
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaClock className="text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="horaFin" className="block text-xs text-gray-500 mb-1">
                          Término
                        </label>
                        <div className="relative">
                          <input
                            type="time"
                            id="horaFin"
                            name="horaFin"
                            value={formData.horaFin}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 pl-8 focus:outline-none"
                            required
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaClock className="text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Un administrador aceptará la solicitud en caso de enviarse.
                    </p>
                  </div>
                </div>
              </div>

              {/* botón de envío */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-utalca-red hover:bg-utalca-red-dark text-white px-8 py-2 rounded font-medium transition-colors uppercase"
                >
                  Agendar
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}