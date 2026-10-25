import { useEffect, useRef, useState } from 'react'
import DialogoPostulacion from './DialogoPostulacion'
import '../styles/hu5.css'

function ContenidoRetiro({ postulacion, onConfirmar, onCerrar }) {
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState('')
  const solicitud = useRef(null)

  useEffect(() => () => solicitud.current?.abort(), [])

  const retirar = async () => {
    if (solicitud.current) return
    const controlador = new AbortController()
    solicitud.current = controlador
    setProcesando(true)
    setError('')
    try {
      await onConfirmar(postulacion.id, controlador.signal)
      onCerrar()
    } catch (fallo) {
      if (!controlador.signal.aborted) setError(fallo.message || 'No se pudo retirar la postulación. Reintenta.')
    } finally {
      solicitud.current = null
      if (!controlador.signal.aborted) setProcesando(false)
    }
  }

  return (
    <DialogoPostulacion titulo="¿Retirar tu postulación?" idTitulo="hu5-retirar-titulo" ocupado={procesando} onCerrar={onCerrar}>
      <div className="hu5-modal-body">
        <p>Vas a retirar tu postulación para <strong>{postulacion.puesto}</strong> en <strong>{postulacion.empresa}</strong>.</p>
        <p className="hu5-nota-simulacion">El cambio se guarda solo en este navegador. No se avisa a la empresa ni se envían correos.</p>
        <p>Solo puedes retirarte mientras la convocatoria siga vigente. No podrás volver a postular a este puesto.</p>
        {error && <p className="alert alert-danger" role="alert">{error}</p>}
        {procesando && <p role="status">Guardando el retiro local…</p>}
      </div>
      <div className="hu5-modal-footer">
        <button data-foco-inicial type="button" className="hu5-btn-outline" onClick={onCerrar} disabled={procesando}>Cancelar</button>
        <button type="button" className="hu5-btn-primary hu5-confirmar-retiro" onClick={retirar} disabled={procesando}>
          {procesando ? 'Retirando…' : 'Sí, retirar postulación'}
        </button>
      </div>
    </DialogoPostulacion>
  )
}

export default function ModalRetirarPostulacion({ postulacion, onConfirmar, onCerrar }) {
  return postulacion ? <ContenidoRetiro key={postulacion.id} postulacion={postulacion} onConfirmar={onConfirmar} onCerrar={onCerrar} /> : null
}