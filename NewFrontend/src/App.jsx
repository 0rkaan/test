import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';

export default function App() {
  return (
    
    <Routes>
        
      {/* Redirección inicial: '' => '/app' */}
      /*<Route path="/" element={<div className="bg-blue-600 text-white p-10 text-center text-3xl">
      ✅ Tailwind está funcionando
    </div>} />*/

      {/* Página principal */}
      {/*<Route path="/app" element={<Home />} />*/}

      

      {/* Registro y Login */}
      <Route path="/registro" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/*cualquier otra ruta */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
