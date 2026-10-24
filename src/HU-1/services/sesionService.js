import perfilPrueba from '../../HU-2/data/perfil.seed.json' with { type: 'json' }

const MAXIMO_INTENTOS = 5
const DURACION_BLOQUEO = 30_000
let intentosFallidos = 0
let bloqueoHasta = 0

export function verificarClaveActual(correo, clave) {
  return correo.trim().toLowerCase() === perfilPrueba.correo && clave === 'ulima123'
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
    return { acceso: true, ...obtenerEstadoAcceso() }
  }

  intentosFallidos += 1
  if (intentosFallidos >= MAXIMO_INTENTOS) bloqueoHasta = Date.now() + DURACION_BLOQUEO
  return { acceso: false, ...obtenerEstadoAcceso() }
}
