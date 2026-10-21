import '../styles/Comun.css'

function Notificacion({ notificacion, onCerrar }) {
  if (!notificacion) {
    return null
  }

  return (
    <div className="notificacion" role="status">
      <span className="notificacion-icono">✓</span>
      <div className="notificacion-texto">
        <p className="notificacion-titulo">{notificacion.titulo}</p>
        {notificacion.detalle && <p className="notificacion-detalle">{notificacion.detalle}</p>}
      </div>
      <button type="button" className="notificacion-cerrar" aria-label="Cerrar" onClick={onCerrar}>
        ×
      </button>
    </div>
  )
}

export default Notificacion
