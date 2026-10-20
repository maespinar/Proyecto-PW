import { validarRegistroEstudiante } from '../utils/validarRegistroEstudiante.js'
import { validarRegistroEmpresa } from '../utils/validarRegistroEmpresa.js'

// Simulación de la primera entrega: no persiste datos ni envía correos reales.
async function simularEscritura(signal) {
  signal?.throwIfAborted()
  await new Promise((resolve, reject) => {
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
  if (globalThis.navigator?.onLine === false) throw new Error('Sin conexión')
}

export async function registrarEstudiante(datos, signal) {
  if (Object.keys(validarRegistroEstudiante(datos)).length) throw new Error('Datos de registro inválidos')
  await simularEscritura(signal)
  return { correo: datos.correo.trim().toLowerCase() }
}

export async function registrarEmpresa(datos, signal) {
  if (Object.keys(validarRegistroEmpresa(datos)).length) throw new Error('Datos de registro inválidos')
  await simularEscritura(signal)
  return { razonSocial: datos.razonSocial.trim(), correo: datos.correo.trim().toLowerCase() }
}

export async function reenviarVerificacion(correo, signal) {
  if (!correo) throw new Error('Falta el correo de verificación')
  await simularEscritura(signal)
  return { correo }
}
