import { Link, useNavigate } from 'react-router-dom'
import MenuPerfil from '../../HU-2/components/MenuPerfil'
import FormularioCambioContrasena from '../components/FormularioCambioContrasena'
import '../styles/Registro.css'
import '../styles/EstadosRegistro.css'
import '../styles/ConfiguracionCuenta.css'

export default function ConfiguracionCuenta({ usuario }) {
  const navigate = useNavigate()

  return (
    <section className="configuracion-cuenta" aria-labelledby="configuracion-titulo">
      <nav className="configuracion-migas" aria-label="Ruta de navegación">
        <Link to="/perfil">Mi perfil</Link>
        <span aria-hidden="true">·</span>
        <span aria-current="page">Configuración de la cuenta</span>
      </nav>
      <h1 id="configuracion-titulo">Configuración de la cuenta</h1>
      <div className="configuracion-distribucion">
        <aside>
          <MenuPerfil className="configuracion-menu" incluirNotificaciones />
        </aside>
        <FormularioCambioContrasena correo={usuario.correo} onCancelar={() => navigate('/perfil')} />
      </div>
    </section>
  )
}
