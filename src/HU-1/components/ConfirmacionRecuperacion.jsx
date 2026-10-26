import { useEffect, useRef, useState } from 'react'
import NotificacionResultado from './NotificacionResultado'
import { solicitarRecuperacion } from '../services/recuperacionService'

export default function ConfirmacionRecuperacion({ correo }) {
  const [segundos, setSegundos] = useState(0)
  const [reenviando, setReenviando] = useState(false)
  const [notificacion, setNotificacion] = useState(null)
  const solicitud = useRef(null)
  const esperaReenvio = Math.max(0, 45 - segundos)

  useEffect(() => {
    const intervalo = setInterval(() => setSegundos(anterior => anterior + 1), 1000)
    return () => {
      clearInterval(intervalo)
      solicitud.current?.abort()
    }
  }, [])

  async function reenviar() {
    if (solicitud.current || esperaReenvio > 0) return
    const controlador = new AbortController()
    solicitud.current = controlador
    setReenviando(true)
    setNotificacion(null)
    try {
      await solicitarRecuperacion(correo, controlador.signal)
      if (controlador.signal.aborted) return
      setSegundos(0)
      setNotificacion({ tipo: 'exito', titulo: 'Reenvío simulado', detalle: 'La solicitud se completó. No se envían correos reales.' })
    } catch {
      if (!controlador.signal.aborted) setNotificacion({ tipo: 'error', titulo: 'No se pudo reenviar', detalle: 'Revisa tu conexión e inténtalo nuevamente.' })
    } finally {
      solicitud.current = null
      if (!controlador.signal.aborted) setReenviando(false)
    }
  }

  return (
    <>
      <div className="registro-formulario recuperacion-formulario recuperacion-confirmacion" aria-busy={reenviando}>
        <span className="recuperacion-correo-icono" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="6" width="16" height="12" rx="1" />
            <path d="m4 7 8 6 8-6M4 18l6-6m10 6-6-6" />
          </svg>
        </span>
        <h1 id="recuperacion-titulo" tabIndex={-1}>Revisa tu correo</h1>
        <p className="recuperacion-descripcion">Simulamos el envío del enlace a <strong>{correo}</strong>. Expira en 60 minutos.</p>
        <button className="registro-reenviar" type="button" onClick={reenviar} disabled={esperaReenvio > 0 || reenviando} aria-describedby="recuperacion-reenvio-ayuda">
          {reenviando ? 'Reenviando...' : 'Reenviar enlace'}
        </button>
        <p className="recuperacion-espera" id="recuperacion-reenvio-ayuda">{esperaReenvio > 0 ? `Podrás reenviarlo en 00:${String(esperaReenvio).padStart(2, '0')}` : 'Ya puedes reenviar el enlace.'}</p>
        <p className="recuperacion-espera">Simulación: el enlace se abrirá automáticamente en {Math.max(0, 10 - segundos)} segundos.</p>
      </div>
      <NotificacionResultado notificacion={notificacion} onCerrar={() => setNotificacion(null)} />
    </>
  )
}
