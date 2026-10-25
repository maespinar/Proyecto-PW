import { useRef, useState } from 'react'
import DialogoPostulacion from './DialogoPostulacion'
import { ESTADOS_POSTULACION } from '../../HU-4/data/catalogos'
import { validarEdicionBandeja, validarNotaBandeja } from '../utils/bandejaUtils'

export default function DialogosBandeja({ accion, convocatoria, ocupado, error, onCerrar, onGuardar }) {
  const [nota, setNota] = useState(accion.postulante?.nota || '')
  const [formulario, setFormulario] = useState({
    puesto: convocatoria.puesto, descripcion: convocatoria.descripcion,
    fechaPublicacion: convocatoria.fechaPublicacion, fechaCierre: convocatoria.fechaCierre, vacantes: convocatoria.vacantes,
  })
  const [errores, setErrores] = useState({})
  const formularioRef = useRef(null)

  const titulos = {
    estado: 'Confirmar cambio de estado', nota: 'Nota interna',
    editar: 'Editar convocatoria', cerrar: '¿Cerrar convocatoria?',
  }

  const guardar = (evento) => {
    evento.preventDefault()
    const nuevos = accion.tipo === 'editar' ? validarEdicionBandeja(formulario)
      : accion.tipo === 'nota' && validarNotaBandeja(nota) ? { nota: validarNotaBandeja(nota) } : {}
    setErrores(nuevos)
    if (Object.keys(nuevos).length) {
      formularioRef.current.elements.namedItem(Object.keys(nuevos)[0])?.focus()
      return
    }
    onGuardar(accion.tipo === 'nota' ? nota : formulario)
  }

  const cambiarCampo = (evento) => {
    const datos = { ...formulario, [evento.target.name]: evento.target.value }
    setFormulario(datos)
    setErrores(validarEdicionBandeja(datos))
  }

  return (
    <DialogoPostulacion titulo={titulos[accion.tipo]} idTitulo="bp-dialogo-titulo" ocupado={ocupado} onCerrar={onCerrar}>
      <form onSubmit={guardar} ref={formularioRef} noValidate>
        <div className="hu5-modal-body">
          {accion.tipo === 'estado' && <p>Se actualizarán <strong>{accion.ids.length}</strong> postulaciones a <strong>{ESTADOS_POSTULACION[accion.estado]}</strong>. El cambio es local y no genera correos.</p>}
          {accion.tipo === 'cerrar' && <p>Se marcará «{convocatoria.puesto}» como cerrada en esta bandeja. Esta simulación no modifica el catálogo público ni envía avisos.</p>}
          {accion.tipo === 'nota' && <>
            <p>Nota sobre <strong>{accion.postulante.nombre}</strong>. Solo se muestra en el panel de empresa.</p>
            <label htmlFor="bp-nota">Nota interna</label>
            <textarea id="bp-nota" name="nota" className="form-control" rows="6" maxLength={2000} value={nota} disabled={ocupado} aria-invalid={Boolean(errores.nota)} aria-describedby="bp-nota-ayuda bp-nota-error" onChange={(evento) => { setNota(evento.target.value); setErrores({ nota: validarNotaBandeja(evento.target.value) }) }} onBlur={() => setErrores({ nota: validarNotaBandeja(nota) })} />
            <p id="bp-nota-ayuda" className="hu5-help-note">{nota.length} / 2000 caracteres</p>
            <p id="bp-nota-error" className="text-danger">{errores.nota}</p>
          </>}
          {accion.tipo === 'editar' && <>
            <p className="hu5-nota-simulacion">Los cambios se guardan solo en la bandeja local. El catálogo público mantiene sus datos semilla.</p>
            {[['puesto', 'Título del puesto', 'text'], ['descripcion', 'Descripción', 'textarea'], ['fechaCierre', 'Fecha de cierre', 'date'], ['vacantes', 'Vacantes', 'number']].map(([nombre, etiqueta, tipo]) => (
              <div key={nombre} className="bp-campo-edicion">
                <label htmlFor={`bp-${nombre}`}>{etiqueta}</label>
                {tipo === 'textarea' ? <textarea id={`bp-${nombre}`} name={nombre} className="form-control" value={formulario[nombre]} disabled={ocupado} aria-invalid={Boolean(errores[nombre])} aria-describedby={errores[nombre] ? `bp-error-${nombre}` : undefined} onChange={cambiarCampo} onBlur={() => setErrores(validarEdicionBandeja(formulario))} /> :
                  <input id={`bp-${nombre}`} name={nombre} className="form-control" type={tipo} min={tipo === 'number' ? 1 : undefined} value={formulario[nombre]} disabled={ocupado} aria-invalid={Boolean(errores[nombre])} aria-describedby={errores[nombre] ? `bp-error-${nombre}` : undefined} onChange={cambiarCampo} onBlur={() => setErrores(validarEdicionBandeja(formulario))} />}
                {errores[nombre] && <p id={`bp-error-${nombre}`} className="text-danger">{errores[nombre]}</p>}
              </div>
            ))}
          </>}
          {error && <p role="alert" className="alert alert-danger">{error}</p>}
          {ocupado && <p role="status">Guardando cambio local…</p>}
        </div>
        <div className="hu5-modal-footer">
          <button data-foco-inicial type="button" className="hu5-btn-outline" disabled={ocupado} onClick={onCerrar}>Cancelar</button>
          <button type="submit" className={accion.tipo === 'cerrar' || accion.estado === 'descartada' ? 'hu5-btn-primary hu5-confirmar-retiro' : 'hu5-btn-primary'} disabled={ocupado}>{ocupado ? 'Guardando…' : accion.tipo === 'cerrar' ? 'Cerrar convocatoria' : 'Confirmar y guardar'}</button>
        </div>
      </form>
    </DialogoPostulacion>
  )
}
