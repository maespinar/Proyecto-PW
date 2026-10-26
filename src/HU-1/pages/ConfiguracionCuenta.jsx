import { Link, useNavigate } from 'react-router-dom'
import MenuPerfil from '../../HU-2/components/MenuPerfil'
import FormularioCambioContrasena from '../components/FormularioCambioContrasena'
import { obtenerRutaPrincipal } from '../utils/sesionUtils'
import '../styles/Registro.css'
import '../styles/EstadosRegistro.css'
import '../styles/ConfiguracionCuenta.css'

export default function ConfiguracionCuenta({ usuario }) {
  const navigate = useNavigate()
  const esEmpresa = usuario.rol === 'empresa'
  const rutaPerfil = obtenerRutaPrincipal(usuario)

  return (
    <section className={`configuracion-cuenta${esEmpresa ? ' configuracion-cuenta--empresa' : ''}`} aria-labelledby="configuracion-titulo">
      <nav className="configuracion-migas" aria-label="Ruta de navegación">
        <Link to={rutaPerfil}>{esEmpresa ? 'Perfil de la empresa' : 'Mi perfil'}</Link>
        <span aria-hidden="true">·</span>
        <span aria-current="page">Configuración de la cuenta</span>
      </nav>
      <h1 id="configuracion-titulo">Configuración de la cuenta</h1>
      <div className="configuracion-distribucion">
        {!esEmpresa && <aside>
          <MenuPerfil className="configuracion-menu" incluirNotificaciones />
        </aside>}
        <FormularioCambioContrasena key={usuario.correo} correo={usuario.correo} onCancelar={() => navigate(rutaPerfil)} />
      </div>
    </section>
  )
}
