import { useCallback, useEffect, useMemo, useState } from 'react'
import * as postulacionesService from '../services/postulacionesService'
import { PostulacionesContext } from './postulacionesContexto'

export function PostulacionesProvider({ children }) {
  const [postulaciones, setPostulaciones] = useState([])
  const [cargando, setCargando] = useState(true)
  const [notificacion, setNotificacion] = useState(null)
  const [filtroEstado, setFiltroEstado] = useState('todas')
  const [convocatoriaModal, setConvocatoriaModal] = useState(null)
  const [ultimaPostulacionCreada, setUltimaPostulacionCreada] = useState(null)

  useEffect(() => {
    let activo = true
    postulacionesService
      .obtenerPostulaciones()
      .then((datos) => {
        if (activo) {
          setPostulaciones(datos)
          setCargando(false)
        }
      })
      .catch(() => {
        if (activo) {
          setNotificacion({
            tipo: 'danger',
            mensaje: 'No se pudieron cargar las postulaciones.',
          })
          setCargando(false)
        }
      })
    return () => {
      activo = false
    }
  }, [])

  const notificar = useCallback((mensaje, tipo = 'success') => {
    setNotificacion({ mensaje, tipo })
  }, [])

  const cerrarNotificacion = useCallback(() => setNotificacion(null), [])

  const conteos = useMemo(() => {
    return {
      todas: postulaciones.length,
      recibida: postulaciones.filter((p) => p.estado === 'recibida').length,
      en_revision: postulaciones.filter((p) => p.estado === 'en_revision').length,
      aceptada: postulaciones.filter((p) => p.estado === 'aceptada').length,
      descartada: postulaciones.filter((p) => p.estado === 'descartada').length,
      retirada: postulaciones.filter((p) => p.estado === 'retirada').length,
    }
  }, [postulaciones])

  const postulacionesFiltradas = useMemo(() => {
    if (filtroEstado === 'todas') return postulaciones
    return postulaciones.filter((p) => p.estado === filtroEstado)
  }, [postulaciones, filtroEstado])

  const retirar = useCallback(
    async (id) => {
      try {
        const actualizada = await postulacionesService.retirarPostulacion(id)
        setPostulaciones((prev) =>
          prev.map((p) => (p.id === id ? actualizada : p))
        )
        notificar('Has retirado tu postulación exitosamente.', 'info')
        return actualizada
      } catch (err) {
        notificar(err.message || 'No se pudo retirar la postulación.', 'danger')
        throw err
      }
    },
    [notificar]
  )

  const postular = useCallback(
    async (datos) => {
      try {
        const nueva = await postulacionesService.crearPostulacion(datos)
        setPostulaciones((prev) => [nueva, ...prev])
        setUltimaPostulacionCreada(nueva)
        notificar('¡Postulación enviada con éxito!', 'success')
        return nueva
      } catch (err) {
        notificar(err.message || 'Ocurrió un error al enviar la postulación.', 'danger')
        throw err
      }
    },
    [notificar]
  )

  const restablecer = useCallback(async () => {
    setCargando(true)
    const datos = await postulacionesService.restablecerPostulaciones()
    setPostulaciones(datos)
    setCargando(false)
    notificar('Se han restablecido los datos semilla de HU-5.', 'info')
  }, [notificar])

  const abrirModalPostulacion = useCallback((convocatoria) => {
    setConvocatoriaModal(convocatoria)
  }, [])

  const cerrarModalPostulacion = useCallback(() => {
    setConvocatoriaModal(null)
  }, [])

  const valor = {
    postulaciones,
    postulacionesFiltradas,
    cargando,
    notificacion,
    notificar,
    cerrarNotificacion,
    filtroEstado,
    setFiltroEstado,
    conteos,
    retirar,
    postular,
    convocatoriaModal,
    abrirModalPostulacion,
    cerrarModalPostulacion,
    ultimaPostulacionCreada,
    setUltimaPostulacionCreada,
    restablecer,
  }

  return (
    <PostulacionesContext.Provider value={valor}>
      {children}
    </PostulacionesContext.Provider>
  )
}
