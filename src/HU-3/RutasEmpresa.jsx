import { Navigate, Route, Routes } from 'react-router-dom'
import EnConstruccion from '../HU-2/components/EnConstruccion'
import EmpresaLayout from './pages/EmpresaLayout'
import PerfilEmpresa from './pages/PerfilEmpresa'
import EditarPerfilEmpresa from './pages/EditarPerfilEmpresa'
import MisConvocatorias from './pages/MisConvocatorias'
import NuevaConvocatoria from './pages/NuevaConvocatoria'
import ConfiguracionCuenta from '../HU-1/pages/ConfiguracionCuenta'

export default function RutasEmpresa({ usuario }) {
  return (
    <Routes>
      <Route element={<EmpresaLayout />}>
        <Route index element={<Navigate to="perfil" replace />} />
        <Route path="perfil" element={<PerfilEmpresa />} />
        <Route path="perfil/editar" element={<EditarPerfilEmpresa />} />
        <Route path="convocatorias" element={<MisConvocatorias />} />
        <Route path="convocatorias/nueva" element={<NuevaConvocatoria />} />
        <Route path="nueva-convocatorias" element={<Navigate to="/empresa/convocatorias/nueva" replace />} />
        <Route path="postulantes" element={<EnConstruccion titulo="Bandeja de postulantes" />} />
        <Route path="resenas" element={<EnConstruccion titulo="Reseñas recibidas" />} />
        <Route path="cambiar-contrasena" element={<ConfiguracionCuenta usuario={usuario} />} />
        <Route path="*" element={<Navigate to="/empresa/perfil" replace />} />
      </Route>
    </Routes>
  )
}
