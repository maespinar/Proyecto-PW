import { useCallback, useEffect, useState } from 'react'
import * as postulacionesService from '../services/postulacionesService'
import { PostulacionesContext } from './postulacionesContexto'

export function PostulacionesProvider({ children, usuario }) {
  const estudianteId = usuario?.rol === 'estudiante' ? usuario.id : null
  const [postulaciones, setPostulaciones] = useState([])
  const [cargando, setCargando] = useState(Boolean(estudianteId))
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)
  const [notificacion, setNotificacion] = useState(null)
  const [filtroEstado, setFiltroEstado] = useState('todas')

  useEffect(() => {
    if (!estudianteId) return undefined
    const controlador = new AbortController()
    postulacionesService.obtenerPostulaciones(estudianteId, controlador.signal)
      .then(setPostulaciones)
      .catch((fallo) => { if (!controlador.signal.aborted) setError(fallo.message) })
      .finally(() => { if (!controlador.signal.aborted) setCargando(false) })
    return () => controlador.abort()
  }, [estudianteId, intento])

  const reintentar = () => {
    setCargando(true)
    setError('')
    setIntento((anterior) => anterior + 1)
  }

  const notificar = useCallback((mensaje, tipo = 'success') => setNotificacion({ mensaje, tipo }), [])
  const cerrarNotificacion = useCallback(() => setNotificacion(null), [])

  const retirar = async (id, signal) => {
    if (!estudianteId) throw new Error('Necesitas una sesión de estudiante.')
    const actualizada = await postulacionesService.retirarPostulacion(id, estudianteId, signal)
    setPostulaciones((anteriores) => anteriores.map((item) => item.id === id ? actualizada : item))
    notificar('Postulación retirada en la simulación local.', 'info')
    return actualizada
  }

  const postular = async (datos, signal) => {
    if (!estudianteId) throw new Error('Necesitas una sesión de estudiante.')
    const nueva = await postulacionesService.crearPostulacion(datos, estudianteId, signal)
    setPostulaciones((anteriores) => [nueva, ...anteriores])
    return nueva
  }

  const conteos = { todas: postulaciones.length }
  for (const estado of ['recibida', 'en_revision', 'aceptada', 'descartada', 'retirada']) {
    conteos[estado] = postulaciones.filter((item) => item.estado === estado).length
  }
  const postulacionesFiltradas = filtroEstado === 'todas'
    ? postulaciones : postulaciones.filter((item) => item.estado === filtroEstado)

  return (
    <PostulacionesContext.Provider value={{
      postulaciones, postulacionesFiltradas, cargando, error, reintentar,
      notificacion, notificar, cerrarNotificacion, filtroEstado, setFiltroEstado, conteos, retirar, postular,
    }}>
      {children}
    </PostulacionesContext.Provider>
  )
}