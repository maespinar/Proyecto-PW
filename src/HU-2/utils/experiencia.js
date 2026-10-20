export const MAX_DESCRIPCION = 400

const rellenar = (numero) => String(numero).padStart(2, '0')

// Mes actual en formato AAAA-MM (permite comparar fechas como texto).
export function mesActual() {
  const hoy = new Date()
  return `${hoy.getFullYear()}-${rellenar(hoy.getMonth() + 1)}`
}

// "03/2025" -> "2025-03". Devuelve null si el texto no es una fecha válida.
export function parsearMes(texto) {
  const coincidencia = /^(\d{1,2})\s*\/\s*(\d{4})$/.exec(texto.trim())
  if (!coincidencia) return null
  const mes = Number(coincidencia[1])
  const anio = Number(coincidencia[2])
  if (mes < 1 || mes > 12 || anio < 1990) return null
  return `${anio}-${rellenar(mes)}`
}

// "2025-03" -> "03/2025"
export function formatearMes(valor) {
  if (!valor) return ''
  const [anio, mes] = valor.split('-')
  return `${mes}/${anio}`
}

export function textoPeriodo(experiencia) {
  const fin = experiencia.actual ? 'actualidad' : formatearMes(experiencia.hasta)
  return `${formatearMes(experiencia.desde)} — ${fin}`
}

// Cronológico: primero la experiencia actual, luego por fecha de fin (la más reciente arriba).
export function ordenarExperiencias(experiencias) {
  const fin = (e) => (e.actual ? '9999-99' : (e.hasta ?? ''))
  return [...experiencias].sort((a, b) => fin(b).localeCompare(fin(a)) || b.desde.localeCompare(a.desde))
}
