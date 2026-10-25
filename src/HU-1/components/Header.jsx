import { Link } from 'react-router-dom'
import HeaderAutenticado from './HeaderAutenticado'
import CabeceraEmpresa from '../../HU-3/components/CabeceraEmpresa'
import '../styles/Header.css'

function Header({ usuario, onCerrarSesion, panelEmpresa = false }) {
  if (panelEmpresa && usuario?.rol === 'empresa') return <CabeceraEmpresa usuario={usuario} onCerrarSesion={onCerrarSesion} />
  if (usuario) return <HeaderAutenticado usuario={usuario} onCerrarSesion={onCerrarSesion} />

  return (
    <header className="header-publico">
      <div id="logo">
        <Link to="/" className="header-marca" aria-label="PrácticaLima, inicio">
          <span id="cuadradito" aria-hidden="true"></span>
          <span className="logo-text">PrácticaLima</span>
        </Link>
        <ul>
          <li><Link to="/#convocatorias">Convocatorias</Link></li>
          <li><Link to="/empresas">Empresas</Link></li>
          <li><Link to="/#como-funciona">Cómo funciona</Link></li>
        </ul>
      </div>
      <div id="buttons">
        <Link to="/iniciar-sesion" id="login-btn" className="text-decoration-none">Iniciar sesión</Link>
        <Link to="/registro" id="register-btn" className="text-decoration-none">Registrarse</Link>
      </div>
    </header>
  )
}

export default Header
