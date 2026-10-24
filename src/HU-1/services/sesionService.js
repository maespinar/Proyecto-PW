import { CUENTAS_DEMO } from '../data/cuentasDemo'

const MAXIMO_INTENTOS = 5
const DURACION_BLOQUEO = 30_000
const CLAVE_SESION = 'practicalima.sesion-demo'
let intentosFallidos = 0
let bloqueoHasta = 0

// Solo restaura la interfaz de demostración. Cualquier persona puede modificar
// este indicador: no acredita identidad ni permisos. La futura API debe validar
// la sesión y autorizar cada operación en el servidor.
export function obtenerSesionGuardada() {
  for (const tipo of ['sessionStorage', 'localStorage']) {
    try {
      const marcador = window[tipo].getItem(CLAVE_SESION)
      const cuenta = CUENTAS_DEMO.find(cuenta => marcador === JSON.stringify({ version: 1, cuenta: cuenta.id }))
      if (cuenta) return cuenta.usuario
    } catch {
      // Un almacenamiento inaccesible no impide consultar el otro.
    }
  }
  return null
}

export function cerrarSesionGuardada() {
  let fallo = false
  for (const tipo of ['sessionStorage', 'localStorage']) {
    try {
      window[tipo].removeItem(CLAVE_SESION)
    } catch {
      fallo = true
    }
  }
  if (fallo) throw new Error('No se pudo eliminar la sesión de demostración.')
}

export function guardarSesion(cuentaId, recordar) {
  const cuenta = CUENTAS_DEMO.find(cuenta => cuenta.id === cuentaId)
  if (!cuenta) throw new Error('Cuenta de demostración desconocida.')
  // Elimina cualquier preferencia anterior, sin almacenar credenciales,
  // tokens, roles ni datos personales del perfil.
  cerrarSesionGuardada()
  const almacenamiento = recordar ? window.localStorage : window.sessionStorage
  almacenamiento.setItem(CLAVE_SESION, JSON.stringify({ version: 1, cuenta: cuenta.id }))
  return cuenta.usuario
}

export function suscribirCambiosSesion(onCambio) {
  function sincronizar(evento) {
    if (evento.key === CLAVE_SESION || evento.key === null) {
      onCambio(obtenerSesionGuardada())
    }
  }
  window.addEventListener('storage', sincronizar)
  return () => window.removeEventListener('storage', sincronizar)
}

export function verificarClaveActual(correo, clave) {
  const cuenta = CUENTAS_DEMO.find(cuenta => cuenta.usuario.correo === correo.trim().toLowerCase())
  // Claves públicas de prueba, sin cuentas reales. Sustituir por la API.
  return Boolean(cuenta && clave === (cuenta.usuario.rol === 'empresa' ? 'empresa123' : 'ulima123'))
}

export function obtenerEstadoAcceso() {
  if (bloqueoHasta && Date.now() >= bloqueoHasta) {
    intentosFallidos = 0
    bloqueoHasta = 0
  }

  return { intentosRestantes: MAXIMO_INTENTOS - intentosFallidos, bloqueoHasta }
}

export async function iniciarSesion({ correo, clave }, signal) {
  const estado = obtenerEstadoAcceso()
  if (estado.bloqueoHasta) return { acceso: false, ...estado }

  await new Promise((resolve, reject) => {
    signal?.throwIfAborted()
    const cancelar = () => {
      clearTimeout(temporizador)
      reject(signal.reason)
    }
    const temporizador = setTimeout(() => {
      signal?.removeEventListener('abort', cancelar)
      resolve()
    }, 900)
    signal?.addEventListener('abort', cancelar, { once: true })
  })
  signal?.throwIfAborted()

  const estadoActual = obtenerEstadoAcceso()
  if (estadoActual.bloqueoHasta) return { acceso: false, ...estadoActual }

  if (verificarClaveActual(correo, clave)) {
    intentosFallidos = 0
    bloqueoHasta = 0
    const cuenta = CUENTAS_DEMO.find(cuenta => cuenta.usuario.correo === correo.trim().toLowerCase())
    return { acceso: true, cuentaId: cuenta.id, usuario: cuenta.usuario, ...obtenerEstadoAcceso() }
  }

  intentosFallidos += 1
  if (intentosFallidos >= MAXIMO_INTENTOS) bloqueoHasta = Date.now() + DURACION_BLOQUEO
  return { acceso: false, ...obtenerEstadoAcceso() }
}
