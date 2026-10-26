import postulantesSeed from '../data/postulantesEmpresa'
import postulacionesCatalogo from '../../HU-4/data/postulaciones'
import { obtenerPerfil } from '../../HU-2/services/perfilService'
import { CICLOS } from '../../HU-2/data/catalogos'
import { obtenerPostulaciones } from './postulacionesService'
import { ESTADOS_POSTULACION } from '../../HU-4/data/catalogos'
import { convocatoriasDeEmpresa, validarEdicionBandeja, validarNotaBandeja } from '../utils/bandejaUtils'
import { leerGestionEmpresa, guardarGestionEmpresa } from './gestionEmpresaService'

// Simula 200 ms de demora asíncrona 
function esperar(signal) {
  return new Promise((resolve, reject) => {
    signal?.throwIfAborted()
    const cancelar = () => { clearTimeout(temporizador); reject(signal.reason) }
    const temporizador = setTimeout(() => {
      signal?.removeEventListener('abort', cancelar)
      if (navigator.onLine === false) reject(new Error('Sin conexión. Vuelve a conectarte y reintenta la simulación.'))
      else resolve()
    }, 200)
    signal?.addEventListener('abort', cancelar, { once: true })
  })
}

// Busca y actualiza la convocatoria solicitada asegurando que pertenezca a la empresa conectada.
function convocatoriaPropia(empresaId, convocatoriaId) {
  const original = convocatoriasDeEmpresa(empresaId).find((item) => item.id === convocatoriaId)
  if (!original) throw new Error('La convocatoria no está disponible para esta empresa.')
  const cambio = leerGestionEmpresa().convocatorias[convocatoriaId]
  return { ...original, ...(cambio?.empresaId === empresaId ? cambio.datos : {}) }
}

const fechaIso = (fecha) => fecha.includes('/') ? fecha.split('/').reverse().join('-') : fecha

// Obtiene la bandeja de postulantes de la convocatoria de la empresa, combinando los datos de HU-4 y HU-5
export async function obtenerBandeja(empresaId, convocatoriaId, signal) {
  await esperar(signal)
  const convocatoria = convocatoriaPropia(empresaId, convocatoriaId)
  const propias = await obtenerPostulaciones('est-001', signal)
  const perfilDemo = await obtenerPerfil()
  signal?.throwIfAborted()
  
    // Si es la convocatoria 'c01', usa los postulantes semilla detallados
  const semillas = convocatoriaId === 'c01' ? structuredClone(postulantesSeed) : postulacionesCatalogo
    .filter((item) => item.convocatoriaId === convocatoriaId && item.estudianteId !== 'est-001')
    .map((item, indice) => ({
      ...item, nombre: `Postulante de demostración ${indice + 1}`,
      carrera: convocatoria.carreras[0], ciclo: 8,
    }))
  for (const post of propias.filter((item) => item.convocatoriaId === convocatoriaId)) {
    const item = {
      ...post, nombre: post.perfilResumen?.estudiante || `${perfilDemo.nombres} ${perfilDemo.apellidos}`,
      carrera: post.perfilResumen?.carrera || perfilDemo.carrera,
      ciclo: CICLOS.indexOf((post.perfilResumen?.ciclo || perfilDemo.ciclo).replace(/ ciclo$/, '')) + 1 || 8,
      fechaPostulacion: fechaIso(post.fechaPostulacion),
    }
    const indice = semillas.findIndex((anterior) => anterior.estudianteId === post.estudianteId)
    if (indice < 0) semillas.push(item)
    else semillas[indice] = item


  }

  // aplica los cambios de estado y notas de la empresa a los postulantes
  const gestion = leerGestionEmpresa()
  const postulantes = semillas.map((item) => {
    const cambio = gestion.estados[item.id]
    return {
      ...item,
      ...(cambio?.empresaId === empresaId && cambio.convocatoriaId === convocatoriaId && item.estado !== 'retirada' ? { estado: cambio.estado } : {}),
      nota: gestion.notas[item.id]?.empresaId === empresaId ? gestion.notas[item.id].texto : '',
    }
  })
  return { convocatoria, postulantes }
}

export async function cambiarEstados(empresaId, convocatoriaId, ids, estado, signal) {
  if (!['en_revision', 'aceptada', 'descartada'].includes(estado)) throw new Error('Estado no permitido.')
  const bandeja = await obtenerBandeja(empresaId, convocatoriaId, signal)
  signal?.throwIfAborted()
  //valida que el candita exista y no haya retirado su postulación
  const seleccionadas = ids.map((id) => bandeja.postulantes.find((item) => item.id === id))
  if (!ids.length || seleccionadas.some((item) => !item || item.estado === 'retirada')) throw new Error('La selección contiene postulaciones no disponibles o retiradas.')
  const gestion = leerGestionEmpresa()
  const fecha = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  // Actualiza el estado de cada postulante seleccionado y registra el cambio en el historial
  for (const item of seleccionadas) {
    if (item.estado === estado) continue
    const paso = { estado, titulo: ESTADOS_POSTULACION[estado], fecha, descripcion: 'Cambio registrado por la empresa en la simulación local.' }
    gestion.estados[item.id] = {
      empresaId, convocatoriaId, estado, texto: ESTADOS_POSTULACION[estado], fecha,
      historial: [...(gestion.estados[item.id]?.historial || []), paso],
    }
  }
  //persistir los cambios en localStorage
  guardarGestionEmpresa(gestion)
  return { ids, estado }
}

//registro de notas internas
export async function guardarNota(empresaId, convocatoriaId, id, texto, signal) {
  const error = validarNotaBandeja(texto)
  if (error) throw new Error(error)
  const bandeja = await obtenerBandeja(empresaId, convocatoriaId, signal)
  if (!bandeja.postulantes.some((item) => item.id === id)) throw new Error('Postulante no encontrado.')
  signal?.throwIfAborted()
  const gestion = leerGestionEmpresa()
  gestion.notas[id] = { empresaId, convocatoriaId, texto: texto.trim() }
  guardarGestionEmpresa(gestion)
  return texto.trim()
  
}
//edición de convocatorias
export async function modificarConvocatoria(empresaId, convocatoriaId, datos, signal) {
  await esperar(signal)
  const actual = convocatoriaPropia(empresaId, convocatoriaId)
  const editada = {
    ...actual, puesto: datos.puesto.trim(), descripcion: datos.descripcion.trim(),
    fechaCierre: datos.fechaCierre, vacantes: Number(datos.vacantes),
  }
  const errores = validarEdicionBandeja(editada)
  if (Object.keys(errores).length) throw new Error(Object.values(errores)[0])
  const gestion = leerGestionEmpresa()
  gestion.convocatorias[convocatoriaId] = { empresaId, datos: editada }
  guardarGestionEmpresa(gestion)
  return editada
}

//cerrar convocatoria
export async function cerrarConvocatoria(empresaId, convocatoriaId, signal) {
  await esperar(signal)
  const actual = convocatoriaPropia(empresaId, convocatoriaId)
  if (actual.estado !== 'publicada') throw new Error('La convocatoria ya está cerrada.')
  const gestion = leerGestionEmpresa()
  gestion.convocatorias[convocatoriaId] = { empresaId, datos: { ...actual, estado: 'cerrada' } }
  guardarGestionEmpresa(gestion)
  return { ...actual, estado: 'cerrada' }
}

export async function obtenerPerfilPostulante(postulante, signal) {
  if (postulante.estudianteId === 'est-001') {
    const perfil = await obtenerPerfil()
    signal?.throwIfAborted()
    return perfil
  }
  await esperar(signal)
  const [nombres, ...apellidos] = postulante.nombre.split(' ')
  return {
    id: postulante.estudianteId, nombres, apellidos: apellidos.join(' '),
    correo: 'postulante@demo.example', telefono: '', distrito: '',
    carrera: postulante.carrera, ciclo: CICLOS[postulante.ciclo - 1], foto: null,
    resumen: 'Perfil ficticio de la primera entrega para revisar la bandeja de postulantes.',
    habilidades: [], experiencias: [], enlaces: [],
  }
}
