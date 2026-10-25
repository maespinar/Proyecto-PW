import { useEffect, useRef } from 'react'

export default function DialogoPostulacion({ titulo, idTitulo, ocupado, onCerrar, children, clase = '' }) {
  const dialogo = useRef(null)

  useEffect(() => {
    const elemento = dialogo.current
    const focoAnterior = document.activeElement
    const contenedorAnterior = focoAnterior?.closest('article, section')
    const desbordamientoAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    elemento.showModal()
    elemento.querySelector('[data-foco-inicial]')?.focus()
    return () => {
      elemento.close()
      document.body.style.overflow = desbordamientoAnterior
      if (focoAnterior?.isConnected && !focoAnterior.matches(':disabled')) focoAnterior.focus()
      else {
        const reemplazo = contenedorAnterior?.isConnected
          ? contenedorAnterior.querySelector('a, button:not(:disabled)') : null
        if (reemplazo) reemplazo.focus()
        else {
          const tituloPagina = document.querySelector('main h1')
          const tabIndexAnterior = tituloPagina?.getAttribute('tabindex')
          tituloPagina?.setAttribute('tabindex', '-1')
          tituloPagina?.focus()
          if (tabIndexAnterior === null) tituloPagina?.removeAttribute('tabindex')
          else if (tabIndexAnterior !== undefined) tituloPagina?.setAttribute('tabindex', tabIndexAnterior)
        }
      }
    }
  }, [])

  return (
    <dialog
      ref={dialogo}
      className={`hu5-modal-dialog ${clase}`}
      aria-labelledby={idTitulo}
      onKeyDown={(evento) => {
        if (evento.key !== 'Tab') return
        const controles = [...evento.currentTarget.querySelectorAll('a[href], button:not(:disabled), textarea:not(:disabled), input:not(:disabled), select:not(:disabled)')]
          .filter((elemento) => elemento.getClientRects().length > 0)
        const primero = controles[0]
        const ultimo = controles.at(-1)
        if (evento.shiftKey && document.activeElement === primero) {
          evento.preventDefault()
          ultimo?.focus()
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
          evento.preventDefault()
          primero?.focus()
        }
      }}
      onCancel={(evento) => {
        evento.preventDefault()
        if (!ocupado) onCerrar()
      }}
    >
      <div className="hu5-modal-header">
        <h2 id={idTitulo} className="hu5-modal-title">{titulo}</h2>
        <button type="button" className="hu5-modal-close-btn" onClick={onCerrar} disabled={ocupado} aria-label="Cerrar diálogo">×</button>
      </div>
      {children}
    </dialog>
  )
}
