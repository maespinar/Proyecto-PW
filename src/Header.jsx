import { useState } from 'react';
import './Header.css'

function Header() {
    const [pestañaActiva, setPestañaActiva] = useState('Convocatorias');

    return (
        <>
            <header>
                <div id="logo">
                    <div id="cuadradito">

                    </div>
                    <h1>PrácticaLima</h1>

                    <ul>
                        <li><a href="#">Convocatorias</a></li>
                        <li><a href="#">Empresas</a></li>
                        <li><a href="#">Cómo funciona</a></li>
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
