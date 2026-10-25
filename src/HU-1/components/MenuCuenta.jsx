import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { obtenerRutaContrasena, obtenerRutaPrincipal } from '../utils/sesionUtils'
import '../styles/HeaderAutenticado.css'

export default function MenuCuenta({ usuario, onCerrarSesion, panelEmpresa = false }) {
  const navigate = useNavigate()
  const [errorCierre, setErrorCierre] = useState(false)
  const menuCuenta = useRef(null)
  const esEmpresa = usuario.rol === 'empresa'
  const nombre = esEmpresa
    ? (panelEmpresa ? usuario.razonSocial || usuario.nombreComercial : usuario.nombreComercial)
    : `${usuario.nombres.split(' ')[0]} ${usuario.apellidos.split(' ')[0]}`
  const iniciales = esEmpresa ? usuario.iniciales : `${usuario.nombres[0]}${usuario.apellidos[0]}`
  const rutaPerfil = obtenerRutaPrincipal(usuario)

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

  return (
    <details className="header-autenticado-cuenta" ref={menuCuenta} onKeyDown={evento => {
      if (evento.key === 'Escape') {
        cerrarMenu()
        menuCuenta.current?.querySelector('summary').focus()
      }
    }}>
      <summary>
        <span className="header-autenticado-avatar" aria-hidden="true">{iniciales}</span>
        <span className="header-cuenta-identidad">
          {panelEmpresa ? <>
            <span className="header-cuenta-nombre">{nombre}</span>
            <small className="header-autenticado-rol">Empresa · Sesión de demostración</small>
          </> : <><small className="header-autenticado-rol">{esEmpresa ? 'Empresa' : 'Estudiante'}</small>{nombre}</>}
        </span>
        <span className="header-autenticado-flecha" aria-hidden="true">▾</span>
      </summary>
      <div className="header-autenticado-desplegable">
        <Link to={rutaPerfil} onClick={cerrarMenu}>{esEmpresa ? 'Perfil de la empresa' : 'Mi perfil'}</Link>
        <Link to={obtenerRutaContrasena(usuario)} onClick={cerrarMenu}>Configuración de la cuenta</Link>
        {panelEmpresa && <Link to="/convocatorias" onClick={cerrarMenu}>Ir al catálogo público</Link>}
        <button type="button" onClick={() => {
          try {
            onCerrarSesion()
            cerrarMenu()
            navigate('/iniciar-sesion')
          } catch {
            setErrorCierre(true)
          }
        }}>Cerrar sesión</button>
        {errorCierre && <p role="alert">No pudimos borrar la sesión guardada. Revisa el almacenamiento del navegador y vuelve a intentar cerrar sesión.</p>}
      </div>
    </details>
  )
}
