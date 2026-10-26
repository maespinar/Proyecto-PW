import { Link, NavLink } from 'react-router-dom'
import BuscadorConvocatorias from './BuscadorConvocatorias'
import MenuCuenta from './MenuCuenta'
import '../styles/HeaderAutenticado.css'

const ENLACES = [
  { to: '/convocatorias', texto: 'Convocatorias' },
  { to: '/postulaciones', texto: 'Mis postulaciones' },
  { to: '/guardadas', texto: 'Guardadas' },
  { to: '/empresas', texto: 'Empresas' },
  { to: '/perfil', texto: 'Mi perfil' },
]

const ENLACES_EMPRESA = [
  { to: '/empresa/perfil', texto: 'Mi empresa' },
  { to: '/empresa/convocatorias', texto: 'Mis convocatorias' },
  { to: '/empresa/postulantes', texto: 'Postulantes' },
  { to: '/convocatorias', texto: 'Catálogo' },
]

export default function HeaderAutenticado({ usuario, onCerrarSesion }) {
  return (
    <header className="header-autenticado">
      <Link className="header-autenticado-marca" to="/convocatorias" aria-label="PrácticaLima, convocatorias">
        <span aria-hidden="true" />PrácticaLima
      </Link>
      <nav className="header-autenticado-navegacion" aria-label={`Navegación de ${usuario.rol}`}>
        {(usuario.rol === 'empresa' ? ENLACES_EMPRESA : ENLACES).map(({ to, texto }) => <NavLink key={to} to={to}>{texto}</NavLink>)}
      </nav>
      <BuscadorConvocatorias />
      <MenuCuenta usuario={usuario} onCerrarSesion={onCerrarSesion} />
    </header>
  )
}