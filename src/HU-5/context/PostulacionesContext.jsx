import { useCallback, useEffect, useState } from 'react'
import * as postulacionesService from '../services/postulacionesService'
import { PostulacionesContext } from './postulacionesContexto'
//PROVIDER GLOBAL (ESTUDIANTE)

//modulo central  --validacion,postulaciones,carga,error,intento,notifiacion,estado 
export function PostulacionesProvider({ children, usuario }) {
  const estudianteId = usuario?.rol === 'estudiante' ? usuario.id : null
  const [postulaciones, setPostulaciones] = useState([])
  const [cargando, setCargando] = useState(Boolean(estudianteId))
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)
  const [notificacion, setNotificacion] = useState(null)
  const [filtroEstado, setFiltroEstado] = useState('todas')

  //ciclo de cargo
  useEffect(() => {
    if (!estudianteId) return undefined
    const controlador = new AbortController()
    postulacionesService.obtenerPostulaciones(estudianteId, controlador.signal)
      .then(setPostulaciones)
      .catch((fallo) => { if (!controlador.signal.aborted) setError(fallo.message) })
      .finally(() => { if (!controlador.signal.aborted) setCargando(false) })
    return () => controlador.abort()
  }, [estudianteId, intento])

  //spinner e incremento intento
  const reintentar = () => {
    setCargando(true)
    setError('')
    setIntento((anterior) => anterior + 1)
  }

  // Activa un aviso visual flotante con mensaje y tipo ('success', 'error', 'info')
  const notificar = useCallback((mensaje, tipo = 'success') => setNotificacion({ mensaje, tipo }), [])
  // Limpia el estado de notificacion para ocultar el aviso de la pantalla
  const cerrarNotificacion = useCallback(() => setNotificacion(null), [])


  const retirar = async (id, signal) => {
    if (!estudianteId) throw new Error('Necesitas una sesión de estudiante.')
    // Retira la postulación en la simulación local y actualiza el estado de la lista
    const actualizada = await postulacionesService.retirarPostulacion(id, estudianteId, signal)
    setPostulaciones((anteriores) => anteriores.map((item) => item.id === id ? actualizada : item))
    notificar('Postulación retirada en la simulación local.', 'info')
    return actualizada
  }

  const postular = async (datos, signal) => {
    if (!estudianteId) throw new Error('Necesitas una sesión de estudiante.')
    // Crea la postulación en la simulación local y actualiza el estado de la lista
    const nueva = await postulacionesService.crearPostulacion(datos, estudianteId, signal)
    setPostulaciones((anteriores) => [nueva, ...anteriores])
    return nueva
  }

  // Conteos de postulaciones por estado y filtrado
  const conteos = { todas: postulaciones.length }
  for (const estado of ['recibida', 'en_revision', 'aceptada', 'descartada', 'retirada']) {
    conteos[estado] = postulaciones.filter((item) => item.estado === estado).length
  }
  const postulacionesFiltradas = filtroEstado === 'todas'
    ? postulaciones : postulaciones.filter((item) => item.estado === filtroEstado)

  // Expone el estado y las funciones de gestión de postulaciones a los componentes hijos
  return (
    <PostulacionesContext.Provider value={{
      postulaciones, postulacionesFiltradas, cargando, error, reintentar,
      notificacion, notificar, cerrarNotificacion, filtroEstado, setFiltroEstado, conteos, retirar, postular,
    }}>
      {children}
    </PostulacionesContext.Provider>
  )
}