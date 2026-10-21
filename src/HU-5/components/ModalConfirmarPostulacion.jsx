import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePostulaciones } from '../context/usePostulaciones'
import { formatearMoneda } from '../utils/formateadores'
import AvisoPerfilIncompleto from './AvisoPerfilIncompleto'

export default function ModalConfirmarPostulacion({
  convocatoria,
  onCerrar,
}) {
  const navigate = useNavigate()
  const { postular, postulaciones } = usePostulaciones()

  const [mensaje, setMensaje] = useState(
    'Me interesa el módulo de reportes que mencionan en la convocatoria: hice algo parecido con SQL y React en un proyecto del curso de Bases de Datos.'
  )
  const [errorValidacion, setErrorValidacion] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [mostrarAvisoIncompleto, setMostrarAvisoIncompleto] = useState(true)

  if (!convocatoria) return null

  // Verificar si ya postuló
  const yaPostulo = postulaciones.some(
    (p) => p.convocatoriaId === convocatoria.id && p.estado !== 'retirada'
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorValidacion('')

    if (yaPostulo) {
      setErrorValidacion(
        'Ya te has postulado a esta convocatoria. No se admite postular dos veces.'
      )
      return
    }

    if (mensaje.length > 500) {
      setErrorValidacion('El mensaje no puede superar los 500 caracteres.')
      return
    }

    setEnviando(true)
    try {
      await postular({
        convocatoriaId: convocatoria.id,
        puesto: convocatoria.puesto,
        empresa: convocatoria.empresa,
        empresaSiglas: convocatoria.empresaSiglas,
        rubro: convocatoria.rubro,
        modalidad: convocatoria.modalidad,
        jornada: convocatoria.jornada,
        distrito: convocatoria.distrito,
        subvencion: convocatoria.subvencion,
        fechaCierre: convocatoria.fechaCierre,
        mensaje,
      })
      onCerrar()
      navigate('/postulaciones/confirmacion')
    } catch (err) {
      setErrorValidacion(err.message || 'Error al enviar la postulación.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div
      className="hu5-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-confirmar-titulo"
    >
      <div className="hu5-modal-dialog" style={{ maxWidth: '620px' }}>
        <div className="hu5-modal-header">
          <div>
            <h4 id="modal-confirmar-titulo" className="hu5-modal-title">
              Confirmar postulación
            </h4>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Revisa lo que enviarás a la empresa.
            </span>
          </div>
          <button
            type="button"
            className="hu5-modal-close-btn"
            onClick={onCerrar}
            disabled={enviando}
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="hu5-modal-body">
            {mostrarAvisoIncompleto && (
              <AvisoPerfilIncompleto
                porcentaje={42}
                onPostularAsi={() => setMostrarAvisoIncompleto(false)}
              />
            )}

            {errorValidacion && (
              <div
                className="alert alert-danger py-2 px-3 mb-3"
                style={{ fontSize: '0.85rem' }}
                role="alert"
              >
                {errorValidacion}
              </div>
            )}

            {/* Resumen de la convocatoria */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '0.9rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                <div
                  className="hu5-avatar-empresa"
                  style={{ width: '38px', height: '38px', fontSize: '0.85rem' }}
                >
                  {convocatoria.empresaSiglas || 'EM'}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    {convocatoria.puesto}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {convocatoria.empresa} · {convocatoria.modalidad} ·{' '}
                    {convocatoria.distrito} · cierra {convocatoria.fechaCierre}
                  </div>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                {formatearMoneda(convocatoria.subvencion)}
              </div>
            </div>

            {/* Resumen del perfil que se enviará */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.45rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: '#64748b',
                    textTransform: 'uppercase',
                  }}
                >
                  Perfil que se enviará
                </span>
                <Link
                  to="/perfil/editar"
                  style={{ fontSize: '0.8rem', color: '#123a5f', fontWeight: 600 }}
                  onClick={onCerrar}
                >
                  Editar mi perfil
                </Link>
              </div>

              <div
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '8px',
                    background:
                      'repeating-linear-gradient(135deg, #e2e8f0 0 6px, #cbd5e1 6px 12px)',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.925rem' }}>
                    Mariana Lucía Quispe Ramírez
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Ingeniería de Sistemas · Octavo ciclo · 9 habilidades · 3
                    experiencias
                  </div>
                </div>
              </div>
            </div>

            {/* Mensaje al reclutador (opcional) */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.45rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: '#64748b',
                    textTransform: 'uppercase',
                  }}
                >
                  Mensaje al reclutador · Opcional
                </span>
              </div>

              <textarea
                className="form-control"
                rows="4"
                maxLength={500}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Cuenta en una o dos frases por qué te interesa el puesto..."
                style={{
                  fontSize: '0.875rem',
                  resize: 'vertical',
                  borderColor: '#cbd5e1',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '0.35rem',
                  fontSize: '0.775rem',
                  color: '#64748b',
                }}
              >
                <span>Cuenta en una o dos frases por qué te interesa el puesto.</span>
                <span style={{ fontWeight: 600 }}>{mensaje.length} / 500</span>
              </div>
            </div>
          </div>

          <div className="hu5-modal-footer">
            <button
              type="button"
              className="hu5-btn-outline"
              onClick={onCerrar}
              disabled={enviando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="hu5-btn-accent"
              disabled={enviando || yaPostulo}
            >
              {enviando ? 'Enviando postulación...' : 'Enviar postulación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
