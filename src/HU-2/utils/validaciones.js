import { normalizar } from './habilidades'

export const MAX_RESUMEN = 600
const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/

function validarNombre(valor, campo) {
  const texto = valor.trim()
  if (!texto) return `Ingresa tus ${campo}.`
  if (texto.length < 2 || !SOLO_LETRAS.test(texto)) return `Usa solo letras en tus ${campo} (mínimo 2 caracteres).`
  return undefined
}

export function validarDatosPersonales(datos) {
  const errores = {}

  const errNombres = validarNombre(datos.nombres, 'nombres')
  if (errNombres) errores.nombres = errNombres
  const errApellidos = validarNombre(datos.apellidos, 'apellidos')
  if (errApellidos) errores.apellidos = errApellidos

  const telefono = datos.telefono.replace(/\s/g, '')
  if (telefono && !/^9\d{8}$/.test(telefono)) {
    errores.telefono = 'Ingresa un celular de 9 dígitos que empiece con 9.'
  }

  if (!datos.carrera) errores.carrera = 'Elige tu carrera.'
  if (!datos.ciclo) errores.ciclo = 'Elige tu ciclo.'

  if (datos.resumen.length > MAX_RESUMEN) {
    errores.resumen = `El resumen no puede superar los ${MAX_RESUMEN} caracteres.`
  }

  return errores
}

// Valida y convierte la foto: JPG/PNG, hasta 2 MB y mínimo 400 × 400 px.
export function procesarFoto(archivo) {
  return new Promise((resolve) => {
    if (!['image/jpeg', 'image/png'].includes(archivo.type)) {
      return resolve({ error: 'Solo se aceptan imágenes JPG o PNG.' })
    }
    if (archivo.size > 2 * 1024 * 1024) {
      return resolve({ error: 'La imagen supera los 2 MB.' })
    }
    const lector = new FileReader()
    lector.onerror = () => resolve({ error: 'No se pudo leer el archivo.' })
    lector.onload = () => {
      const img = new Image()
      img.onerror = () => resolve({ error: 'No se pudo leer la imagen.' })
      img.onload = () => {
        if (img.width < 400 || img.height < 400) {
          resolve({ error: 'La imagen debe medir al menos 400 × 400 px.' })
        } else {
          resolve({ dataUrl: lector.result })
        }
      }
      img.src = lector.result
    }
    lector.readAsDataURL(archivo)
  })
}

export function validarHabilidad(nombre, registradas) {
  const texto = nombre.trim()
  if (!texto) return 'Escribe el nombre de la habilidad.'
  if (texto.length < 2) return 'El nombre debe tener al menos 2 caracteres.'
  if (texto.length > 40) return 'El nombre no puede superar los 40 caracteres.'
  if (registradas.some((r) => normalizar(r) === normalizar(texto))) return 'Ya registraste esta habilidad.'
  return undefined
}
