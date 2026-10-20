// Capa de acceso a datos de HU-2.
// Entrega 1: los datos viven en el front (JSON semilla + localStorage para que
// los cambios sobrevivan a recargar la página).
// Entrega 2: solo cambia el interior de estas funciones por llamadas a la API;
// los componentes no se tocan.
import seed from '../data/perfil.seed.json'
import { MAX_HABILIDADES, NIVELES, normalizar } from '../utils/habilidades'

const CLAVE = 'hu2_perfil'

function leer() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado) return JSON.parse(guardado)
  } catch {
    // si el almacenamiento falla, se usa la semilla
  }
  return structuredClone(seed)
}

let perfil = leer()

function persistir() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(perfil))
  } catch {
    // almacenamiento lleno o bloqueado: los datos siguen en memoria
  }
}

const espera = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms))

export async function obtenerPerfil() {
  await espera()
  return structuredClone(perfil)
}

export async function actualizarDatosPersonales(datos) {
  await espera()
  perfil = { ...perfil, ...datos }
  persistir()
  return structuredClone(perfil)
}

export async function agregarHabilidad({ nombre, nivel }) {
  await espera()
  const limpio = nombre.trim()
  if (!NIVELES.includes(nivel)) throw new Error('NIVEL_INVALIDO')
  if (perfil.habilidades.length >= MAX_HABILIDADES) throw new Error('LIMITE')
  if (perfil.habilidades.some((h) => normalizar(h.nombre) === normalizar(limpio))) throw new Error('DUPLICADA')
  const nueva = { id: `hab-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, nombre: limpio, nivel }
  perfil = { ...perfil, habilidades: [...perfil.habilidades, nueva] }
  persistir()
  return structuredClone(perfil)
}

export async function cambiarNivelHabilidad(id, nivel) {
  await espera()
  if (!NIVELES.includes(nivel)) throw new Error('NIVEL_INVALIDO')
  perfil = { ...perfil, habilidades: perfil.habilidades.map((h) => (h.id === id ? { ...h, nivel } : h)) }
  persistir()
  return structuredClone(perfil)
}

export async function eliminarHabilidad(id) {
  await espera()
  perfil = { ...perfil, habilidades: perfil.habilidades.filter((h) => h.id !== id) }
  persistir()
  return structuredClone(perfil)
}

const limpiarExperiencia = (datos) => ({ ...datos, hasta: datos.actual ? null : datos.hasta })

export async function agregarExperiencia(datos) {
  await espera()
  const nueva = { ...limpiarExperiencia(datos), id: `exp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` }
  perfil = { ...perfil, experiencias: [...perfil.experiencias, nueva] }
  persistir()
  return structuredClone(perfil)
}

export async function actualizarExperiencia(id, datos) {
  await espera()
  perfil = {
    ...perfil,
    experiencias: perfil.experiencias.map((e) => (e.id === id ? { ...e, ...limpiarExperiencia(datos) } : e)),
  }
  persistir()
  return structuredClone(perfil)
}

export async function eliminarExperiencia(id) {
  await espera()
  perfil = { ...perfil, experiencias: perfil.experiencias.filter((e) => e.id !== id) }
  persistir()
  return structuredClone(perfil)
}

// Útil para volver a los datos de prueba durante el desarrollo.
export async function restablecerPerfil() {
  await espera()
  perfil = structuredClone(seed)
  persistir()
  return structuredClone(perfil)
}
