// Capa de acceso a datos de HU-2.
// Entrega 1: los datos viven en el front (JSON semilla + localStorage para que
// los cambios sobrevivan a recargar la página).
// Entrega 2: solo cambia el interior de estas funciones por llamadas a la API;
// los componentes no se tocan.
import seed from '../data/perfil.seed.json'

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

// Útil para volver a los datos de prueba durante el desarrollo.
export async function restablecerPerfil() {
  await espera()
  perfil = structuredClone(seed)
  persistir()
  return structuredClone(perfil)
}
