import React from 'react';

const FormularioImpresion = () => {
  return (
    <div className="bg-white text-sm pt-4">
      <section className="max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden">
        {/* Título */}
        <div className="bg-red-700 p-4">
          <h1 className="text-center text-xl font-bold text-white">SOLICITUD DE IMPRESIÓN</h1>
        </div>

        {/* Formulario */}
        <form className="p-6 space-y-6">
          <p className="text-center text-gray-600 text-sm">Aquí puedes solicitar impresiones para tus laboratorios.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Solicitante:" placeholder="Nombre" />
            <Input label="Email:" type="email" placeholder="Correo" />
            <Input label="Matrícula:" placeholder="Matrícula" />
            <Input label="Actividad:" placeholder="Actividad" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Tipo de proyecto:" placeholder="Buscar proyecto" />
            <Input label="Tipo de material:" placeholder="Buscar material" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Archivo para impresión:</label>
            <div className="border-2 border-gray-300 border-dashed rounded-lg p-6 bg-white text-center hover:border-red-500 transition-colors cursor-pointer">
              <div className="space-y-2">
                <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-sm text-gray-600">
                  <label htmlFor="file-upload" className="cursor-pointer font-medium text-red-600 hover:text-red-500">
                    Subir un archivo
                  </label>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  <p className="text-xs mt-1">o arrastra y suelta</p>
                  <p className="text-xs text-gray-500">Formatos aceptados: .stl, .obj, .zip, .rar</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-red-700 shadow-sm">
              Enviar Solicitud
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

// Componente reutilizable de Input
const Input = ({ label, type = "text", placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm"
    />
  </div>
);

export default FormularioImpresion;
