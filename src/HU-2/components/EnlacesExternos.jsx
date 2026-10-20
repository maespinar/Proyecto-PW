import { useCallback, useState } from 'react'
import { usePerfil } from '../context/perfilContexto'
import { MAX_ENLACES, TIPOS_ENLACE, hrefSeguro } from '../utils/enlaces'
import { validarEnlace } from '../utils/validaciones'
import Campo from './Campo'
import DialogoConfirmacion from './DialogoConfirmacion'

function FormularioEnlace({ inicial, enlaces, onGuardar, onCancelar }) {
  const [form, setForm] = useState({ tipo: inicial?.tipo ?? 'Portafolio', url: inicial?.url ?? '' })
  const [errores, setErrores] = useState({})
  const [guardando, setGuardando] = useState(false)

  function cambiar(evento) {
    const { name, value } = evento.target
    setForm((actual) => ({ ...actual, [name]: value }))
    setErrores((actual) => ({ ...actual, [name]: undefined }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const nuevosErrores = validarEnlace(form, enlaces, inicial?.id)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return
    setGuardando(true)
    const guardado = await onGuardar(form)
    if (!guardado) setGuardando(false)
  }

  return (
    <form onSubmit={enviar} noValidate className="formulario-enlace">
      <div className="row g-3">
        <div className="col-12 col-sm-4">
          <Campo id="enlace-tipo" etiqueta="Tipo" error={errores.tipo}>
            <select id="enlace-tipo" name="tipo" className="form-select" value={form.tipo} onChange={cambiar}>
              {TIPOS_ENLACE.map((tipo) => <option key={tipo} value={tipo}>{tipo}</option>)}
            </select>
          </Campo>
        </div>
        <div className="col-12 col-sm-8">
          <Campo id="enlace-url" etiqueta="Dirección" error={errores.url}>
            <input
              id="enlace-url"
              name="url"
              className={`form-control ${errores.url ? 'is-invalid' : ''}`}
              value={form.url}
              onChange={cambiar}
              placeholder="https://miportafolio.dev"
              autoFocus
              aria-describedby="enlace-url-error"
            />
          </Campo>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary btn-sm" disabled={guardando}>
          {guardando ? 'Guardando…' : 'Guardar enlace'}
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onCancelar} disabled={guardando}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default function EnlacesExternos({ enlaces }) {
  const { agregarEnlace, actualizarEnlace, eliminarEnlace, notificar } = usePerfil()
  const [edicion, setEdicion] = useState(null) // null = sin formulario; { enlace } = abierto
  const [porEliminar, setPorEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const cerrarDialogo = useCallback(() => setPorEliminar(null), [])

  async function guardar(datos) {
    try {
      if (edicion.enlace) {
        await actualizarEnlace(edicion.enlace.id, datos)
        notificar('Actualizaste el enlace.')
      } else {
        await agregarEnlace(datos)
        notificar('Agregaste el enlace a tu perfil.')
      }
      setEdicion(null)
      return true
    } catch (error) {
      notificar(
        error.message === 'LIMITE_ENLACES'
          ? `Llegaste al máximo de ${MAX_ENLACES} enlaces.`
          : 'No se pudo guardar el enlace. Inténtalo de nuevo.',
        'danger',
      )
      return false
    }
  }

  async function confirmarEliminar() {
    setEliminando(true)
    try {
      await eliminarEnlace(porEliminar.id)
      notificar('Eliminaste el enlace.')
      setPorEliminar(null)
    } catch {
      notificar('No se pudo eliminar el enlace. Inténtalo de nuevo.', 'danger')
    } finally {
      setEliminando(false)
    }
  }

  const puedeAgregar = !edicion && enlaces.length < MAX_ENLACES

  return (
    <div className="tarjeta-hu2 p-4">
      <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-3">
        <h2 className="h5 titulo-hu2 mb-0">Enlaces externos</h2>
        <span className="small text-muted">{enlaces.length} de {MAX_ENLACES} enlaces</span>
      </div>

      {enlaces.length === 0 && !edicion && (
        <p className="text-muted">Aún no agregas enlaces a tu portafolio o repositorio.</p>
      )}

      <ul className="list-unstyled row g-2 mb-0">
        {enlaces.map((enlace) => (
          <li key={enlace.id} className="col-12 col-sm-6">
            <div className="enlace-hu2 h-100">
              <span className="etiqueta-hu2 d-block">{enlace.tipo}</span>
              <a href={hrefSeguro(enlace.url) ?? undefined} target="_blank" rel="noopener noreferrer">{enlace.url}</a>
              <div className="d-flex gap-3 mt-1">
                <button type="button" className="btn-texto" aria-label={`Editar enlace ${enlace.tipo}`} onClick={() => setEdicion({ enlace })}>
                  Editar
                </button>
                <button type="button" className="btn-texto peligro" aria-label={`Quitar enlace ${enlace.tipo}`} onClick={() => setPorEliminar(enlace)}>
                  Quitar
                </button>
              </div>
            </div>
          </li>
        ))}
        {puedeAgregar && (
          <li className="col-12 col-sm-6">
            <button type="button" className="enlace-agregar" onClick={() => setEdicion({ enlace: null })}>
              + Agregar enlace
            </button>
          </li>
        )}
      </ul>

      {edicion && (
        <FormularioEnlace
          key={edicion.enlace?.id ?? 'nuevo'}
          inicial={edicion.enlace}
          enlaces={enlaces}
          onGuardar={guardar}
          onCancelar={() => setEdicion(null)}
        />
      )}

      {porEliminar && (
        <DialogoConfirmacion
          titulo="Quitar enlace"
          mensaje={`¿Quieres quitar el enlace de ${porEliminar.tipo} (${porEliminar.url}) de tu perfil?`}
          textoConfirmar="Quitar"
          ocupado={eliminando}
          onConfirmar={confirmarEliminar}
          onCancelar={cerrarDialogo}
        />
      )}
    </div>
  )
}
