import convocatorias from '../../HU-4/data/convocatorias'
import empresas from '../../HU-4/data/empresas'
import postulacionesCatalogo from '../../HU-4/data/postulaciones'
import { estaVigente, formatearFecha } from '../../HU-4/utils/catalogoUtils'
import { ESTADOS_POSTULACION } from '../../HU-4/data/catalogos'

export function sonPostulacionesValidas(datos) {
  // Valida que cada postulación tenga los campos requeridos y que las fechas estén en formato ISO o DD/MM/YYYY
  const fechaValida = (fecha) => typeof fecha === 'string' && /^(\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})$/.test(fecha)
  return Array.isArray(datos) && datos.every((item) => item &&
    typeof item.id === 'string' && typeof item.convocatoriaId === 'string' &&
    Object.hasOwn(ESTADOS_POSTULACION, item.estado) && fechaValida(item.fechaPostulacion) &&
    (item.fechaActualizacion === undefined || fechaValida(item.fechaActualizacion)) &&
    (item.mensaje === undefined || typeof item.mensaje === 'string') &&
    ['puesto', 'empresa'].every((campo) => typeof item[campo] === 'string') &&
    ['empresaSiglas', 'rubro', 'modalidad', 'jornada', 'distrito', 'fechaCierre'].every((campo) => item[campo] === undefined || typeof item[campo] === 'string') &&
    (item.subvencion === undefined || (typeof item.subvencion === 'number' && Number.isFinite(item.subvencion))) &&
    (item.trazabilidad === undefined || (Array.isArray(item.trazabilidad) && item.trazabilidad.every((paso) =>
      paso && ['estado', 'titulo', 'fecha'].every((campo) => typeof paso[campo] === 'string') &&
      (paso.descripcion === undefined || typeof paso.descripcion === 'string')))) &&
    (!item.perfilResumen || (
      ['estudiante', 'carrera', 'ciclo'].every((campo) => typeof item.perfilResumen[campo] === 'string') &&
      ['habilidadesCount', 'experienciasCount', 'enlacesCount'].every((campo) => Number.isInteger(item.perfilResumen[campo]) && item.perfilResumen[campo] >= 0)
    )))
}

export function buscarPostulacion(postulaciones, id) {
  // Busca la postulación por id; si no se encuentra, busca la convocatoria vinculada y devuelve la postulación correspondiente.
  const encontrada = postulaciones.find((item) => item.id === id)
  if (encontrada) return encontrada
  const original = postulacionesCatalogo.find((item) => item.id === id)
  return original && postulaciones.find((item) => item.convocatoriaId === original.convocatoriaId && item.estudianteId === original.estudianteId)
}

export function obtenerConvocatoria(id) {
  return convocatorias.find((item) => item.id === id && item.estado !== 'borrador')
}

export function vincularConvocatoria(postulacion) {
  // Los ids antiguos solo se vinculan si coinciden tanto el puesto como la empresa.
  const convocatoria = obtenerConvocatoria(postulacion.convocatoriaId) || convocatorias.find((item) => (
    item.estado !== 'borrador' && item.puesto === postulacion.puesto &&
    empresas.find((empresa) => empresa.id === item.empresaId)?.nombreComercial === postulacion.empresa
  ))
  return convocatoria ? { ...postulacion, convocatoriaId: convocatoria.id } : postulacion
}

export function resumirConvocatoria(convocatoria) {
  const empresa = empresas.find((item) => item.id === convocatoria.empresaId)
  return {
    convocatoriaId: convocatoria.id,
    puesto: convocatoria.puesto,
    empresa: empresa.nombreComercial,
    empresaSiglas: empresa.iniciales,
    rubro: empresa.sector,
    modalidad: convocatoria.modalidad,
    jornada: convocatoria.jornada,
    distrito: convocatoria.distrito,
    subvencion: convocatoria.subvencion,
    fechaCierre: formatearFecha(convocatoria.fechaCierre),
  }
}

export function puedeRetirarPostulacion(postulacion) {
  const convocatoria = obtenerConvocatoria(postulacion.convocatoriaId)
  return ['recibida', 'en_revision'].includes(postulacion.estado) && Boolean(convocatoria && estaVigente(convocatoria))
}

export function rutaConvocatoria(postulacion) {
  return obtenerConvocatoria(postulacion.convocatoriaId) ? `/convocatorias/${postulacion.convocatoriaId}` : null
}

export function rutaSimilares(postulacion) {
  const carrera = postulacion.perfilResumen?.carrera || obtenerConvocatoria(postulacion.convocatoriaId)?.carreras[0]
  return carrera ? `/convocatorias?carrera=${encodeURIComponent(carrera)}` : '/convocatorias'
}

export function validarMensaje(mensaje) {
  return mensaje.length > 500 ? 'El mensaje no puede superar los 500 caracteres.' : ''
}

export function resumirPerfil(perfil) {
  return {
    estudiante: `${perfil.nombres} ${perfil.apellidos}`,
    carrera: perfil.carrera,
    ciclo: `${perfil.ciclo} ciclo`,
    habilidadesCount: perfil.habilidades.length,
    experienciasCount: perfil.experiencias.length,
    enlacesCount: perfil.enlaces.length,
  }
}

export function obtenerRecomendaciones(postulacion, postulaciones) {
  const carrera = postulacion.perfilResumen?.carrera
  return convocatorias.filter((item) => estaVigente(item) && item.id !== postulacion.convocatoriaId &&
    (!carrera || item.carreras.includes(carrera)) &&
    !postulaciones.some((post) => post.convocatoriaId === item.id)).slice(0, 3)
}

export function ultimaFechaActualizacion(postulaciones) {
  const fechas = postulaciones.map((item) => item.fechaActualizacion).filter(Boolean)
  fechas.sort((a, b) => a.split('/').reverse().join('').localeCompare(b.split('/').reverse().join('')))
  return fechas.at(-1)
}
