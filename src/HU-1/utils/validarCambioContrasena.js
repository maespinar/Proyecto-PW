import { validarNuevaClave } from './validarRecuperacion'

export function validarCambioContrasena(datos) {
  const errores = {}
  if (!datos.claveActual) errores.claveActual = 'Ingresa tu contraseña actual.'
  Object.assign(errores, validarNuevaClave(datos))
  if (datos.clave && datos.clave === datos.claveActual) {
    errores.clave = 'La nueva contraseña debe ser diferente de la actual.'
  }
  return errores
}
