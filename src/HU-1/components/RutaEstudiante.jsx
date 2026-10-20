import { Navigate, Outlet, useLocation } from 'react-router-dom'

// Protección de navegación de la demostración; la API deberá autorizar cada operación.
export default function RutaEstudiante({ usuario }) {
  const { pathname, search } = useLocation()
  return usuario ? <Outlet /> : <Navigate to="/iniciar-sesion" state={{ destino: pathname + search }} replace />
}
