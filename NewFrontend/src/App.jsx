import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import NotAvailable from './components/NotAvailable';
import SolicitarAsesoria from './components/asesorias/SolicitarAsesoria';
import Admin from './components/administrador/Admin';
import CoordinadorGeneral from './components/coordinadorGeneral/CoordinadorGeneral';
import CoordinadorLaboratorio from './components/coordinadorLaboratorio/CoordinadorLaboratorio';
import UsuarioExterno from './components/usuarioExterno/UsuarioExterno';
import EstudianteAcademico from './components/estudianteAcademico/EstudianteAcademico';
import FormularioImpresion from './components/formularioImpresion/FormularioImpresion';
import Layout from './components/globals/Layout';
import NotFound from './components/globals/notFound';
export default function App() {
  return (
    <Routes>

      {/* Redirección inicial */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Registro y Login */}
      <Route path="/registro" element={<Register />} />
      <Route path="/login" element={<Login />} />
        <Route element={<Layout/>} >
          {/* Rutas protegidas (dentro del Layout) */}
          <Route path="/" element={<div className="bg-blue-600 text-white p-10 text-center text-3xl">✅ Tailwind está funcionando</div>} />
          <Route path="admin" element={<Admin />} />
          <Route path="coordinadorGeneral" element={<CoordinadorGeneral />} />
          <Route path="coordinadorLaboratorio" element={<CoordinadorLaboratorio />} /> 
          <Route path="usuarioExterno" element={<UsuarioExterno />} />
          <Route path="estudianteAcademico" element={<EstudianteAcademico />} />  
          <Route path="formularioImpresion" element={<FormularioImpresion />} />
          <Route path="/impresion" element={<NotAvailable />} />
          <Route path="/asesoria" element={<SolicitarAsesoria />} />
          <Route path="/solicitudes" element={<NotAvailable />} />
          <Route path="/not-available" element={<NotAvailable />} />
          <Route path="/logout" element={<NotAvailable />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      {/*cualquier otra ruta */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
