import { useEffect } from 'react'
import { usePerfil } from '../context/perfilContexto'

export default function Notificacion() {
  const { notificacion, cerrarNotificacion } = usePerfil()

  useEffect(() => {
    if (!notificacion) return undefined
    const temporizador = setTimeout(cerrarNotificacion, 5000)
    return () => clearTimeout(temporizador)
  }, [notificacion, cerrarNotificacion])

  if (!notificacion) return null

  return (
    <div
      className={`alert alert-${notificacion.tipo} alert-dismissible mb-4`}
      role={notificacion.tipo === 'danger' ? 'alert' : 'status'}
    >
      {notificacion.mensaje}
      <button type="button" className="btn-close" aria-label="Cerrar aviso" onClick={cerrarNotificacion} />
    </div>
  )
}
