import { Link, NavLink } from 'react-router-dom'
import '../styles/Header.css'

function Header({ sesionIniciada }) {
  return (
    <header className="header-principal">
      <div id="logo">
        <Link to="/" className="header-marca" aria-label="PrácticaLima, inicio">
          <span id="cuadradito" aria-hidden="true"></span>
          <span className="logo-text">PrácticaLima</span>
        </Link>

        <ul>
          {sesionIniciada ? (
            <>
              <li><NavLink to="/convocatorias" className={({ isActive }) => isActive ? 'activa' : ''}>Convocatorias</NavLink></li>
              <li><NavLink to="/postulaciones" className={({ isActive }) => isActive ? 'activa' : ''}>Mis postulaciones</NavLink></li>
              <li><NavLink to="/guardadas" className={({ isActive }) => isActive ? 'activa' : ''}>Guardadas</NavLink></li>
              <li><NavLink to="/empresas" className={({ isActive }) => isActive ? 'activa' : ''}>Empresas</NavLink></li>
              <li><NavLink to="/perfil" className={({ isActive }) => isActive ? 'activa' : ''}>Mi perfil</NavLink></li>
            </>
          ) : (
            <>
              <li><Link to="/#convocatorias">Convocatorias</Link></li>
              <li><Link to="/empresas">Empresas</Link></li>
              <li><Link to="/#como-funciona">Cómo funciona</Link></li>
            </>
          )}
        </ul>
      </div>

      {sesionIniciada ? (
        <div className="header-estudiante-derecha">
          <Link to="/convocatorias" className="header-enlace-catalogo">Buscar convocatorias</Link>
          <Link to="/perfil" className="header-usuario-pill">
            <span className="usuario-avatar-mq" aria-hidden="true">MQ</span>
            <span className="usuario-nombre">Mariana Quispe</span>
          </Link>
        </div>
      ) : (
        <div id="buttons">
          <Link to="/iniciar-sesion" id="login-btn" className="text-decoration-none">Iniciar sesión</Link>
          <Link to="/registro" id="register-btn" className="text-decoration-none">Registrarse</Link>
        </div>
      )}
    </header>
  )
}

export default Header
