import { useState } from 'react'

export default function ModalRetirarPostulacion({
  postulacion,
  onConfirmar,
  onCerrar,
}) {
  const [procesando, setProcesando] = useState(false)

  if (!postulacion) return null

  const handleRetirar = async () => {
    setProcesando(true)
    try {
      await onConfirmar(postulacion.id)
      onCerrar()
    } catch {
      // Error manejado en contexto
    } finally {
      setProcesando(false)
    }
  }

  return (
    <div
      className="hu5-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-retirar-titulo"
    >
      <div className="hu5-modal-dialog">
        <div className="hu5-modal-header">
          <h4 id="modal-retirar-titulo" className="hu5-modal-title">
            ¿Retirar tu postulación?
          </h4>
          <button
            type="button"
            className="hu5-modal-close-btn"
            onClick={onCerrar}
            aria-label="Cerrar modal"
            disabled={procesando}
          >
            &times;
          </button>
        </div>

        <div className="hu5-modal-body">
          <p style={{ fontSize: '0.925rem', color: '#334155', marginBottom: '1rem' }}>
            Estás a punto de retirar tu postulación para{' '}
            <strong>{postulacion.puesto}</strong> en{' '}
            <strong>{postulacion.empresa}</strong>.
          </p>

          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '6px',
              padding: '0.85rem 1rem',
              fontSize: '0.85rem',
              color: '#991b1b',
            }}
          >
            ⚠️ <strong>Importante:</strong> Puedes retirarte mientras la
            convocatoria siga vigente. No podrás volver a postular a este
            puesto.
          </div>
        </div>

        <div className="hu5-modal-footer">
          <button
            type="button"
            className="hu5-btn-outline"
            onClick={onCerrar}
            disabled={procesando}
          >
            Cancelar
          </button>
          <button
            type="button"
            style={{
              backgroundColor: '#dc2626',
              borderColor: '#dc2626',
              color: '#fff',
            }}
            className="hu5-btn-primary"
            onClick={handleRetirar}
            disabled={procesando}
          >
            {procesando ? 'Retirando...' : 'Sí, retirar postulación'}
          </button>
        </div>
      </div>
    </div>
  )
}
