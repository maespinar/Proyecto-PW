import { useEffect, useState } from 'react'
import { cerrarSesionGuardada, guardarSesion, obtenerSesionGuardada, suscribirCambiosSesion } from '../services/sesionService'

export function useSesion() {
  const [usuario, setUsuario] = useState(obtenerSesionGuardada)

  useEffect(() => suscribirCambiosSesion(setUsuario), [])

  function iniciarSesion(cuentaId, recordar) {
    setUsuario(guardarSesion(cuentaId, recordar))
  }

  function cerrarSesion() {
    cerrarSesionGuardada()
    setUsuario(null)
  }

  return { usuario, iniciarSesion, cerrarSesion }
}
