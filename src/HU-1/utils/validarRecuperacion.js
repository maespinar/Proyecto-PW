import { obtenerFortalezaClave } from './validarRegistroEstudiante.js'

export function validarCorreoRecuperacion(correo) {
  if (!correo.trim()) return 'Ingresa tu correo.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) return 'Ingresa un correo válido.'
  return ''
}

export function validarNuevaClave({ clave, confirmacion }) {
  const errores = {}
  if (!clave) errores.clave = 'Ingresa tu nueva contraseña.'
  else if (obtenerFortalezaClave(clave).nivel < 3) errores.clave = 'Usa al menos 8 caracteres, una mayúscula y un número.'
  if (!confirmacion) errores.confirmacion = 'Confirma tu nueva contraseña.'
  else if (clave !== confirmacion) errores.confirmacion = 'Las contraseñas no coinciden.'
  return errores
}
