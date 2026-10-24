import { Route, Routes } from 'react-router-dom'
import { PostulacionesProvider } from './context/PostulacionesContext'
import MisPostulaciones from './pages/MisPostulaciones'
import DetallePostulacion from './pages/DetallePostulacion'
import ConfirmacionEnvio from './pages/ConfirmacionEnvio'
import NotificacionPostulaciones from './components/NotificacionPostulaciones'
import './styles/hu5.css'

export default function RutasPostulaciones() {
  return (
    <PostulacionesProvider>
      <div className="hu5-modulo-wrapper">
        <NotificacionPostulaciones />
        <Routes>
          <Route index element={<MisPostulaciones />} />
          <Route path="confirmacion" element={<ConfirmacionEnvio />} />
          <Route path=":id" element={<DetallePostulacion />} />
        </Routes>
      </div>
    </PostulacionesProvider>
  )
}
