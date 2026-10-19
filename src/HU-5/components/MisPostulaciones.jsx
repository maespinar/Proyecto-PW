import { useState } from 'react'
import './MisPostulaciones.css'
import StatusBadge from './StatusBadge'
import { POSTULACIONES_ESTUDIANTE_INICIALES } from '../data/mockData'

function MisPostulaciones({
  postulaciones = POSTULACIONES_ESTUDIANTE_INICIALES,
  onVerDetalle,
  onVerConvocatorias,
  onRetirarPostulacion,
}) {
  const [filtroEstado, setFiltroEstado] = useState('Todas')
  const [postulacionARetirar, setPostulacionARetirar] = useState(null)
  const [notificacion, setNotificacion] = useState('')

  // Calcular contadores por estado
  const countTodas = postulaciones.length
  const countRecibidas = postulaciones.filter((p) => p.estado.toLowerCase() === 'recibida').length
  const countEnRevision = postulaciones.filter((p) => p.estado.toLowerCase() === 'en revisión').length
  const countAceptadas = postulaciones.filter((p) => p.estado.toLowerCase() === 'aceptada').length
  const countDescartadas = postulaciones.filter((p) => p.estado.toLowerCase() === 'descartada').length
  const countRetiradas = postulaciones.filter((p) => p.estado.toLowerCase() === 'retirada').length

  // Filtrar lista
  const postulacionesFiltradas = postulaciones.filter((p) => {
    if (filtroEstado === 'Todas') return true
    return p.estado.toLowerCase() === filtroEstado.toLowerCase()
  })

  const handleConfirmarRetiro = () => {
    if (postulacionARetirar) {
      if (onRetirarPostulacion) {
        onRetirarPostulacion(postulacionARetirar.id)
      }
      setNotificacion(`Se retiró la postulación para «${postulacionARetirar.puesto}» con éxito.`)
      setPostulacionARetirar(null)
      setTimeout(() => setNotificacion(''), 4500)
    }
  }

  return (
    <div className="mis-postulaciones-page">
      <div className="mis-postulaciones-container">
        
        {/* Notificación de retroalimentación */}
        {notificacion && (
          <div className="alerta-notificacion" role="status">
            <span>✓ {notificacion}</span>
            <button type="button" onClick={() => setNotificacion('')} aria-label="Cerrar notificación">✕</button>
          </div>
        )}

        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Miga de pan">
          <span className="breadcrumb-item" onClick={onVerConvocatorias}>Inicio</span>
          <span className="breadcrumb-separator">·</span>
          <span className="breadcrumb-current">Mis postulaciones</span>
        </nav>

        {/* Encabezado */}
        <div className="mis-post-header">
          <h1 className="mis-post-titulo">Mis postulaciones</h1>
          <p className="mis-post-meta">
            {countTodas} postulaciones · última actualización 06/09/2026
          </p>
        </div>

        {/* Pestañas de Filtro por estado */}
        <div className="filtros-estado-bar" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={filtroEstado === 'Todas'}
            className={`btn-filtro-tab ${filtroEstado === 'Todas' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('Todas')}
          >
            Todas · {countTodas}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filtroEstado === 'Recibida'}
            className={`btn-filtro-tab ${filtroEstado === 'Recibida' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('Recibida')}
          >
            Recibidas · {countRecibidas}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filtroEstado === 'En revisión'}
            className={`btn-filtro-tab ${filtroEstado === 'En revisión' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('En revisión')}
          >
            En revisión · {countEnRevision}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filtroEstado === 'Aceptada'}
            className={`btn-filtro-tab ${filtroEstado === 'Aceptada' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('Aceptada')}
          >
            Aceptadas · {countAceptadas}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filtroEstado === 'Descartada'}
            className={`btn-filtro-tab ${filtroEstado === 'Descartada' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('Descartada')}
          >
            Descartadas · {countDescartadas}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filtroEstado === 'Retirada'}
            className={`btn-filtro-tab ${filtroEstado === 'Retirada' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('Retirada')}
          >
            Retiradas · {countRetiradas}
          </button>
        </div>

        {/* Lista de postulaciones */}
        {postulacionesFiltradas.length > 0 ? (
          <div className="postulaciones-list">
            {postulacionesFiltradas.map((post) => (
              <article key={post.id} className="postulacion-card">
                <div className="post-card-left">
                  <div className="post-avatar">{post.iniciales}</div>
                  <div className="post-content">
                    <h2 className="post-puesto">{post.puesto}</h2>
                    <p className="post-empresa-condiciones">
                      {post.empresa} · {post.descripcion}
                    </p>
                    <p className="post-historial-fecha">
                      {post.detalleFecha}
                    </p>
                  </div>
                </div>

                <div className="post-card-right">
                  <div className="post-badge-container">
                    <StatusBadge estado={post.estado} />
                  </div>
                  
                  <div className="post-card-actions">
                    <button
                      type="button"
                      className="btn-ver-detalle"
                      onClick={() => onVerDetalle && onVerDetalle(post)}
                    >
                      Ver detalle
                    </button>

                    {/* Acciones contextuales por estado */}
                    {(post.estado.toLowerCase() === 'recibida' || post.estado.toLowerCase() === 'en revisión') && (
                      <button
                        type="button"
                        className="btn-link-retirar"
                        onClick={() => setPostulacionARetirar(post)}
                      >
                        Retirar postulación
                      </button>
                    )}

                    {post.estado.toLowerCase() === 'aceptada' && (
                      <button
                        type="button"
                        className="btn-link-secundario"
                        onClick={() => alert('Próximos pasos: La empresa se comunicará vía correo para coordinar la firma del convenio de prácticas.')}
                      >
                        Ver siguientes pasos
                      </button>
                    )}

                    {post.estado.toLowerCase() === 'descartada' && (
                      <button
                        type="button"
                        className="btn-link-secundario"
                        onClick={onVerConvocatorias}
                      >
                        Ver convocatorias similares
                      </button>
                    )}

                    {post.estado.toLowerCase() === 'retirada' && (
                      <button
                        type="button"
                        className="btn-link-secundario"
                        onClick={() => onVerDetalle && onVerDetalle(post)}
                      >
                        Ver la convocatoria
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Estado vacío (Pieza suelta 5.3) */
          <div className="empty-postulaciones-card">
            <div className="empty-icon-box">▤</div>
            <h2 className="empty-title">Aún no postulas a ninguna convocatoria</h2>
            <p className="empty-desc">
              Hay 38 convocatorias vigentes para Ingeniería de Sistemas. Aquí verás el estado de cada postulación que envíes.
            </p>
            <button
              type="button"
              className="btn-ver-convocatorias-carrera"
              onClick={onVerConvocatorias}
            >
              Ver convocatorias de mi carrera
            </button>
          </div>
        )}

        {/* Modal de confirmación para retirar postulación */}
        {postulacionARetirar && (
          <div className="modal-backdrop-overlay" role="dialog" aria-modal="true">
            <div className="modal-confirm-card">
              <h2 className="confirm-title">¿Deseas retirar tu postulación?</h2>
              <p className="confirm-message">
                Estás a punto de retirar tu postulación a <strong>«{postulacionARetirar.puesto}»</strong> en {postulacionARetirar.empresa}.
              </p>
              <div className="confirm-warning">
                ! Esta acción no se puede deshacer. No podrás volver a postular a este puesto.
              </div>
              <div className="confirm-actions">
                <button
                  type="button"
                  className="btn-secundario"
                  onClick={() => setPostulacionARetirar(null)}
                >
                  Mantener postulación
                </button>
                <button
                  type="button"
                  className="btn-danger-confirm"
                  onClick={handleConfirmarRetiro}
                >
                  Confirmar retiro
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default MisPostulaciones
