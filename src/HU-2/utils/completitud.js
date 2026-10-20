// Cada criterio aporta un peso; la suma de pesos es 100.
const CRITERIOS = [
  { etiqueta: 'una foto de perfil', peso: 10, ruta: '/perfil/editar', cumple: (p) => Boolean(p.foto) },
  { etiqueta: 'tu teléfono', peso: 10, ruta: '/perfil/editar', cumple: (p) => Boolean(p.telefono?.trim()) },
  { etiqueta: 'tu distrito de residencia', peso: 10, ruta: '/perfil/editar', cumple: (p) => Boolean(p.distrito) },
  { etiqueta: 'tu resumen profesional', peso: 20, ruta: '/perfil/editar', cumple: (p) => (p.resumen ?? '').trim().length >= 50 },
  { etiqueta: 'un enlace externo', peso: 10, ruta: '/perfil', cumple: (p) => (p.enlaces ?? []).length > 0 },
  { etiqueta: 'al menos tres habilidades', peso: 20, ruta: '/perfil/habilidades', cumple: (p) => (p.habilidades ?? []).length >= 3 },
  { etiqueta: 'tu experiencia', peso: 20, ruta: '/perfil/experiencia', cumple: (p) => (p.experiencias ?? []).length > 0 },
]

function unir(lista) {
  if (lista.length <= 1) return lista.join('')
  return `${lista.slice(0, -1).join(', ')} y ${lista[lista.length - 1]}`
}

export function calcularCompletitud(perfil) {
  const faltantes = CRITERIOS.filter((c) => !c.cumple(perfil))
  const porcentaje = CRITERIOS.reduce((total, c) => total + (c.cumple(perfil) ? c.peso : 0), 0)
  return {
    porcentaje,
    textoFaltantes: unir(faltantes.map((c) => c.etiqueta)),
    rutaSiguiente: faltantes[0]?.ruta ?? '/perfil',
    completo: faltantes.length === 0,
  }
}
