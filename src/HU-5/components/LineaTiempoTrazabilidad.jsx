export default function LineaTiempoTrazabilidad({
  trazabilidad = [],
  estadoActual,
}) {
  return (
    <div className="hu5-timeline">
      {trazabilidad.map((paso, idx) => {
        const esPendiente =
          paso.fecha?.toLowerCase().includes('pendiente') || paso.estado === 'resultado'

        let estadoClase = 'completed'
        if (paso.estado === 'retirada') {
          estadoClase = 'retirada'
        } else if (paso.estado === 'aceptada') {
          estadoClase = 'aceptada'
        } else if (paso.estado === estadoActual && !esPendiente) {
          estadoClase = 'active'
        } else if (esPendiente) {
          estadoClase = 'pending'
        }

        return (
          <div key={idx} className={`hu5-timeline-step ${estadoClase}`}>
            <span className="hu5-timeline-dot" aria-hidden="true" />
            <div className="hu5-timeline-header">
              <span className="hu5-timeline-title">{paso.titulo}</span>
            </div>
            <div className="hu5-timeline-meta" style={{ marginBottom: '0.2rem' }}>
              <strong>{paso.fecha}</strong>
              {paso.descripcion && ` — ${paso.descripcion}`}
            </div>
          </div>
        )
      })}
    </div>
  )
}
