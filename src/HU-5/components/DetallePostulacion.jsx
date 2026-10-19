import { useState } from 'react'
import './DetallePostulacion.css'
import StatusBadge from './StatusBadge'

function DetallePostulacion({
  postulacion,
  onBack,
  onVerConvocatoria,
  onRetirarPostulacion,
}) {
  const [modalRetiroAbierto, setModalRetiroAbierto] = useState(false)
  const [estadoActual, setEstadoActual] = useState(postulacion?.estado || 'En revisión')
  const [notificacion, setNotificacion] = useState('')

  const handleConfirmarRetiro = () => {
    setEstadoActual('Retirada')
    setModalRetiroAbierto(false)
    if (onRetirarPostulacion && postulacion?.id) {
      onRetirarPostulacion(postulacion.id)
    }
    setNotificacion('Tu postulación ha sido retirada con éxito.')
  }

  const puesto = postulacion?.puesto || 'Practicante de Desarrollo de Software'
  const empresa = postulacion?.empresa || 'Consultora Andes Perú'
  const iniciales = postulacion?.iniciales || 'AP'
  const subvencion = postulacion?.subvencion || 'S/ 1,850.00'
  const modalidad = postulacion?.modalidad || 'Híbrido'
  const jornada = postulacion?.jornada || 'Medio tiempo'
  const cierre = postulacion?.cierre || '30/09/2026'

  return (
    <div className="detalle-postulacion-page">
      <div className="detalle-container">

        {/* Notificación de retroalimentación */}
        {notificacion && (
          <div className="alerta-notificacion" role="status">
            <span>✓ {notificacion}</span>
            <button type="button" onClick={() => setNotificacion('')}>✕</button>
          </div>
        )}

        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Miga de pan">
          <button type="button" className="breadcrumb-btn-link" onClick={onBack}>
            Mis postulaciones
          </button>
          <span className="breadcrumb-separator">·</span>
          <span className="breadcrumb-current">{puesto}</span>
        </nav>

        {/* Layout de 2 columnas */}
        <div className="detalle-grid">
          
          {/* Columna Izquierda (Principal) */}
          <div className="detalle-col-main">
            
            {/* Tarjeta: Estado de la postulación con Línea de tiempo */}
            <section className="detalle-card" aria-labelledby="estado-postulacion-titulo">
              <div className="detalle-card-header">
                <h2 id="estado-postulacion-titulo" className="detalle-card-title">Estado de la postulación</h2>
                <StatusBadge estado={estadoActual} />
              </div>

              <div className="timeline-container">
                {/* Paso 1: Recibida */}
                <div className="timeline-item completed">
                  <div className="timeline-marker marker-info"></div>
                  <div className="timeline-content">
                    <h3 className="timeline-step-title">Recibida</h3>
                    <p className="timeline-step-desc">
                      20/08/2026 · 09:12 — la empresa recibió tu perfil y tu mensaje.
                    </p>
                  </div>
                </div>

                {/* Paso 2: En revisión o Retirada */}
                {estadoActual.toLowerCase() === 'retirada' ? (
                  <div className="timeline-item completed">
                    <div className="timeline-marker marker-neutral"></div>
                    <div className="timeline-content">
                      <h3 className="timeline-step-title">Retirada</h3>
                      <p className="timeline-step-desc">
                        Has retirado esta postulación de forma voluntaria.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className={`timeline-item ${estadoActual.toLowerCase() === 'recibida' ? 'pending' : 'completed'}`}>
                    <div className={`timeline-marker ${estadoActual.toLowerCase() === 'recibida' ? 'marker-hollow' : 'marker-warning'}`}></div>
                    <div className="timeline-content">
                      <h3 className="timeline-step-title">En revisión</h3>
                      <p className="timeline-step-desc">
                        28/08/2026 · 16:40 — el equipo de selección está evaluando tu perfil.
                      </p>
                    </div>
                  </div>
                )}

                {/* Paso 3: Resultado */}
                {estadoActual.toLowerCase() !== 'retirada' && (
                  <div className="timeline-item pending">
                    <div className="timeline-marker marker-hollow"></div>
                    <div className="timeline-content">
                      <h3 className="timeline-step-title">Resultado</h3>
                      <p className="timeline-step-desc">
                        Pendiente — te avisaremos por correo cuando la empresa decida.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Tarjeta: Mensaje que enviaste */}
            <section className="detalle-card" aria-labelledby="mensaje-enviado-titulo">
              <h2 id="mensaje-enviado-titulo" className="detalle-card-title">Mensaje que enviaste</h2>
              <p className="mensaje-texto">
                {postulacion?.mensaje ||
                  'Me interesa el módulo de reportes que mencionan en la convocatoria: hice algo parecido con SQL y React en un proyecto del curso de Bases de Datos, donde reduje en 40 % el tiempo de consulta del reporte de ventas.'}
              </p>
              <p className="footnote-text">
                Enviado el 20/08/2026. El mensaje no se puede editar después de postular.
              </p>
            </section>

            {/* Tarjeta: Perfil enviado */}
            <section className="detalle-card" aria-labelledby="perfil-enviado-titulo">
              <h2 id="perfil-enviado-titulo" className="detalle-card-title">Perfil enviado</h2>
              <p className="perfil-texto">
                {postulacion?.perfilEnviado ||
                  'Ingeniería de Sistemas · Octavo ciclo · 9 habilidades · 3 experiencias · 2 enlaces externos'}
              </p>
              <p className="footnote-text">
                La empresa ve la versión de tu perfil al momento de postular.
              </p>
            </section>

          </div>

          {/* Columna Derecha (Lateral) */}
          <aside className="detalle-col-side">
            
            {/* Tarjeta: Resumen de la empresa y puesto */}
            <div className="detalle-card side-convo-card">
              <div className="side-convo-header">
                <div className="side-avatar">{iniciales}</div>
                <div>
                  <h3 className="side-empresa-nombre">{empresa}</h3>
                  <p className="side-empresa-sector">Consultoría · San Isidro</p>
                </div>
              </div>

              <div className="side-convo-details">
                <div className="detail-row">
                  <span className="detail-label">Subvención</span>
                  <span className="detail-value bold">{subvencion}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Modalidad</span>
                  <span className="detail-value">{modalidad}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Jornada</span>
                  <span className="detail-value">{jornada}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Cierre</span>
                  <span className="detail-value">{cierre}</span>
                </div>
              </div>

              <button
                type="button"
                className="btn-ver-convocatoria-side"
                onClick={onVerConvocatoria}
              >
                Ver la convocatoria
              </button>
            </div>

            {/* Tarjeta: Retirar mi postulación */}
            {estadoActual.toLowerCase() !== 'retirada' ? (
              <div className="detalle-card side-retirar-card">
                <h3 className="side-retirar-title">Retirar mi postulación</h3>
                <p className="side-retirar-desc">
                  Puedes retirarte mientras la convocatoria siga vigente. No podrás volver a postular a este puesto.
                </p>
                <button
                  type="button"
                  className="btn-retirar-action"
                  onClick={() => setModalRetiroAbierto(true)}
                >
                  Retirar postulación
                </button>
              </div>
            ) : (
              <div className="detalle-card side-retirada-estado">
                <h3 className="side-retirar-title">Postulación retirada</h3>
                <p className="side-retirar-desc">
                  Has retirado esta postulación. Ya no se encuentra en evaluación por la empresa.
                </p>
              </div>
            )}

          </aside>

        </div>

        {/* Modal de confirmación de retiro (Pieza suelta 5.4) */}
        {modalRetiroAbierto && (
          <div className="modal-backdrop-overlay" role="dialog" aria-modal="true">
            <div className="modal-confirm-card">
              <h2 className="confirm-title">¿Deseas retirar tu postulación?</h2>
              <p className="confirm-message">
                Estás a punto de retirar tu postulación a <strong>«{puesto}»</strong> en {empresa}.
              </p>
              <div className="confirm-warning">
                ! Esta acción no se puede deshacer. Las postulaciones retiradas ya no serán evaluadas.
              </div>
              <div className="confirm-actions">
                <button
                  type="button"
                  className="btn-secundario"
                  onClick={() => setModalRetiroAbierto(false)}
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

export default DetallePostulacion
