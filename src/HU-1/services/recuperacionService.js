import { validarCorreoRecuperacion, validarNuevaClave } from '../utils/validarRecuperacion.js'

// Primera entrega: sin correos, enlaces reales, persistencia ni cambios de cuenta.
async function simularOperacion(signal) {
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

export async function solicitarRecuperacion(correo, signal) {
  if (validarCorreoRecuperacion(correo)) throw new Error('Correo inválido')
  await simularOperacion(signal)
}

export async function guardarNuevaClave(datos, signal) {
  if (Object.keys(validarNuevaClave(datos)).length) throw new Error('Contraseña inválida')
  await simularOperacion(signal)
}
