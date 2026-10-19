import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Header from './HU-1/components/Header'
import LandingPublica from './HU-1/pages/LandingPublica'
import RutasPerfil from './HU-2/RutasPerfil'
import Footer from './HU-1/components/Footer'
import HU5 from './HU-5/HU5'

function App() {
  const location = useLocation()
  const esRutaHU5 =
    location.pathname.startsWith('/postulaciones') ||
    location.pathname.startsWith('/hu-5')

  return (
    <>
      <div className="demo-hu-selector">
        <span className="demo-selector-label">Proyecto PrácticaLima · Historias:</span>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `btn-demo-hu ${isActive && location.pathname === '/' ? 'active' : ''}`
          }
        >
          HU-1 (Landing Pública)
        </NavLink>
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            `btn-demo-hu ${isActive || location.pathname.startsWith('/perfil') ? 'active' : ''}`
          }
        >
          HU-2 (Perfil Estudiante)
        </NavLink>
        <NavLink
          to="/postulaciones"
          className={({ isActive }) =>
            `btn-demo-hu ${isActive || esRutaHU5 ? 'active' : ''}`
          }
        >
          HU-5 (Postulaciones)
        </NavLink>
      </div>

      {!esRutaHU5 && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<LandingPublica />} />
          <Route path="/perfil/*" element={<RutasPerfil />} />
          <Route path="/postulaciones/*" element={<HU5 />} />
          <Route path="/hu-5/*" element={<HU5 />} />
        </Routes>
      </main>

      {!esRutaHU5 && <Footer />}
    </>
  )
}

export default App
