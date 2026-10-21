export const TIPOS_ENLACE = ['Portafolio', 'Repositorio', 'LinkedIn', 'Otro']
export const MAX_ENLACES = 5

// Convierte lo que escribió el estudiante en una dirección segura.
// Acepta "marianaquispe.dev" (agrega https://) y rechaza esquemas peligrosos
// como javascript:. Devuelve null si no es una dirección web válida.
export function hrefSeguro(texto) {
  const limpio = (texto ?? '').trim()
  if (!limpio || /\s/.test(limpio)) return null
  const conEsquema = /^[a-z][a-z0-9+.-]*:/i.test(limpio) ? limpio : `https://${limpio}`
  try {
    const url = new URL(conEsquema)
    if (!['http:', 'https:'].includes(url.protocol)) return null
    if (!url.hostname.includes('.')) return null
    return url.href
  } catch {
    return null
  }
}

export function claveEnlace(texto) {
  return hrefSeguro(texto)?.toLowerCase().replace(/\/$/, '') ?? null
}
