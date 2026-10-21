import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/PaginaError.css'

export default function PaginaError({ codigo, titulo, descripcion, icono, acciones }) {
  const encabezado = useRef(null)
  const tituloId = `error-${codigo}-titulo`

  useEffect(() => {
    encabezado.current?.focus({ preventScroll: true })
  }, [codigo])

  return (
    <section className={`pagina-error pagina-error--${codigo}`} aria-labelledby={tituloId}>
      <div className="pagina-error-contenido">
        <div className="pagina-error-icono" aria-hidden={icono ? true : undefined}>
          {icono || codigo}
        </div>
        {icono && <p className="pagina-error-codigo">Error {codigo}</p>}
        <h1 id={tituloId} ref={encabezado} tabIndex={-1}>{titulo}</h1>
        <p className="pagina-error-descripcion">{descripcion}</p>
        <nav className="pagina-error-acciones" aria-label="Opciones para continuar">
          {acciones.map(({ destino, texto, principal }) => (
            <Link key={destino} className={principal ? 'pagina-error-principal' : 'pagina-error-secundario'} to={destino}>
              {texto}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
