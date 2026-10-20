const SIN_TILDE = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }

export const normalizar = (texto) => {
  let resultado = ''
  for (const letra of texto.toLowerCase()) {
    resultado += SIN_TILDE[letra] || letra
  }
  return resultado
}

export const formatearSoles = (monto) => `S/ ${monto.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

export const formatearFecha = (fecha) => {
  const [anio, mes, dia] = fecha.split('-')
  return `${dia}/${mes}/${anio}`
}

export const fechaDeHoy = () => {
  const hoy = new Date()
  const mes = hoy.getMonth() + 1
  const dia = hoy.getDate()
  return `${hoy.getFullYear()}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`
}

export const diasParaCierre = (convocatoria) => {
  const hoy = new Date(`${fechaDeHoy()}T00:00:00`)
  const cierre = new Date(`${convocatoria.fechaCierre}T00:00:00`)
  return Math.round((cierre - hoy) / (1000 * 60 * 60 * 24))
}

export const estaVigente = (convocatoria) => convocatoria.estado === 'publicada' && diasParaCierre(convocatoria) >= 0

export const textoCierre = (dias) => {
  if (dias === 0) return 'Cierra hoy'
  if (dias === 1) return 'Cierra mañana'
  return `Cierra en ${dias} días`
}
