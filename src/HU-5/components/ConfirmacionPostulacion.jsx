import { useState } from 'react'
import './ConfirmacionPostulacion.css'
import StatusBadge from './StatusBadge'
import { OTRAS_CONVOCATORIAS } from '../data/mockData'

function ConfirmacionPostulacion({
  convocatoriaNombre = 'Practicante de Desarrollo de Software',
  empresaNombre = 'Consultora Andes Perú',
  fechaEnvio = '07/09/2026 · 10:24',
  onGoToMisPostulaciones,
  onSeguirBuscando,
}) {
  const [convocatoriasSugeridas, setConvocatoriasSugeridas] = useState(OTRAS_CONVOCATORIAS)

  const toggleGuardar = (id) => {
    setConvocatoriasSugeridas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, guardada: !c.guardada } : c))
    )
  }

  return (
    <div className="confirmacion-postulacion-page">
      <main className="confirmacion-main">
        {/* Tarjeta central de éxito */}
        <section className="confirmacion-card" aria-labelledby="confirmacion-titulo">
          <div className="confirmacion-icon-wrapper" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1E7F4D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h1 id="confirmacion-titulo" className="confirmacion-title">Tu postulación fue enviada</h1>
          <p className="confirmacion-desc">
            {empresaNombre} recibió tu perfil y tu mensaje para «{convocatoriaNombre}». Te avisaremos por correo cada vez que el estado cambie.
          </p>

          <div className="confirmacion-resumen-box">
            <div className="resumen-left">
              <h2 className="resumen-puesto">{convocatoriaNombre}</h2>
              <p className="resumen-fecha">Enviada el {fechaEnvio}</p>
            </div>
            <div className="resumen-right">
              <StatusBadge estado="Recibida" />
            </div>
          </div>

          <div className="confirmacion-actions">
            <button
              type="button"
              className="btn-ir-postulaciones"
              onClick={onGoToMisPostulaciones}
            >
              Ir a mis postulaciones
            </button>
            <button
              type="button"
              className="btn-seguir-buscando"
              onClick={onSeguirBuscando}
            >
              Seguir buscando
            </button>
          </div>
        </section>

        {/* Sección de otras convocatorias sugeridas */}
        <section className="sugeridas-section" aria-labelledby="sugeridas-titulo">
          <h2 id="sugeridas-titulo" className="sugeridas-title">Otras convocatorias de tu carrera</h2>

          <div className="sugeridas-grid">
            {convocatoriasSugeridas.map((convo) => (
              <article key={convo.id} className="sugerida-card">
                <div className="sugerida-avatar">{convo.iniciales}</div>
                <div className="sugerida-body">
                  <div className="sugerida-top">
                    <h3 className="sugerida-puesto">{convo.puesto}</h3>
                    <button
                      type="button"
                      className={`btn-guardar-check ${convo.guardada ? 'guardada' : ''}`}
                      onClick={() => toggleGuardar(convo.id)}
                      aria-label={convo.guardada ? 'Quitar de guardadas' : 'Guardar convocatoria'}
                      title={convo.guardada ? 'Quitar de guardadas' : 'Guardar convocatoria'}
                    >
                      <span className="checkbox-icon"></span>
                    </button>
                  </div>
                  <p className="sugerida-empresa">{convo.empresa}</p>
                  <p className="sugerida-carrera">{convo.carrera}</p>
                  <div className="sugerida-bottom">
                    <span className="sugerida-modalidad">{convo.modalidad}</span>
                    <div className="sugerida-salario-cierre">
                      <span className="sugerida-salario">{convo.subvencion}</span>
                      <span className="sugerida-cierre">Cierra {convo.cierre}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default ConfirmacionPostulacion
