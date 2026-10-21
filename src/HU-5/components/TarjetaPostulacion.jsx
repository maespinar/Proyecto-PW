import { Link } from 'react-router-dom'
import BadgesEstado from './BadgesEstado'
import { formatearMoneda } from '../utils/formateadores'

export default function TarjetaPostulacion({ postulacion, onSolicitarRetiro }) {
  const {
    id,
    puesto,
    empresa,
    empresaSiglas,
    modalidad,
    jornada,
    distrito,
    subvencion,
    fechaPostulacion,
    fechaActualizacion,
    estado,
  } = postulacion

  const textoFechaMeta = () => {
    if (estado === 'recibida') {
      return `Postulaste el ${fechaPostulacion} · Sin cambios desde entonces`
    }
    if (estado === 'en_revision') {
      return `Postulaste el ${fechaPostulacion} · En revisión desde el ${fechaActualizacion}`
    }
    if (estado === 'aceptada') {
      return `Postulaste el ${fechaPostulacion} · Aceptada el ${fechaActualizacion}`
    }
    if (estado === 'descartada') {
      return `Postulaste el ${fechaPostulacion} · Descartada el ${fechaActualizacion}`
    }
    if (estado === 'retirada') {
      return `Postulaste el ${fechaPostulacion} · Retirada por ti el ${fechaActualizacion}`
    }
    return `Postulaste el ${fechaPostulacion}`
  }

  const renderAccionSecundaria = () => {
    if (estado === 'recibida' || estado === 'en_revision') {
      return (
        <button
          type="button"
          className="hu5-btn-link hu5-btn-retirar-link"
          onClick={() => onSolicitarRetiro(postulacion)}
        >
          Retirar postulación
        </button>
      )
    }
    if (estado === 'aceptada') {
      return (
        <Link to={`/postulaciones/${id}`} className="hu5-btn-link hu5-btn-link-secundario">
          Ver siguientes pasos
        </Link>
      )
    }
    if (estado === 'descartada') {
      return (
        <Link to="/" className="hu5-btn-link hu5-btn-link-secundario">
          Ver convocatorias similares
        </Link>
      )
    }
    if (estado === 'retirada') {
      return (
        <Link to="/" className="hu5-btn-link hu5-btn-link-secundario">
          Ver la convocatoria
        </Link>
      )
    }
    return null
  }

  return (
    <article className="hu5-card-postulacion">
      <div className="hu5-card-left">
        <div className="hu5-avatar-empresa" aria-label={`Logo de ${empresa}`}>
          {empresaSiglas || 'EM'}
        </div>
        <div className="hu5-info-postulacion">
          <h3 className="hu5-puesto-titulo">
            <Link to={`/postulaciones/${id}`}>{puesto}</Link>
          </h3>
          <div className="hu5-datos-principales">
            {empresa} · {modalidad} · {jornada} · {distrito} ·{' '}
            <span className="monto">{formatearMoneda(subvencion)}</span>
          </div>
          <div className="hu5-meta-fechas">{textoFechaMeta()}</div>
        </div>
      </div>

      <div className="hu5-card-badge-col">
        <BadgesEstado estado={estado} />
      </div>

      <div className="hu5-card-actions-col">
        <Link to={`/postulaciones/${id}`} className="hu5-btn-link hu5-btn-link-principal">
          Ver detalle
        </Link>
        {renderAccionSecundaria()}
      </div>
    </article>
  )
}
