import { useCallback, useEffect, useState } from 'react'
import * as perfilService from '../services/perfilService'
import { PerfilContext } from './perfilContexto'

export function PerfilProvider({ children }) {
  const [perfil, setPerfil] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [notificacion, setNotificacion] = useState(null)

  useEffect(() => {
    let activo = true
    perfilService.obtenerPerfil().then((datos) => {
      if (activo) {
        setPerfil(datos)
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

  const guardarDatosPersonales = useCallback(async (datos) => {
    const actualizado = await perfilService.actualizarDatosPersonales(datos)
    setPerfil(actualizado)
  }, [])

  const agregarHabilidad = useCallback(async (habilidad) => {
    setPerfil(await perfilService.agregarHabilidad(habilidad))
  }, [])

  const cambiarNivelHabilidad = useCallback(async (id, nivel) => {
    setPerfil(await perfilService.cambiarNivelHabilidad(id, nivel))
  }, [])

  const eliminarHabilidad = useCallback(async (id) => {
    setPerfil(await perfilService.eliminarHabilidad(id))
  }, [])

  const valor = {
    perfil,
    cargando,
    notificacion,
    notificar,
    cerrarNotificacion,
    guardarDatosPersonales,
    agregarHabilidad,
    cambiarNivelHabilidad,
    eliminarHabilidad,
  }

  return <PerfilContext.Provider value={valor}>{children}</PerfilContext.Provider>
}
