import { useState } from 'react'
import './ModalPostulacion.css'
import { CANDIDATO_PRINCIPAL, CONVOCATORIA_PRINCIPAL } from '../data/mockData'

function ModalPostulacion({
  convocatoria = CONVOCATORIA_PRINCIPAL,
  candidato = CANDIDATO_PRINCIPAL,
  isOpen = true,
  onClose,
  onSubmit,
  onEditProfile,
}) {
  const [mensaje, setMensaje] = useState(
    'Me interesa el módulo de reportes que mencionan en la convocatoria: hice algo parecido con SQL y React en un proyecto del curso de Bases de Datos.'
  )
  const [mostrarAvisoIncompleto, setMostrarAvisoIncompleto] = useState(false)
  const [vistaPiezaSuelta, setVistaPiezaSuelta] = useState('modal') // 'modal' | 'aviso' | 'sin-guardadas' | 'sin-postulaciones'

  const MAX_CARACTERES = 500

  const handleTextChange = (e) => {
    if (e.target.value.length <= MAX_CARACTERES) {
      setMensaje(e.target.value)
    }
  }

  const handleEnviar = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({
        convocatoria,
        mensaje,
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-backdrop-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-postulacion-titulo">
      <div className="modal-postulacion-container">
        
        {/* Selector de variantes / piezas sueltas de la página 32 */}
        <div className="piezas-sueltas-toolbar">
          <span className="toolbar-label">Página 32 (Piezas sueltas):</span>
          <button
            type="button"
            className={`btn-toolbar ${vistaPiezaSuelta === 'modal' ? 'active' : ''}`}
            onClick={() => setVistaPiezaSuelta('modal')}
          >
            5.1 Modal normal
          </button>
          <button
            type="button"
            className={`btn-toolbar ${vistaPiezaSuelta === 'aviso' ? 'active' : ''}`}
            onClick={() => setVistaPiezaSuelta('aviso')}
          >
            Aviso perfil incompleto
          </button>
          <button
            type="button"
            className={`btn-toolbar ${vistaPiezaSuelta === 'sin-guardadas' ? 'active' : ''}`}
            onClick={() => setVistaPiezaSuelta('sin-guardadas')}
          >
            4.3 Sin guardadas
          </button>
          <button
            type="button"
            className={`btn-toolbar ${vistaPiezaSuelta === 'sin-postulaciones' ? 'active' : ''}`}
            onClick={() => setVistaPiezaSuelta('sin-postulaciones')}
          >
            5.3 Sin postulaciones
          </button>
        </div>

        {/* PIEZA SUELTA 1: MODAL DE POSTULACIÓN */}
        {vistaPiezaSuelta === 'modal' && (
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <h2 id="modal-postulacion-titulo" className="modal-title">Confirmar postulación</h2>
                <p className="modal-subtitle">Revisa lo que enviarás a la empresa.</p>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={onClose}
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            {/* Aviso toggle opcional de perfil incompleto */}
            {mostrarAvisoIncompleto && (
              <div className="aviso-incompleto-box">
                <div className="aviso-incompleto-text">
                  <span className="aviso-icon">!</span>
                  <span>
                    Tu perfil está completo al 42 %. Puedes postular igual, pero las empresas priorizan perfiles con habilidades y experiencia.
                  </span>
                </div>
                <div className="aviso-incompleto-actions">
                  <button type="button" className="btn-secundario" onClick={onEditProfile}>
                    Completar mi perfil
                  </button>
                  <button type="button" className="btn-acento" onClick={handleEnviar}>
                    Postular así
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleEnviar}>
              {/* Tarjeta de resumen de convocatoria */}
              <div className="modal-convo-card">
                <div className="modal-convo-avatar">{convocatoria.iniciales || 'AP'}</div>
                <div className="modal-convo-info">
                  <h3 className="modal-convo-title">{convocatoria.puesto}</h3>
                  <p className="modal-convo-meta">
                    {convocatoria.empresa} · {convocatoria.modalidad} · {convocatoria.distrito || 'San Isidro'} · cierra {convocatoria.fechaCierre || '30/09/2026'}
                  </p>
                </div>
                <div className="modal-convo-salario">
                  {convocatoria.subvencion}
                </div>
              </div>

              {/* Sección de perfil a enviar */}
              <div className="modal-seccion">
                <div className="modal-seccion-header">
                  <span className="seccion-label">PERFIL QUE SE ENVIARÁ</span>
                  <button type="button" className="link-action" onClick={onEditProfile}>
                    Editar mi perfil
                  </button>
                </div>
                <div className="modal-perfil-card">
                  <div className="perfil-avatar-placeholder" aria-label="Foto de perfil">
                    <span className="avatar-icon-silueta">👤</span>
                  </div>
                  <div className="perfil-datos">
                    <p className="perfil-nombre">{candidato.nombre}</p>
                    <p className="perfil-meta">
                      {candidato.carrera} · {candidato.ciclo} · {candidato.habilidades.length} habilidades · {candidato.experiencias?.length || 3} experiencias
                    </p>
                  </div>
                </div>
              </div>

              {/* Mensaje al reclutador */}
              <div className="modal-seccion">
                <label htmlFor="mensaje-reclutador" className="seccion-label">
                  MENSAJE AL RECLUTADOR · OPCIONAL
                </label>
                <textarea
                  id="mensaje-reclutador"
                  className="modal-textarea"
                  rows={4}
                  value={mensaje}
                  onChange={handleTextChange}
                  placeholder="Cuenta en una o dos frases por qué te interesa el puesto."
                ></textarea>
                <div className="textarea-footer">
                  <span className="textarea-help">Cuenta en una o dos frases por qué te interesa el puesto.</span>
                  <span className="textarea-count">{mensaje.length} / {MAX_CARACTERES}</span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="btn-toggle-aviso"
                  onClick={() => setMostrarAvisoIncompleto(!mostrarAvisoIncompleto)}
                  title="Simular variante de perfil incompleto"
                >
                  {mostrarAvisoIncompleto ? 'Ocultar aviso 42%' : 'Probar aviso 42%'}
                </button>
                <div className="actions-right">
                  <button type="button" className="btn-secundario" onClick={onClose}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-acento">
                    Enviar postulación
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* PIEZA SUELTA 2: AVISO DE PERFIL INCOMPLETO (AISLADO) */}
        {vistaPiezaSuelta === 'aviso' && (
          <div className="pieza-suelta-wrapper">
            <h4 className="pieza-suelta-titulo">PIEZA SUELTA · AVISO DE PERFIL INCOMPLETO</h4>
            <div className="aviso-incompleto-box standalone">
              <div className="aviso-incompleto-text">
                <span className="aviso-icon">!</span>
                <span>
                  Tu perfil está completo al 42 %. Puedes postular igual, pero las empresas priorizan perfiles con habilidades y experiencia.
                </span>
              </div>
              <div className="aviso-incompleto-actions">
                <button type="button" className="btn-secundario" onClick={onEditProfile}>
                  Completar mi perfil
                </button>
                <button type="button" className="btn-acento" onClick={handleEnviar}>
                  Postular así
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PIEZA SUELTA 3: 4.3 SIN CONVOCATORIAS GUARDADAS */}
        {vistaPiezaSuelta === 'sin-guardadas' && (
          <div className="pieza-suelta-wrapper">
            <h4 className="pieza-suelta-titulo">PIEZA SUELTA · 4.3 SIN CONVOCATORIAS GUARDADAS</h4>
            <div className="empty-state-card">
              <div className="empty-state-icon">☆</div>
              <h3 className="empty-state-title">No has guardado convocatorias</h3>
              <p className="empty-state-desc">
                Guarda las que te interesen desde el catálogo y compáralas antes de postular.
              </p>
              <button type="button" className="btn-primario" onClick={onClose}>
                Ir al catálogo
              </button>
            </div>
          </div>
        )}

        {/* PIEZA SUELTA 4: 5.3 SIN POSTULACIONES */}
        {vistaPiezaSuelta === 'sin-postulaciones' && (
          <div className="pieza-suelta-wrapper">
            <h4 className="pieza-suelta-titulo">PIEZA SUELTA · 5.3 SIN POSTULACIONES</h4>
            <div className="empty-state-card">
              <div className="empty-state-icon">▤</div>
              <h3 className="empty-state-title">Aún no postulas a ninguna convocatoria</h3>
              <p className="empty-state-desc">
                Hay 38 convocatorias vigentes para Ingeniería de Sistemas. Aquí verás el estado de cada postulación que envíes.
              </p>
              <button type="button" className="btn-primario" onClick={onClose}>
                Ver convocatorias de mi carrera
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ModalPostulacion
