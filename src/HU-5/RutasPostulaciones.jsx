import { Route, Routes, useLocation } from 'react-router-dom'
import MisPostulaciones from './pages/MisPostulaciones'
import DetallePostulacion from './pages/DetallePostulacion'
import ConfirmacionEnvio from './pages/ConfirmacionEnvio'
import NotificacionPostulaciones from './components/NotificacionPostulaciones'
import PaginaNoEncontrada from '../HU-1/pages/PaginaNoEncontrada'
import './styles/hu5.css'

export default function RutasPostulaciones() {
  const { pathname } = useLocation()
  return (
    <div className="hu5-modulo-wrapper">
      <NotificacionPostulaciones />
      <Routes key={pathname}>
        <Route index element={<MisPostulaciones />} />
        <Route path="confirmacion" element={<ConfirmacionEnvio />} />
        <Route path=":id" element={<DetallePostulacion />} />
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>
    </div>
  )
}
