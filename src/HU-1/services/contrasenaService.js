import { verificarClaveActual } from './sesionService'
import { validarCambioContrasena } from '../utils/validarCambioContrasena'

// Primera entrega: solo verifica la cuenta de demostración. No almacena claves
// ni modifica credenciales o sesiones. Sustituir por una petición a la API.
export async function cambiarContrasena(correo, datos, signal) {
  if (Object.keys(validarCambioContrasena(datos)).length) throw new Error('Datos inválidos')
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
  return { claveActualValida: verificarClaveActual(correo, datos.claveActual) }
}
