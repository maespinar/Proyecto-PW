import { Outlet } from 'react-router-dom'
import { PerfilProvider } from '../context/PerfilContext'
import MenuPerfil from '../components/MenuPerfil'
import Notificacion from '../components/Notificacion'
import '../styles/hu2.css'

export default function LayoutPerfil() {
  return (
    <PerfilProvider>
      <div className="hu2 container py-4">
        <Notificacion />
        <div className="row g-4">
          <aside className="col-12 col-md-4 col-lg-3">
            <MenuPerfil />
          </aside>
          <section className="col-12 col-md-8 col-lg-9">
            <Outlet />
          </section>
        </div>
      </div>
    </PerfilProvider>
  )
}
