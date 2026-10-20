import { useCallback, useState } from 'react'
import { usePerfil } from '../context/perfilContexto'
import { ordenarExperiencias, textoPeriodo } from '../utils/experiencia'
import PanelExperiencia from '../components/PanelExperiencia'
import DialogoConfirmacion from '../components/DialogoConfirmacion'
import EstadoVacio from '../components/EstadoVacio'
import Cargando from '../components/Cargando'

export default function Experiencia() {
  const { perfil, cargando, agregarExperiencia, actualizarExperiencia, eliminarExperiencia, notificar } = usePerfil()
  const [panel, setPanel] = useState(null) // null = cerrado; { experiencia } = abierto
  const [porEliminar, setPorEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const cerrarPanel = useCallback(() => setPanel(null), [])
  const cerrarDialogo = useCallback(() => setPorEliminar(null), [])

  if (cargando || !perfil) return <Cargando />

  // Si falla, el error sube al panel, que lo muestra junto al formulario.
  async function guardar(datos) {
    if (panel.experiencia) {
      await actualizarExperiencia(panel.experiencia.id, datos)
      notificar(`Actualizaste la experiencia "${datos.cargo}".`)
    } else {
      await agregarExperiencia(datos)
      notificar(`Guardaste la experiencia "${datos.cargo}".`)
    }
    setPanel(null)
  }

  async function confirmarEliminar() {
    setEliminando(true)
    try {
      await eliminarExperiencia(porEliminar.id)
      notificar(`Eliminaste la experiencia "${porEliminar.cargo}".`)
      setPorEliminar(null)
    } catch {
      notificar('No se pudo eliminar la experiencia. Inténtalo de nuevo.', 'danger')
    } finally {
      setEliminando(false)
    }
  }

  const experiencias = ordenarExperiencias(perfil.experiencias)
  const abrirNueva = () => setPanel({ experiencia: null })

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <p className="small text-muted mb-1">Inicio · Mi perfil · <strong>Experiencia</strong></p>
          <h1 className="h2 titulo-hu2 mb-0">Experiencia</h1>
        </div>
        {experiencias.length > 0 && (
          <button type="button" className="btn btn-primary" onClick={abrirNueva}>+ Agregar experiencia</button>
        )}
      </div>

      {experiencias.length === 0 ? (
        <EstadoVacio
          icono="▤"
          titulo="Todavía no agregas experiencia"
          texto="Cuenta los proyectos de curso, los voluntariados y los trabajos de medio tiempo. No necesitas experiencia formal."
          textoBoton="Agregar experiencia"
          onAccion={abrirNueva}
        />
      ) : (
        <div className="tarjeta-hu2 p-4">
          <ul className="linea-tiempo">
            {experiencias.map((experiencia) => (
              <li key={experiencia.id}>
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-2">
                  <div>
                    <h2 className="h6 fw-bold mb-0 d-inline">{experiencia.cargo}</h2>
                    {experiencia.actual && <span className="badge-actual ms-2">Actualmente</span>}
                  </div>
                  <div className="d-flex gap-3">
                    <button type="button" className="btn-texto" aria-label={`Editar ${experiencia.cargo}`} onClick={() => setPanel({ experiencia })}>
                      Editar
                    </button>
                    <button type="button" className="btn-texto peligro" aria-label={`Eliminar ${experiencia.cargo}`} onClick={() => setPorEliminar(experiencia)}>
                      Eliminar
                    </button>
                  </div>
                </div>
                <p className="mb-0">{experiencia.organizacion}</p>
                <p className="small text-muted mb-1">{textoPeriodo(experiencia)}</p>
                {experiencia.descripcion && <p className="text-muted mb-0">{experiencia.descripcion}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {panel && (
        <PanelExperiencia
          key={panel.experiencia?.id ?? 'nueva'}
          experiencia={panel.experiencia}
          onGuardar={guardar}
          onCerrar={cerrarPanel}
        />
      )}

      {porEliminar && (
        <DialogoConfirmacion
          titulo="Eliminar experiencia"
          mensaje={`¿Quieres eliminar "${porEliminar.cargo}" de tu experiencia? Esta acción no se puede deshacer.`}
          ocupado={eliminando}
          onConfirmar={confirmarEliminar}
          onCancelar={cerrarDialogo}
        />
      )}
    </>
  )
}
