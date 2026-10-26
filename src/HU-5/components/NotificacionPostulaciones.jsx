import { useEffect } from 'react'
import { usePostulaciones } from '../context/usePostulaciones'

export default function NotificacionPostulaciones() {
  const { notificacion, cerrarNotificacion } = usePostulaciones()

  useEffect(() => {
    if (!notificacion) return undefined
    const timer = setTimeout(cerrarNotificacion, 5000)
    return () => clearTimeout(timer)
  }, [notificacion, cerrarNotificacion])

  if (!notificacion) return null

  return (
    <div
      className={`alert alert-${notificacion.tipo} alert-dismissible mb-4 shadow-sm`}
      role={notificacion.tipo === 'danger' ? 'alert' : 'status'}
      style={{
        position: 'sticky',
        top: '1rem',
        zIndex: 1040,
        margin: '0 auto 1.5rem auto',
        maxWidth: '960px',
      }}
    >
      {notificacion.mensaje}
      <button
        type="button"
        className="btn-close"
        aria-label="Cerrar notificación"
        onClick={cerrarNotificacion}
      />
    </div>
  )
}
