import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";

import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";

import RutaProtegida from "./layouts/RutaProtegida";
import Pacientes from "./pages/Pacientes";
import NuevoPaciente from "./pages/NuevoPaciente";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";
import Paciente from "./pages/Paciente";
import EditarPaciente from "./pages/EditarPaciente";
import NuevoCliente from "./pages/NuevoCliente";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/pacientes" element={<RutaProtegida />}>
              <Route index element={<Pacientes />} />
              <Route path="crear-paciente" element={<NuevoPaciente />} />
              <Route path="nuevo-cliente/:id" element={<NuevoCliente />} />
              <Route path=":id" element={<Paciente />} />
              <Route path="editar/:id" element={<EditarPaciente />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
