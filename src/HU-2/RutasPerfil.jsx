import { Route, Routes } from 'react-router-dom'
import LayoutPerfil from './pages/LayoutPerfil'
import DatosPersonales from './pages/DatosPersonales'
import EditarDatosPersonales from './pages/EditarDatosPersonales'
import Habilidades from './pages/Habilidades'
import Experiencia from './pages/Experiencia'
import VistaPublica from './pages/VistaPublica'

// Todas las rutas de HU-2 cuelgan de /perfil (ver App.jsx).
export default function RutasPerfil() {
  return (
    <Routes>
      <Route element={<LayoutPerfil />}>
        <Route index element={<DatosPersonales />} />
        <Route path="editar" element={<EditarDatosPersonales />} />
        <Route path="habilidades" element={<Habilidades />} />
        <Route path="experiencia" element={<Experiencia />} />
        <Route path="publico" element={<VistaPublica />} />
      </Route>
    </Routes>
  )
}
