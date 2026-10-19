import { useCallback, useRef, useState } from 'react'
import { usePerfil } from '../context/perfilContexto'
import { NIVELES, claseNivel, ordenarPorNivel } from '../utils/habilidades'
import FormularioHabilidad from '../components/FormularioHabilidad'
import DialogoConfirmacion from '../components/DialogoConfirmacion'
import EstadoVacio from '../components/EstadoVacio'
import Cargando from '../components/Cargando'

const MENSAJES = {
  DUPLICADA: 'Ya registraste esta habilidad.',
  LIMITE: 'Llegaste al máximo de 20 habilidades.',
}
const mensajeDeError = (error) => MENSAJES[error.message] ?? 'No se pudo completar la acción. Inténtalo de nuevo.'

export default function Habilidades() {
  const { perfil, cargando, agregarHabilidad, cambiarNivelHabilidad, eliminarHabilidad, notificar } = usePerfil()
  const inputRef = useRef(null)
  const [porEliminar, setPorEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const cerrarDialogo = useCallback(() => setPorEliminar(null), [])

  if (cargando || !perfil) return <Cargando />

  async function agregar({ nombre, nivel }) {
    try {
      await agregarHabilidad({ nombre, nivel })
      notificar(`Agregaste ${nombre.trim()} a tus habilidades.`)
      return true
    } catch (error) {
      notificar(mensajeDeError(error), 'danger')
      return false
    }
  }

  async function cambiarNivel(habilidad, nivel) {
    try {
      await cambiarNivelHabilidad(habilidad.id, nivel)
      notificar(`${habilidad.nombre} ahora figura con nivel ${nivel.toLowerCase()}.`)
    } catch (error) {
      notificar(mensajeDeError(error), 'danger')
    }
  }

  async function confirmarEliminar() {
    setEliminando(true)
    try {
      await eliminarHabilidad(porEliminar.id)
      notificar(`Eliminaste ${porEliminar.nombre} de tus habilidades.`)
      setPorEliminar(null)
    } catch (error) {
      notificar(mensajeDeError(error), 'danger')
    } finally {
      setEliminando(false)
    }
  }

  const habilidades = ordenarPorNivel(perfil.habilidades)

  return (
    <>
      <div className="mb-3">
        <p className="small text-muted mb-1">Inicio · Mi perfil · <strong>Habilidades</strong></p>
        <h1 className="h2 titulo-hu2 mb-0">Habilidades</h1>
      </div>

      <FormularioHabilidad
        carrera={perfil.carrera}
        registradas={perfil.habilidades}
        onAgregar={agregar}
        inputRef={inputRef}
      />

      {habilidades.length === 0 ? (
        <EstadoVacio
          icono="+"
          titulo="Aún no registras habilidades"
          texto="Las empresas filtran postulantes por habilidad. Agrega al menos tres para aparecer en más búsquedas."
          textoBoton="Agregar mi primera habilidad"
          onAccion={() => inputRef.current?.focus()}
        />
      ) : (
        <div className="tarjeta-hu2 p-4">
          <h2 className="h5 titulo-hu2">Mis habilidades</h2>
          <ul className="list-unstyled d-flex flex-wrap gap-2 mb-3">
            {habilidades.map((habilidad) => (
              <li key={habilidad.id} className="chip-habilidad">
                <span className="fw-semibold">{habilidad.nombre}</span>
                <select
                  className={`nivel-select ${claseNivel(habilidad.nivel)}`}
                  value={habilidad.nivel}
                  onChange={(evento) => cambiarNivel(habilidad, evento.target.value)}
                  aria-label={`Nivel de dominio de ${habilidad.nombre}`}
                >
                  {NIVELES.map((nivel) => <option key={nivel} value={nivel}>{nivel}</option>)}
                </select>
                <button
                  type="button"
                  className="btn-quitar"
                  aria-label={`Quitar ${habilidad.nombre}`}
                  onClick={() => setPorEliminar(habilidad)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <p className="small text-muted mb-0">
            Las empresas ven tus habilidades ordenadas por nivel en tu perfil público.
          </p>
        </div>
      )}

      {porEliminar && (
        <DialogoConfirmacion
          titulo="Eliminar habilidad"
          mensaje={`¿Quieres eliminar ${porEliminar.nombre} de tus habilidades? Podrás volver a agregarla cuando quieras.`}
          ocupado={eliminando}
          onConfirmar={confirmarEliminar}
          onCancelar={cerrarDialogo}
        />
      )}
    </>
  )
}
