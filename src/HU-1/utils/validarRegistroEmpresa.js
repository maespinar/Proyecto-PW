import { SECTORES_EMPRESA, TAMANOS_EMPRESA } from '../data/catalogosEmpresa.js'
import { obtenerFortalezaClave } from './validarRegistroEstudiante.js'

export function validarRegistroEmpresa(datos) {
  const errores = {}
  if (!datos.razonSocial.trim()) errores.razonSocial = 'Ingresa la razón social de tu empresa.'
  if (!datos.ruc.trim()) errores.ruc = 'Ingresa el RUC de tu empresa.'
  else if (!/^\d{11}$/.test(datos.ruc.trim())) errores.ruc = 'El RUC debe tener exactamente 11 dígitos.'
  if (!SECTORES_EMPRESA.includes(datos.sector)) errores.sector = 'Selecciona el sector de tu empresa.'
  if (!TAMANOS_EMPRESA.some(tamano => tamano.valor === datos.tamano)) errores.tamano = 'Selecciona el tamaño de tu empresa.'
  if (!datos.correo.trim()) errores.correo = 'Ingresa el correo de contacto.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())) errores.correo = 'Ingresa un correo de contacto válido.'
  if (!datos.telefono.trim()) errores.telefono = 'Ingresa el teléfono de contacto.'
  else if (!/^\+?[\d\s()-]+$/.test(datos.telefono.trim()) || !/^\d{7,15}$/.test(datos.telefono.replace(/\D/g, ''))) {
    errores.telefono = 'Usa entre 7 y 15 dígitos; puedes incluir +, espacios, paréntesis o guiones.'
  }
  if (obtenerFortalezaClave(datos.clave).nivel < 3) errores.clave = 'Usa al menos 8 caracteres, una mayúscula y un número.'
  if (!datos.confirmacion) errores.confirmacion = 'Confirma tu contraseña.'
  else if (datos.confirmacion !== datos.clave) errores.confirmacion = 'Las contraseñas no coinciden.'
  if (!datos.terminos) errores.terminos = 'Confirma que representas a la empresa y acepta los términos del servicio.'
  return errores
}
