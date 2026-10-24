import { Link } from 'react-router-dom'
import { calcularCompletitud } from '../utils/completitud'

export default function BarraCompletitud({ perfil }) {
  const { porcentaje, textoFaltantes, rutaSiguiente, completo } = calcularCompletitud(perfil)

  return (
    <div className="barra-completitud mb-4">
      <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2">
        <strong>Perfil completo al {porcentaje} %</strong>
        <span className="small text-muted">
          {completo ? 'Tu perfil está completo.' : `Falta agregar ${textoFaltantes}`}
        </span>
      </div>
      <div
        className="progress mt-2"
        role="progressbar"
        aria-label="Completitud del perfil"
        aria-valuenow={porcentaje}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className="progress-bar" style={{ width: `${porcentaje}%` }} />
      </div>
      {!completo && (
        <div className="text-end mt-2">
          <Link to={rutaSiguiente} className="fw-semibold">Completar ahora →</Link>
        </div>
      )}
    </div>
  )
}
