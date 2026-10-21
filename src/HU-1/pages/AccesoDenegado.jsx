import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/AccesoDenegado.css'

export default function AccesoDenegado() {
  const titulo = useRef(null)

  useEffect(() => {
    titulo.current?.focus({ preventScroll: true })
  }, [])

  return (
    <section className="acceso-denegado" aria-labelledby="acceso-denegado-titulo">
      <div className="acceso-denegado-contenido">
        <div className="acceso-denegado-icono" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="m5.6 5.6 12.8 12.8" />
          </svg>
        </div>
        <p className="acceso-denegado-codigo">Error 403</p>
        <h1 id="acceso-denegado-titulo" ref={titulo} tabIndex={-1}>No tienes acceso a esta sección</h1>
        <p className="acceso-denegado-descripcion">
          La bandeja de postulantes es exclusiva de las cuentas de empresa.
          <br />
          Con tu cuenta de estudiante puedes revisar el catálogo y el estado de tus postulaciones.
        </p>
        <nav className="acceso-denegado-acciones" aria-label="Opciones para continuar">
          <Link className="acceso-denegado-principal" to="/postulaciones">Ir a mis postulaciones</Link>
          <Link className="acceso-denegado-secundario" to="/convocatorias">Volver al catálogo</Link>
        </nav>
      </div>
    </section>
  )
}
