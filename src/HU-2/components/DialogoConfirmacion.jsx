import { useEffect, useRef } from 'react'

// Diálogo de confirmación para acciones destructivas.
// Cuando el módulo común del grupo tenga el suyo, se reemplaza este.
export default function DialogoConfirmacion({ titulo, mensaje, textoConfirmar = 'Eliminar', ocupado = false, onConfirmar, onCancelar }) {
  const botonCancelar = useRef(null)

  useEffect(() => {
    botonCancelar.current?.focus()
    const alPresionar = (evento) => {
      if (evento.key === 'Escape') onCancelar()
    }
    document.addEventListener('keydown', alPresionar)
    return () => document.removeEventListener('keydown', alPresionar)
  }, [onCancelar])

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="alertdialog" aria-modal="true" aria-labelledby="dialogo-titulo" onClick={onCancelar}>
        <div className="modal-dialog modal-dialog-centered" onClick={(evento) => evento.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5" id="dialogo-titulo">{titulo}</h2>
            </div>
            <div className="modal-body">{mensaje}</div>
            <div className="modal-footer">
              <button ref={botonCancelar} type="button" className="btn btn-outline-secondary" onClick={onCancelar} disabled={ocupado}>
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={onConfirmar} disabled={ocupado}>
                {ocupado ? 'Eliminando…' : textoConfirmar}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  )
}
