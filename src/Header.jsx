import './Header.css'

function Header() {
    return (
        <>
            <header>
                <div id="logo">
                    <div id="cuadradito">

                    </div>
                    <span className="logo-text">PrácticaLima</span>

                    <ul>
                        <li><a href="#convocatorias">Convocatorias</a></li>
                        <li><a href="#">Empresas</a></li>
                        <li><a href="#como-funciona">Cómo funciona</a></li>
                    </ul>
                </div>
                <div id="buttons">
                    <button id="login-btn">Iniciar sesión</button>
                    <button id="register-btn">Registrarse</button>
                </div>
            </header>
        </>
    )
}

export default Header
