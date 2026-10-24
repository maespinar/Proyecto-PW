// Simulación local de HU-5. La API de la segunda entrega sustituirá esta capa.
import seed from '../data/postulaciones.seed.json'
import postulacionesCatalogo from '../../HU-4/data/postulaciones'
import { ESTADOS_POSTULACION } from '../../HU-4/data/catalogos'
import { estaVigente, formatearFecha } from '../../HU-4/utils/catalogoUtils'
import { obtenerPerfil } from '../../HU-2/services/perfilService'
import { obtenerConvocatoria, puedeRetirarPostulacion, resumirConvocatoria, resumirPerfil, sonPostulacionesValidas, validarMensaje, vincularConvocatoria } from '../utils/postulacionesUtils'

const CLAVE_POSTULACIONES = 'hu5_postulaciones'

const mostrarFecha = (fecha) => fecha.includes('-') ? formatearFecha(fecha) : fecha

function completarDatos(postulacion, estudianteId) {
  const vinculada = vincularConvocatoria(postulacion)
  const convocatoria = obtenerConvocatoria(vinculada.convocatoriaId)
  return {
    ...vinculada,
    estudianteId: vinculada.estudianteId || estudianteId,
    ...(convocatoria ? resumirConvocatoria(convocatoria) : {}),
    fechaPostulacion: mostrarFecha(vinculada.fechaPostulacion),
    fechaActualizacion: mostrarFecha(vinculada.fechaActualizacion || vinculada.fechaPostulacion),
    estadoTexto: ESTADOS_POSTULACION[vinculada.estado],
    trazabilidad: vinculada.trazabilidad?.map((paso) => ({
      ...paso,
      descripcion: paso.descripcion?.includes('correo')
        ? 'El resultado se consultará en esta demostración. No se envían correos.'
        : paso.descripcion,
    })) || [{
      estado: vinculada.estado,
      titulo: ESTADOS_POSTULACION[vinculada.estado],
      fecha: mostrarFecha(vinculada.fechaActualizacion || vinculada.fechaPostulacion),
      descripcion: 'Estado inicial de los datos semilla.',
    }],
  }
}

function leer(estudianteId) {
  let datos
  try {
    const guardado = localStorage.getItem(CLAVE_POSTULACIONES)
    datos = guardado === null ? structuredClone(seed) : JSON.parse(guardado)
    if (!sonPostulacionesValidas(datos)) {
      throw new Error('Formato inválido')
    }
  } catch {
    throw new Error('No se pudieron leer las postulaciones guardadas. Revisa el almacenamiento local y reintenta.')
  }
  if (datos.length === 0) return []
  const propias = datos.map((item) => completarDatos(item, estudianteId))
    .filter((item) => item.estudianteId === estudianteId)

  // Incorpora las postulaciones del estudiante que ya se muestran en HU-4,
  // sin duplicar las antiguas de HU-5 vinculadas a la misma convocatoria.
  for (const item of postulacionesCatalogo.filter((post) => post.estudianteId === estudianteId)) {
    if (!propias.some((post) => post.convocatoriaId === item.convocatoriaId)) {
      propias.push(completarDatos(item, estudianteId))
    }
  }
  return propias
}

function persistir(datos) {
  try {
    localStorage.setItem(CLAVE_POSTULACIONES, JSON.stringify(datos))
  } catch {
    throw new Error('No se pudo guardar el cambio local. Habilita el almacenamiento o libera espacio y reintenta.')
  }
}

function esperar(signal) {
  return new Promise((resolve, reject) => {
    signal?.throwIfAborted()
    const cancelar = () => {
      clearTimeout(temporizador)
      reject(signal.reason)
    }
    const temporizador = setTimeout(() => {
      signal?.removeEventListener('abort', cancelar)
      if (navigator.onLine === false) reject(new Error('Sin conexión. Vuelve a conectarte y reintenta la simulación.'))
      else resolve()
    }, 200)
    signal?.addEventListener('abort', cancelar, { once: true })
  })
}

function fechasActuales() {
  const hoy = new Date()
  const fecha = hoy.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const hora = hoy.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false })
  return { fecha, fechaHora: `${fecha} · ${hora}` }
}

export async function obtenerPostulaciones(estudianteId, signal) {
  await esperar(signal)
  return leer(estudianteId)
}

export async function crearPostulacion({ convocatoriaId, mensaje = '' }, estudianteId, signal) {
  const perfil = await obtenerPerfil()
  await esperar(signal)
  if (perfil.id !== estudianteId) throw new Error('No se encontró el perfil del estudiante.')
  const convocatoria = obtenerConvocatoria(convocatoriaId)
  if (!convocatoria || !estaVigente(convocatoria)) throw new Error('Esta convocatoria ya no admite postulaciones.')
  const error = validarMensaje(mensaje)
  if (error) throw new Error(error)
  const datos = leer(estudianteId)
  if (datos.some((post) => post.convocatoriaId === convocatoriaId)) {
    throw new Error('Ya postulaste a esta convocatoria. No puedes volver a postular, incluso si la retiraste.')
  }
  const { fecha, fechaHora } = fechasActuales()
  const nueva = {
    id: `post-${crypto.randomUUID()}`,
    estudianteId,
    ...resumirConvocatoria(convocatoria),
    fechaPostulacion: fecha,
    fechaActualizacion: fecha,
    estado: 'recibida',
    estadoTexto: 'Recibida',
    mensaje: mensaje.trim(),
    perfilResumen: resumirPerfil(perfil),
    trazabilidad: [
      { estado: 'recibida', titulo: 'Recibida', fecha: fechaHora, descripcion: 'Postulación registrada en la simulación local.' },
      { estado: 'en_revision', titulo: 'En revisión', fecha: 'Pendiente', descripcion: 'Todavía no se ha registrado una evaluación.' },
      { estado: 'resultado', titulo: 'Resultado', fecha: 'Pendiente', descripcion: 'El resultado se consultará aquí. No se envían correos.' },
    ],
  }
  persistir([nueva, ...datos])
  return nueva
}

export async function retirarPostulacion(id, estudianteId, signal) {
  await esperar(signal)
  const datos = leer(estudianteId)
  const postulacion = datos.find((item) => item.id === id)
  if (!postulacion) throw new Error('Postulación no encontrada.')
  if (!puedeRetirarPostulacion(postulacion)) throw new Error('Solo puedes retirar postulaciones recibidas o en revisión mientras la convocatoria siga vigente.')
  const { fecha, fechaHora } = fechasActuales()
  const actualizada = {
    ...postulacion,
    estado: 'retirada',
    estadoTexto: 'Retirada',
    fechaActualizacion: fecha,
    trazabilidad: [
      ...postulacion.trazabilidad.filter((paso) => paso.fecha !== 'Pendiente'),
      { estado: 'retirada', titulo: 'Retirada por ti', fecha: fechaHora, descripcion: 'Retiraste tu postulación en la simulación local.' },
    ],
  }
  persistir(datos.map((item) => item.id === id ? actualizada : item))
  return actualizada
}
