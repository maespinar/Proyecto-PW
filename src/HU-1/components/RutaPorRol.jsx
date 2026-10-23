import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AccesoDenegado from '../pages/AccesoDenegado'

export default function RutaPorRol({ usuario, rol }) {
  const { pathname, search } = useLocation()
  if (!usuario) return <Navigate to="/iniciar-sesion" state={{ destino: pathname + search }} replace />
  return !rol || usuario.rol === rol ? <Outlet /> : <AccesoDenegado usuario={usuario} />
}
