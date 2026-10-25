import convocatorias from '../../HU-4/data/convocatorias'
import { normalizar } from '../../HU-4/utils/catalogoUtils'

export const ESTADOS_BANDEJA = {
  recibida: 'Recibidas',
  en_revision: 'En revisión',
  aceptada: 'Aceptadas',
  descartada: 'Descartadas',
  retirada: 'Retiradas',
}

export const POR_PAGINA_BANDEJA = 12

export function filtrosDesdeParametros(parametros) {
  return {
    texto: parametros.get('q') || '',
    estado: Object.hasOwn(ESTADOS_BANDEJA, parametros.get('estado')) ? parametros.get('estado') : '',
    ciclo: ['6', '7', '8', '9', '10'].includes(parametros.get('ciclo')) ? parametros.get('ciclo') : '',
    orden: ['antiguas', 'nombre'].includes(parametros.get('orden')) ? parametros.get('orden') : 'recientes',
  }
}

export function esGestionEmpresaValida(datos) {
  const objeto = (valor) => valor && typeof valor === 'object' && !Array.isArray(valor)
  if (!objeto(datos) || ['estados', 'notas', 'convocatorias'].some((campo) => !objeto(datos[campo]))) return false
  const estadosValidos = Object.values(datos.estados).every((item) => objeto(item) &&
    ['empresaId', 'convocatoriaId', 'texto', 'fecha'].every((campo) => typeof item[campo] === 'string') &&
    ['en_revision', 'aceptada', 'descartada'].includes(item.estado) && Array.isArray(item.historial) &&
    item.historial.every((paso) => objeto(paso) && ['estado', 'titulo', 'fecha', 'descripcion'].every((campo) => typeof paso[campo] === 'string')))
  const notasValidas = Object.values(datos.notas).every((item) => objeto(item) &&
    ['empresaId', 'convocatoriaId', 'texto'].every((campo) => typeof item[campo] === 'string') && item.texto.length <= 2000)
  const convocatoriasValidas = Object.values(datos.convocatorias).every((item) => objeto(item) && typeof item.empresaId === 'string' &&
    objeto(item.datos) && ['puesto', 'descripcion', 'fechaPublicacion', 'fechaCierre'].every((campo) => typeof item.datos[campo] === 'string') &&
    Array.isArray(item.datos.carreras) && item.datos.carreras.every((carrera) => typeof carrera === 'string') &&
    Number.isInteger(item.datos.vacantes) && item.datos.vacantes > 0 && ['publicada', 'cerrada'].includes(item.datos.estado))
  return estadosValidos && notasValidas && convocatoriasValidas
}

export function convocatoriasDeEmpresa(empresaId) {
  return convocatorias.filter((item) => item.empresaId === empresaId && item.estado !== 'borrador')
}

export function buscarConvocatoriaPropia(puesto, empresaId) {
  return convocatoriasDeEmpresa(empresaId).find((item) => item.puesto === puesto)
}

export function filtrarPostulantes(lista, { texto, estado, ciclo, orden }) {
  const busqueda = normalizar(texto.trim())
  const filtrados = lista.filter((item) =>
    normalizar(item.nombre).includes(busqueda) &&
    (!estado || item.estado === estado) && (!ciclo || item.ciclo === Number(ciclo)))
  return filtrados.sort((a, b) => {
    if (orden === 'nombre') return a.nombre.localeCompare(b.nombre, 'es')
    const diferencia = a.fechaPostulacion.localeCompare(b.fechaPostulacion)
    return orden === 'antiguas' ? diferencia : -diferencia
  })
}

export function contarEstados(lista) {
  return Object.fromEntries(Object.keys(ESTADOS_BANDEJA).map((estado) => [estado, lista.filter((item) => item.estado === estado).length]))
}

export function validarEdicionBandeja(datos) {
  const errores = {}
  if (!datos.puesto.trim()) errores.puesto = 'Escribe el título del puesto.'
  if (!datos.descripcion.trim()) errores.descripcion = 'Escribe una descripción.'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datos.fechaCierre) || datos.fechaCierre < datos.fechaPublicacion) errores.fechaCierre = 'El cierre debe ser igual o posterior a la publicación.'
  if (!Number.isInteger(Number(datos.vacantes)) || Number(datos.vacantes) < 1) errores.vacantes = 'Indica al menos una vacante.'
  return errores
}

export function validarNotaBandeja(nota) {
  return nota.length > 2000 ? 'La nota no puede superar los 2000 caracteres.' : ''
}
