import { Routes, Route, Navigate } from 'react-router-dom'
import EmpresaLayout from './HU-3/pages/EmpresaLayout'
import PerfilEmpresa from './HU-3/pages/PerfilEmpresa'
import EditarPerfilEmpresa from './HU-3/pages/EditarPerfilEmpresa'
import MisConvocatorias from './HU-3/pages/MisConvocatorias'
import NuevaConvocatoria from './HU-3/pages/NuevaConvocatoria'
import FichaEmpresa from './HU-3/pages/FichaEmpresa'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/empresa/perfil" replace />} />

      <Route path="/empresa" element={<EmpresaLayout />}>
        <Route index element={<Navigate to="perfil" replace />} />
        <Route path="perfil" element={<PerfilEmpresa />} />
        <Route path="perfil/editar" element={<EditarPerfilEmpresa />} />
        <Route path="convocatorias" element={<MisConvocatorias />} />
        <Route path="convocatorias/nueva" element={<NuevaConvocatoria />} />
      </Route>

      <Route path="/empresas/andes-peru" element={<FichaEmpresa />} />
    </Routes>
  )
}

export default App