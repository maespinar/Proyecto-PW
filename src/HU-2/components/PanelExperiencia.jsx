import { useEffect, useRef, useState } from 'react'
import { MAX_DESCRIPCION, formatearMes, parsearMes } from '../utils/experiencia'
import { validarExperiencia } from '../utils/validaciones'
import Campo from './Campo'

// Panel lateral para agregar (experiencia = null) o editar una experiencia.
export default function PanelExperiencia({ experiencia, onGuardar, onCerrar }) {
  const editando = Boolean(experiencia)
  const primerCampo = useRef(null)

  const [form, setForm] = useState(() => ({
    cargo: experiencia?.cargo ?? '',
    organizacion: experiencia?.organizacion ?? '',
    desde: formatearMes(experiencia?.desde),
    hasta: formatearMes(experiencia?.hasta),
    actual: experiencia?.actual ?? false,
    descripcion: experiencia?.descripcion ?? '',
  }))
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    primerCampo.current?.focus()
    const alPresionar = (evento) => {
      if (evento.key === 'Escape') onCerrar()
    }
    document.addEventListener('keydown', alPresionar)
    return () => document.removeEventListener('keydown', alPresionar)
  }, [onCerrar])

  function cambiar(evento) {
    const { name, value, type, checked } = evento.target
    const nuevoValor = type === 'checkbox' ? checked : value
    setForm((actual) => ({
      ...actual,
      [name]: nuevoValor,
      ...(name === 'actual' && checked ? { hasta: '' } : {}),
    }))
    setErrores((actual) => ({ ...actual, [name]: undefined, ...(name === 'actual' ? { hasta: undefined } : {}) }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const nuevosErrores = validarExperiencia(form)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    setGuardando(true)
    setErrorGeneral('')
    try {
      await onGuardar({
        cargo: form.cargo.trim(),
        organizacion: form.organizacion.trim(),
        desde: parsearMes(form.desde),
        hasta: form.actual ? null : parsearMes(form.hasta),
        actual: form.actual,
        descripcion: form.descripcion.trim(),
      })
    } catch {
      setErrorGeneral('No se pudo guardar la experiencia. Inténtalo de nuevo.')
      setGuardando(false)
    }
  }

  const clase = (campo) => `form-control ${errores[campo] ? 'is-invalid' : ''}`

  return (
    <>
      <div className="offcanvas offcanvas-end show" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="panel-titulo">
        <form onSubmit={enviar} noValidate className="d-flex flex-column h-100">
          <div className="offcanvas-header border-bottom">
            <h2 className="offcanvas-title h5 titulo-hu2" id="panel-titulo">
              {editando ? 'Editar experiencia' : 'Agregar experiencia'}
            </h2>
            <button type="button" className="btn-close" aria-label="Cerrar panel" onClick={onCerrar} />
          </div>

          <div className="offcanvas-body">
            {errorGeneral && <div className="alert alert-danger" role="alert">{errorGeneral}</div>}

            <Campo id="exp-cargo" etiqueta="Cargo" error={errores.cargo}>
              <input ref={primerCampo} id="exp-cargo" name="cargo" className={clase('cargo')} value={form.cargo} onChange={cambiar} aria-describedby="exp-cargo-error" />
            </Campo>

            <Campo id="exp-organizacion" etiqueta="Organización" error={errores.organizacion}>
              <input id="exp-organizacion" name="organizacion" className={clase('organizacion')} value={form.organizacion} onChange={cambiar} aria-describedby="exp-organizacion-error" />
            </Campo>

            <div className="row">
              <div className="col-6">
                <Campo id="exp-desde" etiqueta="Desde" error={errores.desde}>
                  <input id="exp-desde" name="desde" placeholder="MM/AAAA" inputMode="numeric" className={clase('desde')} value={form.desde} onChange={cambiar} aria-describedby="exp-desde-error" />
                </Campo>
              </div>
              <div className="col-6">
                <Campo id="exp-hasta" etiqueta="Hasta" error={errores.hasta}>
                  <input id="exp-hasta" name="hasta" placeholder={form.actual ? '— — / — — — —' : 'MM/AAAA'} inputMode="numeric" className={clase('hasta')} value={form.hasta} onChange={cambiar} disabled={form.actual} aria-describedby="exp-hasta-error" />
                </Campo>
              </div>
            </div>

            <div className="form-check mb-3">
              <input id="exp-actual" name="actual" type="checkbox" className="form-check-input" checked={form.actual} onChange={cambiar} />
              <label htmlFor="exp-actual" className="form-check-label">Trabajo aquí actualmente</label>
            </div>

            <Campo id="exp-descripcion" etiqueta="Descripción" error={errores.descripcion}>
              <textarea id="exp-descripcion" name="descripcion" rows={5} className={clase('descripcion')} value={form.descripcion} onChange={cambiar} aria-describedby="exp-descripcion-error exp-descripcion-ayuda" />
              <div className="d-flex justify-content-between small text-muted mt-1" id="exp-descripcion-ayuda">
                <span>Describe tus funciones y un logro concreto.</span>
                <span className={form.descripcion.length > MAX_DESCRIPCION ? 'text-danger fw-semibold' : ''}>
                  {form.descripcion.length} / {MAX_DESCRIPCION}
                </span>
              </div>
            </Campo>
          </div>

          <div className="p-3 border-top d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1" disabled={guardando}>
              {guardando ? 'Guardando…' : 'Guardar experiencia'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={onCerrar} disabled={guardando}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <div className="offcanvas-backdrop fade show" onClick={onCerrar} />
    </>
  )
}
