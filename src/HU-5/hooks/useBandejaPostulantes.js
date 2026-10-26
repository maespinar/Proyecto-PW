import { useEffect, useRef, useState } from 'react'
import * as servicio from '../services/bandejaService'
//HOOK LOCAL (EMPRESA)

// Hook personalizado para manejar la bandeja de postulantes de una convocatoria de empresa.
export default function useBandejaPostulantes(empresaId, convocatoriaId) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [errorOperacion, setErrorOperacion] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [aviso, setAviso] = useState('')
  const [intento, setIntento] = useState(0)
  const solicitud = useRef(null)

  // Carga la convocatoria y sus postulantes cada vez que cambia la empresa, la convocatoria seleccionada o el contador de reintento.
  useEffect(() => {
    const controlador = new AbortController()
    // Obtiene la bandeja de postulantes desde el servicio y actualiza el estado del hook
    servicio.obtenerBandeja(empresaId, convocatoriaId, controlador.signal)
      .then((resultado) => { if (!controlador.signal.aborted) setDatos(resultado) })
      .catch((fallo) => { if (!controlador.signal.aborted) setError(fallo.message) })
      .finally(() => { if (!controlador.signal.aborted) setCargando(false) })
    return () => controlador.abort()
  }, [empresaId, convocatoriaId, intento])

  // Limpia la solicitud pendiente si el componente se desmonta (si el usuario se va)
  useEffect(() => () => solicitud.current?.abort(), [])

  const reintentar = () => {
    setError('')
    setCargando(true)
    setIntento((anterior) => anterior + 1)
  }

  // Función genérica para ejecutar operaciones de la bandeja de postulantes, manejando estado de ocupado, errores y notificaciones
  const ejecutar = async (operacion, actualizar, mensaje) => {
    if (solicitud.current) return false
    const controlador = new AbortController()
    solicitud.current = controlador
    setOcupado(true)
    setErrorOperacion('')
    setAviso('')
    try {
      const resultado = await operacion(controlador.signal)
      if (controlador.signal.aborted) return false
      setDatos((anteriores) => actualizar(anteriores, resultado))
      setAviso(mensaje)
      return true
    } catch (fallo) {
      if (!controlador.signal.aborted) setErrorOperacion(fallo.message || 'No se pudo guardar. Reintenta.')
      return false
    } finally {
      solicitud.current = null
      if (!controlador.signal.aborted) setOcupado(false)
    }
  }

  const cambiarEstados = (ids, estado) => ejecutar(
    (signal) => servicio.cambiarEstados(empresaId, convocatoriaId, ids, estado, signal),
    (anteriores) => ({ ...anteriores, postulantes: anteriores.postulantes.map((item) => ids.includes(item.id) ? { ...item, estado } : item) }),
    'Estados actualizados en la simulación local.'
  )

  const guardarNota = (id, texto) => ejecutar(
    (signal) => servicio.guardarNota(empresaId, convocatoriaId, id, texto, signal),
    (anteriores, nota) => ({ ...anteriores, postulantes: anteriores.postulantes.map((item) => item.id === id ? { ...item, nota } : item) }),
    'Nota interna guardada localmente.'
  )

  const editarConvocatoria = (formulario) => ejecutar(
    (signal) => servicio.modificarConvocatoria(empresaId, convocatoriaId, formulario, signal),
    (anteriores, convocatoria) => ({ ...anteriores, convocatoria }),
    'Convocatoria actualizada solo en la demostración de la bandeja.'
  )

  const cerrarConvocatoria = () => ejecutar(
    (signal) => servicio.cerrarConvocatoria(empresaId, convocatoriaId, signal),
    (anteriores, convocatoria) => ({ ...anteriores, convocatoria }),
    'Convocatoria cerrada solo en la demostración de la bandeja.'
  )

  return {
    datos, cargando, error, reintentar, ocupado, errorOperacion, aviso,
    limpiarError: () => setErrorOperacion(''), cerrarAviso: () => setAviso(''),
    cambiarEstados, guardarNota, editarConvocatoria, cerrarConvocatoria,
  }
}
