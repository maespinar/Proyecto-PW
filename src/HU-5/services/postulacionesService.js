// Capa de acceso a datos de HU-5 (Postulaciones).
// En la Entrega 1: los datos se manejan íntegramente en el front (JSON semilla + localStorage).
// En la Entrega 2: se conectará a la API REST sin cambiar los componentes de UI.

import seed from '../data/postulaciones.seed.json'
import convocatoriasSeed from '../data/convocatoriasDisponibles.json'

const CLAVE_POSTULACIONES = 'hu5_postulaciones'

function leer() {
  try {
    const guardado = localStorage.getItem(CLAVE_POSTULACIONES)
    if (guardado) return JSON.parse(guardado)
  } catch {
    // Si localStorage no está disponible o falla el parseo
  }
  return structuredClone(seed)
}

let postulaciones = leer()

function persistir() {
  try {
    localStorage.setItem(CLAVE_POSTULACIONES, JSON.stringify(postulaciones))
  } catch {
    // Si el almacenamiento está lleno o deshabilitado
  }
}

const espera = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

export async function obtenerPostulaciones() {
  await espera()
  return structuredClone(postulaciones)
}

export async function obtenerPostulacionPorId(id) {
  await espera()
  const encontrada = postulaciones.find((p) => p.id === id)
  return encontrada ? structuredClone(encontrada) : null
}

export async function obtenerConvocatoriasDisponibles() {
  await espera()
  return structuredClone(convocatoriasSeed)
}

export async function crearPostulacion({
  convocatoriaId,
  puesto,
  empresa,
  empresaSiglas,
  rubro,
  modalidad,
  jornada,
  distrito,
  subvencion,
  fechaCierre,
  mensaje = '',
  perfilResumen,
}) {
  await espera()

  // Validación: No se admite postular dos veces a la misma convocatoria (HU-5)
  const yaExiste = postulaciones.some(
    (p) => p.convocatoriaId === convocatoriaId && p.estado !== 'retirada'
  )
  if (yaExiste) {
    throw new Error('Ya cuentas con una postulación activa a esta convocatoria.')
  }

  const hoy = new Date()
  const dia = String(hoy.getDate()).padStart(2, '0')
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  const anio = hoy.getFullYear()
  const hora = String(hoy.getHours()).padStart(2, '0')
  const minutos = String(hoy.getMinutes()).padStart(2, '0')

  const fechaFormato = `${dia}/${mes}/${anio}`
  const fechaHoraFormato = `${fechaFormato} · ${hora}:${minutos}`

  const nuevaPostulacion = {
    id: `post-${Date.now()}`,
    convocatoriaId: convocatoriaId || `conv-${Date.now()}`,
    puesto: puesto || 'Practicante',
    empresa: empresa || 'Empresa Empleadora',
    empresaSiglas: empresaSiglas || empresa?.slice(0, 2)?.toUpperCase() || 'EM',
    rubro: rubro || 'Tecnología',
    modalidad: modalidad || 'Híbrido',
    jornada: jornada || 'Medio tiempo',
    distrito: distrito || 'Lima',
    subvencion: Number(subvencion) || 1500,
    fechaPostulacion: fechaFormato,
    fechaActualizacion: fechaFormato,
    estado: 'recibida',
    estadoTexto: 'Recibida',
    fechaCierre: fechaCierre || '30/10/2026',
    mensaje: mensaje.trim(),
    perfilResumen: perfilResumen || {
      estudiante: 'Mariana Lucía Quispe Ramírez',
      carrera: 'Ingeniería de Sistemas',
      ciclo: 'Octavo ciclo',
      habilidadesCount: 9,
      experienciasCount: 3,
      enlacesCount: 2,
    },
    trazabilidad: [
      {
        estado: 'recibida',
        titulo: 'Recibida',
        fecha: fechaHoraFormato,
        descripcion: 'la empresa recibió tu perfil y tu mensaje.',
      },
      {
        estado: 'en_revision',
        titulo: 'En revisión',
        fecha: 'Pendiente',
        descripcion: 'el equipo de selección evaluará tu perfil próximamente.',
      },
      {
        estado: 'resultado',
        titulo: 'Resultado',
        fecha: 'Pendiente',
        descripcion: 'te avisaremos por correo cuando la empresa decida.',
      },
    ],
  }

  postulaciones = [nuevaPostulacion, ...postulaciones]
  persistir()
  return structuredClone(nuevaPostulacion)
}

export async function retirarPostulacion(id) {
  await espera()

  const index = postulaciones.findIndex((p) => p.id === id)
  if (index === -1) {
    throw new Error('Postulación no encontrada.')
  }

  const hoy = new Date()
  const dia = String(hoy.getDate()).padStart(2, '0')
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  const anio = hoy.getFullYear()
  const hora = String(hoy.getHours()).padStart(2, '0')
  const minutos = String(hoy.getMinutes()).padStart(2, '0')
  const fechaHora = `${dia}/${mes}/${anio} · ${hora}:${minutos}`

  const post = postulaciones[index]

  const nuevaTrazabilidad = [
    ...post.trazabilidad.filter((t) => t.estado !== 'resultado'),
    {
      estado: 'retirada',
      titulo: 'Retirada por ti',
      fecha: fechaHora,
      descripcion: 'retiraste voluntariamente tu postulación a esta vacante.',
    },
  ]

  const actualizada = {
    ...post,
    estado: 'retirada',
    estadoTexto: 'Retirada',
    fechaActualizacion: `${dia}/${mes}/${anio}`,
    trazabilidad: nuevaTrazabilidad,
  }

  postulaciones[index] = actualizada
  persistir()
  return structuredClone(actualizada)
}

export async function restablecerPostulaciones() {
  await espera()
  postulaciones = structuredClone(seed)
  persistir()
  return structuredClone(postulaciones)
}
