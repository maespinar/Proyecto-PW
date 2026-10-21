import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CampoClaveRegistro from './CampoClaveRegistro'
import CampoRegistro from './CampoRegistro'
import IndicadorFortalezaClave from './IndicadorFortalezaClave'
import NotificacionResultado from './NotificacionResultado'
import { guardarNuevaClave } from '../services/recuperacionService'
import { validarNuevaClave } from '../utils/validarRecuperacion'

export default function FormularioNuevaClave() {
  const [datos, setDatos] = useState({ clave: '', confirmacion: '' })
  const [revisados, setRevisados] = useState({})
  const [errores, setErrores] = useState({})
  const [guardando, setGuardando] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [notificacion, setNotificacion] = useState(null)
  const solicitud = useRef(null)
  const tituloExito = useRef(null)

  useEffect(() => () => solicitud.current?.abort(), [])
  useEffect(() => {
    if (guardado) tituloExito.current?.focus({ preventScroll: true })
  }, [guardado])

  function cambiarCampo(campo, valor) {
    const nuevosDatos = { ...datos, [campo]: valor }
    const validacion = validarNuevaClave(nuevosDatos)
    setDatos(nuevosDatos)
    setNotificacion(null)
    setErrores(anteriores => ({
      ...anteriores,
      [campo]: revisados[campo] ? validacion[campo] : undefined,
      ...(campo === 'clave' && (revisados.confirmacion || datos.confirmacion) ? { confirmacion: validacion.confirmacion } : {}),
    }))
  }

  function revisarCampo(campo) {
    setRevisados(anteriores => ({ ...anteriores, [campo]: true }))
    setErrores(anteriores => ({ ...anteriores, [campo]: validarNuevaClave(datos)[campo] }))
  }

  async function guardar(evento) {
    evento.preventDefault()
    if (solicitud.current) return
    const formulario = evento.currentTarget
    const nuevosErrores = validarNuevaClave(datos)
    setErrores(nuevosErrores)
    setRevisados({ clave: true, confirmacion: true })
    setNotificacion(null)
    if (Object.keys(nuevosErrores).length) {
      formulario.elements[Object.keys(nuevosErrores)[0]].focus()
      return
    }

    const controlador = new AbortController()
    solicitud.current = controlador
    setGuardando(true)
    try {
      await guardarNuevaClave(datos, controlador.signal)
      if (controlador.signal.aborted) return
      setDatos({ clave: '', confirmacion: '' })
      setGuardado(true)
    } catch {
      if (!controlador.signal.aborted) setNotificacion({ tipo: 'error', titulo: 'No se pudo guardar', detalle: 'Revisa tu conexión e inténtalo nuevamente. Conservamos los datos del formulario.' })
    } finally {
      solicitud.current = null
      if (!controlador.signal.aborted) setGuardando(false)
    }
  }

  if (guardado) {
    return (
      <div className="registro-formulario recuperacion-formulario recuperacion-confirmacion">
        <span className="registro-exito-icono" aria-hidden="true">✓</span>
        <h1 id="recuperacion-titulo" tabIndex={-1} ref={tituloExito}>Contraseña guardada · simulación</h1>
        <p className="recuperacion-descripcion" role="status">Completaste la demostración de recuperación. No se modificó ninguna cuenta ni se almacenó la contraseña.</p>
        <Link className="recuperacion-volver" to="/iniciar-sesion">Volver al inicio de sesión</Link>
      </div>
    )
  }

  return (
    <>
      <form className="registro-formulario recuperacion-formulario" onSubmit={guardar} noValidate aria-labelledby="recuperacion-titulo" aria-busy={guardando}>
        <h1 id="recuperacion-titulo" tabIndex={-1}>Crea una contraseña nueva</h1>
        <fieldset className="registro-campos" disabled={guardando}>
          <CampoClaveRegistro etiqueta="Nueva contraseña" valor={datos.clave} error={errores.clave} onChange={evento => cambiarCampo('clave', evento.target.value)} onBlur={() => revisarCampo('clave')} enviando={guardando} mostrarFortaleza={false} requisitosVisibles />
          <CampoRegistro nombre="confirmacion" etiqueta="Confirmar contraseña" error={errores.confirmacion}>
            <input id="registro-confirmacion" name="confirmacion" type="password" autoComplete="new-password" value={datos.confirmacion} onChange={evento => cambiarCampo('confirmacion', evento.target.value)} onBlur={() => revisarCampo('confirmacion')} required aria-invalid={Boolean(errores.confirmacion)} aria-describedby={errores.confirmacion ? 'registro-confirmacion-error' : undefined} />
            <IndicadorFortalezaClave valor={datos.clave} />
          </CampoRegistro>
          <button className="recuperacion-enviar" type="submit">
            {guardando && <span className="registro-spinner" aria-hidden="true" />}
            {guardando ? 'Guardando...' : 'Guardar contraseña'}
          </button>
        </fieldset>
        <p className="registro-estado" role="status">{guardando ? 'Procesando el cambio simulado…' : ''}</p>
      </form>
      <NotificacionResultado notificacion={notificacion} onCerrar={() => setNotificacion(null)} />
    </>
  )
}
