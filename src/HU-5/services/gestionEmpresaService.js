import { esGestionEmpresaValida } from '../utils/bandejaUtils'

const CLAVE = 'hu5_gestion_empresa'

export function leerGestionEmpresa() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (!guardado) return { estados: {}, notas: {}, convocatorias: {} }
    const datos = JSON.parse(guardado)
    if (!esGestionEmpresaValida(datos)) throw new Error()
    return datos
  } catch {
    throw new Error('No se pudieron leer los cambios de la bandeja. Revisa el almacenamiento y reintenta.')
  }
}

export function guardarGestionEmpresa(datos) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(datos))
  } catch {
    throw new Error('No se pudo guardar el cambio local. Revisa el espacio o los permisos de almacenamiento y reintenta.')
  }
}

// Solo devuelve estado y trazabilidad al estudiante; las notas son privadas del panel.
export function aplicarEstadoEmpresa(postulacion, gestion) {
  const cambio = gestion.estados[postulacion.id]
  if (!cambio || cambio.convocatoriaId !== postulacion.convocatoriaId || postulacion.estado === 'retirada') return postulacion
  return {
    ...postulacion,
    estado: cambio.estado,
    estadoTexto: cambio.texto,
    fechaActualizacion: cambio.fecha,
    trazabilidad: [
      ...postulacion.trazabilidad.filter((paso) => paso.fecha !== 'Pendiente' && paso.descripcion !== 'Cambio registrado por la empresa en la simulación local.'),
      ...(cambio.historial || []),
    ],
  }
}
