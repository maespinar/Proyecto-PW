import { Link, NavLink, useLocation } from 'react-router-dom'
import '../styles/Header.css'

function Header() {
    const location = useLocation()
    const esEstudiante =
        location.pathname.startsWith('/postulaciones') ||
        location.pathname.startsWith('/perfil')

    return (
        <header className="header-principal">
            <div id="logo">
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <div id="cuadradito"></div>
                    <span className="logo-text">PrácticaLima</span>
                </Link>

                <ul>
                    <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'activa' : '')}>Convocatorias</NavLink></li>
                    <li><NavLink to="/postulaciones" className={({ isActive }) => (isActive ? 'activa' : '')}>Mis postulaciones</NavLink></li>
                    <li><a href="#guardadas">Guardadas</a></li>
                    <li><a href="#empresas">Empresas</a></li>
                    <li><NavLink to="/perfil" className={({ isActive }) => (isActive ? 'activa' : '')}>Mi perfil</NavLink></li>
                </ul>
            </div>

            {esEstudiante ? (
                <div className="header-estudiante-derecha">
                    <div className="header-buscador">
                        <svg className="buscador-icono" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" placeholder="Buscar convocatorias" aria-label="Buscar convocatorias" />
                    </div>

                    <div className="header-usuario-pill">
                        <span className="usuario-avatar-mq">MQ</span>
                        <span className="usuario-nombre">Mariana Quispe</span>
                        <span className="usuario-caret">▾</span>
                    </div>
                </div>
            ) : (
                <div id="buttons">
                    <button id="login-btn">Iniciar sesión</button>
                    <button id="register-btn">Registrarse</button>
                </div>
            )}
        </header>
    )
}

export default Header
