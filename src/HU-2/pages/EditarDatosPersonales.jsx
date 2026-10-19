import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePerfil } from '../context/perfilContexto'
import { CARRERAS, CICLOS, DISTRITOS } from '../data/catalogos'
import { MAX_RESUMEN, procesarFoto, validarDatosPersonales } from '../utils/validaciones'
import FotoPerfil from '../components/FotoPerfil'
import Cargando from '../components/Cargando'

function Campo({ id, etiqueta, error, ayuda, children }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label etiqueta-hu2">{etiqueta}</label>
      {children}
      {error && <div className="invalid-feedback d-block" id={`${id}-error`}>{error}</div>}
      {ayuda && !error && <div className="form-text">{ayuda}</div>}
    </div>
  )
}

function Formulario({ perfil }) {
  const { guardarDatosPersonales, notificar } = usePerfil()
  const inputFoto = useRef(null)

  const [form, setForm] = useState({
    nombres: perfil.nombres,
    apellidos: perfil.apellidos,
    telefono: perfil.telefono ?? '',
    distrito: perfil.distrito ?? '',
    carrera: perfil.carrera,
    ciclo: perfil.ciclo,
    resumen: perfil.resumen ?? '',
    foto: perfil.foto,
  })
  const [errores, setErrores] = useState({})
  const [errorFoto, setErrorFoto] = useState('')
  const [guardando, setGuardando] = useState(false)

  function cambiar(evento) {
    const { name, value } = evento.target
    setForm((actual) => ({ ...actual, [name]: value }))
    if (errores[name]) setErrores((actual) => ({ ...actual, [name]: undefined }))
  }

  async function elegirFoto(evento) {
    const archivo = evento.target.files[0]
    evento.target.value = ''
    if (!archivo) return
    const resultado = await procesarFoto(archivo)
    if (resultado.error) {
      setErrorFoto(resultado.error)
      return
    }
    setErrorFoto('')
    setForm((actual) => ({ ...actual, foto: resultado.dataUrl }))
  }

  function quitarFoto() {
    setErrorFoto('')
    setForm((actual) => ({ ...actual, foto: null }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const nuevosErrores = validarDatosPersonales(form)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) {
      notificar('Revisa los campos marcados antes de guardar.', 'danger')
      return
    }
    setGuardando(true)
    try {
      await guardarDatosPersonales({
        ...form,
        nombres: form.nombres.trim(),
        apellidos: form.apellidos.trim(),
        telefono: form.telefono.trim(),
        resumen: form.resumen.trim(),
      })
      notificar('Tus datos personales se guardaron correctamente.')
    } catch {
      notificar('No se pudieron guardar tus datos. Inténtalo de nuevo.', 'danger')
    } finally {
      setGuardando(false)
    }
  }

  const claseInput = (campo) => `form-control ${errores[campo] ? 'is-invalid' : ''}`
  const claseSelect = (campo) => `form-select ${errores[campo] ? 'is-invalid' : ''}`
  const excedido = form.resumen.length > MAX_RESUMEN

  return (
    <form onSubmit={enviar} noValidate>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <p className="small text-muted mb-1">Inicio · Mi perfil · <strong>Editar datos personales</strong></p>
          <h1 className="h2 titulo-hu2 mb-0">Editar datos personales</h1>
        </div>
        <div className="d-flex gap-2">
          <Link to="/perfil" className="btn btn-outline-secondary">Cancelar</Link>
          <button type="submit" className="btn btn-primary" disabled={guardando}>
            {guardando ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </div>

      <div className="tarjeta-hu2 p-4">
        <div className="d-flex flex-wrap gap-3 pb-3 mb-3 border-bottom">
          <FotoPerfil foto={form.foto} nombres={form.nombres} tamano={104} />
          <div>
            <p className="fw-semibold mb-1">Fotografía de perfil</p>
            <p className="small text-muted mb-2">JPG o PNG, mínimo 400 × 400 px, hasta 2 MB.</p>
            <input
              ref={inputFoto}
              type="file"
              accept="image/jpeg,image/png"
              className="d-none"
              onChange={elegirFoto}
              aria-label="Elegir fotografía"
            />
            <button type="button" className="btn btn-outline-primary btn-sm me-2" onClick={() => inputFoto.current.click()}>
              Subir nueva
            </button>
            {form.foto && (
              <button type="button" className="btn btn-link btn-sm text-danger" onClick={quitarFoto}>
                Quitar
              </button>
            )}
            {errorFoto && <div className="invalid-feedback d-block">{errorFoto}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <Campo id="nombres" etiqueta="Nombres" error={errores.nombres}>
              <input id="nombres" name="nombres" className={claseInput('nombres')} value={form.nombres} onChange={cambiar} aria-describedby="nombres-error" />
            </Campo>
          </div>
          <div className="col-12 col-md-6">
            <Campo id="apellidos" etiqueta="Apellidos" error={errores.apellidos}>
              <input id="apellidos" name="apellidos" className={claseInput('apellidos')} value={form.apellidos} onChange={cambiar} aria-describedby="apellidos-error" />
            </Campo>
          </div>
          <div className="col-12">
            <Campo id="correo" etiqueta="Correo institucional" ayuda="El correo no se puede modificar.">
              <input id="correo" className="form-control" value={perfil.correo} disabled readOnly />
            </Campo>
          </div>
          <div className="col-12 col-md-6">
            <Campo id="telefono" etiqueta="Teléfono" error={errores.telefono}>
              <input id="telefono" name="telefono" inputMode="tel" className={claseInput('telefono')} value={form.telefono} onChange={cambiar} aria-describedby="telefono-error" />
            </Campo>
          </div>
          <div className="col-12 col-md-6">
            <Campo id="distrito" etiqueta="Distrito de residencia" error={errores.distrito}>
              <select id="distrito" name="distrito" className={claseSelect('distrito')} value={form.distrito} onChange={cambiar}>
                <option value="">Selecciona un distrito</option>
                {DISTRITOS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </Campo>
          </div>
          <div className="col-12 col-md-6">
            <Campo id="carrera" etiqueta="Carrera" error={errores.carrera}>
              <select id="carrera" name="carrera" className={claseSelect('carrera')} value={form.carrera} onChange={cambiar} aria-describedby="carrera-error">
                <option value="">Selecciona tu carrera</option>
                {CARRERAS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Campo>
          </div>
          <div className="col-12 col-md-6">
            <Campo id="ciclo" etiqueta="Ciclo" error={errores.ciclo}>
              <select id="ciclo" name="ciclo" className={claseSelect('ciclo')} value={form.ciclo} onChange={cambiar} aria-describedby="ciclo-error">
                <option value="">Selecciona tu ciclo</option>
                {CICLOS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Campo>
          </div>
          <div className="col-12">
            <Campo id="resumen" etiqueta="Resumen profesional" error={errores.resumen}>
              <textarea id="resumen" name="resumen" rows={5} className={claseInput('resumen')} value={form.resumen} onChange={cambiar} aria-describedby="resumen-error resumen-contador" />
              <div className="d-flex justify-content-between small text-muted mt-1" id="resumen-contador">
                <span>Describe tu interés profesional en 2 o 3 frases.</span>
                <span className={excedido ? 'text-danger fw-semibold' : ''}>{form.resumen.length} / {MAX_RESUMEN}</span>
              </div>
            </Campo>
          </div>
        </div>
      </div>
    </form>
  )
}

export default function EditarDatosPersonales() {
  const { perfil, cargando } = usePerfil()
  if (cargando || !perfil) return <Cargando />
  return <Formulario perfil={perfil} />
}
