import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AccesoDenegado from '../pages/AccesoDenegado'

// Solo controla la navegación de la demostración. La API deberá autorizar
// cada operación sin confiar en el usuario ni el rol recibidos del frontend.
export default function RutaPorRol({ usuario, rol }) {
  const { pathname, search } = useLocation()
  if (!usuario) return <Navigate to="/iniciar-sesion" state={{ destino: pathname + search }} replace />
  return usuario.rol === rol ? <Outlet /> : <AccesoDenegado usuario={usuario} />
}
