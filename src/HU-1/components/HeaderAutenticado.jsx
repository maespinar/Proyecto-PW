import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../styles/HeaderAutenticado.css'

const ENLACES = [
  { to: '/convocatorias', texto: 'Convocatorias' },
  { to: '/postulaciones', texto: 'Mis postulaciones' },
  { to: '/guardadas', texto: 'Guardadas' },
  { to: '/empresas', texto: 'Empresas' },
  { to: '/perfil', texto: 'Mi perfil' },
]

export default function HeaderAutenticado({ usuario, onCerrarSesion }) {
  const navigate = useNavigate()
  const [busqueda, setBusqueda] = useState('')
  const menuCuenta = useRef(null)
  const nombre = `${usuario.nombres.split(' ')[0]} ${usuario.apellidos.split(' ')[0]}`
  const iniciales = `${usuario.nombres[0]}${usuario.apellidos[0]}`

  useEffect(() => {
    function cerrarAlSalir(evento) {
      if (!menuCuenta.current?.contains(evento.target)) menuCuenta.current?.removeAttribute('open')
    }
    document.addEventListener('pointerdown', cerrarAlSalir)
    document.addEventListener('focusin', cerrarAlSalir)
    return () => {
      document.removeEventListener('pointerdown', cerrarAlSalir)
      document.removeEventListener('focusin', cerrarAlSalir)
    }
  }, [])

  function cerrarMenu() {
    menuCuenta.current?.removeAttribute('open')
  }

  function buscar(evento) {
    evento.preventDefault()
    const texto = busqueda.trim()
    navigate(texto ? `/convocatorias?q=${encodeURIComponent(texto)}` : '/convocatorias')
  }

  return (
    <header className="header-autenticado">
      <Link className="header-autenticado-marca" to="/convocatorias" aria-label="PrácticaLima, convocatorias">
        <span aria-hidden="true" />PrácticaLima
      </Link>
      <nav className="header-autenticado-navegacion" aria-label="Navegación de estudiante">
        {ENLACES.map(({ to, texto }) => <NavLink key={to} to={to}>{texto}</NavLink>)}
      </nav>
      <form className="header-autenticado-busqueda" role="search" onSubmit={buscar}>
        <button type="submit" aria-label="Buscar convocatorias">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
        </button>
        <input type="search" aria-label="Buscar puesto o empresa en convocatorias" placeholder="Buscar convocatorias" value={busqueda} onChange={evento => setBusqueda(evento.target.value)} />
      </form>
      <details className="header-autenticado-cuenta" ref={menuCuenta} onKeyDown={evento => {
        if (evento.key === 'Escape') {
          cerrarMenu()
          menuCuenta.current?.querySelector('summary').focus()
        }
      }}>
        <summary>
          <span className="header-autenticado-avatar" aria-hidden="true">{iniciales}</span>
          <span>{nombre}</span><span className="header-autenticado-flecha" aria-hidden="true">▾</span>
        </summary>
        <div className="header-autenticado-desplegable">
          <Link to="/perfil" onClick={cerrarMenu}>Mi perfil</Link>
          <Link to="/perfil/configuracion/contrasena" onClick={cerrarMenu}>Configuración de la cuenta</Link>
          <button type="button" onClick={() => {
            cerrarMenu()
            onCerrarSesion()
            navigate('/iniciar-sesion')
          }}>Cerrar sesión</button>
        </div>
      </details>
    </header>
  )
}
