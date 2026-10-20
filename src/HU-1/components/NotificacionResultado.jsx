export default function NotificacionResultado({ notificacion, onCerrar }) {
  if (!notificacion) return null
  const esError = notificacion.tipo === 'error'

  return (
    <div className={`registro-notificacion registro-notificacion--${notificacion.tipo}`} role={esError ? 'alert' : 'status'}>
      <span className="registro-notificacion-icono" aria-hidden="true">{esError ? '!' : '✓'}</span>
      <div>
        <p className="registro-notificacion-titulo">{notificacion.titulo}</p>
        <p className="registro-notificacion-detalle">{notificacion.detalle}</p>
      </div>
      <button type="button" aria-label="Cerrar notificación" onClick={onCerrar}>×</button>
    </div>
  )
}
