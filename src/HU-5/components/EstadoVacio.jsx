import { Link } from 'react-router-dom'

export default function EstadoVacio({
  titulo = 'Aún no postulas a ninguna convocatoria',
  descripcion = 'Explora las convocatorias de tu carrera. Aquí verás el estado de las postulaciones que registres en esta demostración.',
  botonTexto = 'Ver convocatorias de mi carrera',
  botonUrl = '/convocatorias',
  onAccion,
}) {
  return (
    <div className="hu5-empty-state">
      <div className="hu5-empty-icon-wrap" aria-hidden="true">
        {/* Ícono de carpeta / archivo estilizado */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
          <path d="M8 13h8" />
        </svg>
      </div>
      <h3 className="hu5-empty-title">{titulo}</h3>
      <p className="hu5-empty-desc">{descripcion}</p>

      {onAccion ? (
        <button
          type="button"
          className="hu5-btn-primary"
          onClick={onAccion}
        >
          {botonTexto}
        </button>
      ) : (
        <Link to={botonUrl} className="hu5-btn-primary">
          {botonTexto}
        </Link>
      )}
    </div>
  )
}
