import { CARRERAS, CICLOS } from '../../HU-2/data/catalogos'

export function obtenerFortalezaClave(clave) {
  if (!clave) return { nivel: 0, texto: 'ingresa una contraseña' }
  const requisitos = [clave.length >= 8, /[A-ZÁÉÍÓÚÜÑ]/u.test(clave), /\d/u.test(clave)]
  const cumple = requisitos.every(Boolean)
  const nivel = cumple ? 3 + Number(/[^\p{L}\p{N}\s]/u.test(clave)) : Math.min(2, requisitos.filter(Boolean).length || 1)
  return { nivel, texto: ['ingresa una contraseña', 'débil', 'media', 'segura', 'muy segura'][nivel] }
}

export function validarRegistroEstudiante(datos) {
  const errores = {}
  if (!datos.nombres.trim()) errores.nombres = 'Ingresa tus nombres.'
  if (!datos.apellidos.trim()) errores.apellidos = 'Ingresa tus apellidos.'
  if (!datos.correo.trim()) errores.correo = 'Ingresa tu correo institucional.'
  else if (!/^[^\s@]+@aloe\.ulima\.edu\.pe$/i.test(datos.correo.trim())) {
    errores.correo = 'Usa un correo válido terminado en @aloe.ulima.edu.pe.'
  }
  if (obtenerFortalezaClave(datos.clave).nivel < 3) errores.clave = 'Usa al menos 8 caracteres, una mayúscula y un número.'
  if (!datos.confirmacion) errores.confirmacion = 'Confirma tu contraseña.'
  else if (datos.confirmacion !== datos.clave) errores.confirmacion = 'Las contraseñas no coinciden.'
  if (!CARRERAS.includes(datos.carrera)) errores.carrera = 'Selecciona tu carrera.'
  if (!CICLOS.includes(datos.ciclo)) errores.ciclo = 'Selecciona tu ciclo.'
  if (!datos.terminos) errores.terminos = 'Acepta los términos del servicio y la política de privacidad para continuar.'
  return errores
}
