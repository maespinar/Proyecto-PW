import empresas from '../../HU-4/data/empresas.js'

export const SECTORES_EMPRESA = [...new Set(empresas.map(empresa => empresa.sector))]

// Conserva los valores de tamaño usados por las fichas públicas de HU-4.
export const TAMANOS_EMPRESA = [
  { valor: 'Pequeña', etiqueta: 'De 1 a 50 colaboradores' },
  { valor: 'Mediana', etiqueta: 'De 51 a 200 colaboradores' },
  { valor: 'Grande', etiqueta: 'Más de 200 colaboradores' },
]
