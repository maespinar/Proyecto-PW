import { HABILIDADES_GENERALES, HABILIDADES_POR_CARRERA } from '../data/catalogoHabilidades'

export const NIVELES = ['Básico', 'Intermedio', 'Avanzado']
export const MAX_HABILIDADES = 20

const PESO_NIVEL = { Avanzado: 3, Intermedio: 2, Básico: 1 }
const CLASE_NIVEL = { Avanzado: 'nivel-avanzado', Intermedio: 'nivel-intermedio', Básico: 'nivel-basico' }

export const claseNivel = (nivel) => CLASE_NIVEL[nivel]

// Quita tildes y mayúsculas para comparar ("Postgresql" = "PostgreSQL").
export function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

// Orden con el que las empresas ven las habilidades: de mayor a menor dominio.
export function ordenarPorNivel(habilidades) {
  return [...habilidades].sort((a, b) => PESO_NIVEL[b.nivel] - PESO_NIVEL[a.nivel])
}

export function sugerirHabilidades(texto, carrera, registradas) {
  const yaRegistradas = new Set(registradas.map(normalizar))
  const busqueda = normalizar(texto)
  const vistas = new Set()
  const base = [...(HABILIDADES_POR_CARRERA[carrera] ?? []), ...HABILIDADES_GENERALES]

  return base
    .filter((sugerencia) => {
      const clave = normalizar(sugerencia)
      if (vistas.has(clave) || yaRegistradas.has(clave)) return false
      vistas.add(clave)
      return busqueda === '' || clave.includes(busqueda)
    })
    .slice(0, 6)
}
