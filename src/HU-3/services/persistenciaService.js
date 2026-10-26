// Persistencia de la demostración de HU-3; sustituible por una API.
import empresaSemilla from '../data/empresa.seed.json'
import convocatoriasSemilla from '../data/convocatorias.seed.json'
import empresas from '../../HU-4/data/empresas'
import { TAMANOS_EMPRESA } from '../../HU-1/data/catalogosEmpresa'

export const empresaInicial = { ...empresaSemilla, ...empresas.find(empresa => empresa.id === 'e01') }
export const convocatoriasIniciales = convocatoriasSemilla

function leer(clave, inicial, validar) {
  try {
    const texto = localStorage.getItem(clave)
    const datos = texto === null ? structuredClone(inicial) : JSON.parse(texto)
    if (!validar(datos)) throw new Error()
    return datos
  } catch {
    throw new Error('No se pudieron leer los datos locales de empresa. Revisa el almacenamiento y reintenta.')
  }
}

function guardar(clave, datos) {
  try {
    localStorage.setItem(clave, JSON.stringify(datos))
  } catch {
    throw new Error('No se pudo guardar el cambio local. Revisa el espacio o los permisos de almacenamiento y reintenta.')
  }
}

export function leerEmpresa() {
  const datos = leer('hu3_empresa', empresaInicial, datos => datos &&
    Object.keys(empresaSemilla).every(campo => typeof datos[campo] === 'string'))
  const tamano = TAMANOS_EMPRESA.find(item => item.valor === datos.tamano || item.etiqueta === datos.tamano)?.valor || empresaInicial.tamano
  return { ...datos, tamano }
}

export function guardarEmpresa(datos) {
  guardar('hu3_empresa', datos)
}

export function leerConvocatorias() {
  return leer('hu3_convocatorias', convocatoriasIniciales, datos => Array.isArray(datos) && datos.every(item => item &&
    Number.isInteger(item.id) && ['puesto', 'carreras', 'publicacion', 'cierre'].every(campo => typeof item[campo] === 'string') &&
    ['Vigente', 'Cerrada', 'Borrador'].includes(item.estado) && Number.isInteger(item.postulantes) && item.postulantes >= 0) &&
    new Set(datos.map(item => item.id)).size === datos.length)
}

export function guardarConvocatorias(datos) {
  guardar('hu3_convocatorias', datos)
}
