import { Link } from 'react-router-dom'
import HeaderAutenticado from './HeaderAutenticado'
import '../styles/Header.css'

function Header({ usuario, onCerrarSesion }) {
    if (usuario) return <HeaderAutenticado usuario={usuario} onCerrarSesion={onCerrarSesion} />
    return (
        <>
            <header className="header-publico">
                <div id="logo">
                    <div id="cuadradito">

                    </div>
                    <Link to="/" className="logo-text text-decoration-none">PrácticaLima</Link>

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
        </>
    )
}

export default Header
