import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CampoRegistro from './CampoRegistro'
import NotificacionResultado from './NotificacionResultado'
import { solicitarRecuperacion } from '../services/recuperacionService'
import { validarCorreoRecuperacion } from '../utils/validarRecuperacion'

export default function FormularioRecuperacion({ onSolicitar }) {
  const [correo, setCorreo] = useState('')
  const [error, setError] = useState('')
  const [revisado, setRevisado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [notificacion, setNotificacion] = useState(null)
  const solicitud = useRef(null)

  useEffect(() => () => solicitud.current?.abort(), [])

  function cambiarCorreo(evento) {
    const valor = evento.target.value
    setCorreo(valor)
    setNotificacion(null)
    if (revisado) setError(validarCorreoRecuperacion(valor))
  }

  async function enviar(evento) {
    evento.preventDefault()
    if (solicitud.current) return

    const formulario = evento.currentTarget
    const nuevoError = validarCorreoRecuperacion(correo)
    setRevisado(true)
    setError(nuevoError)
    setNotificacion(null)
    if (nuevoError) {
      formulario.elements.correo.focus()
      return
    }

    const controlador = new AbortController()
    solicitud.current = controlador
    setCargando(true)
    try {
      await solicitarRecuperacion(correo, controlador.signal)
      if (controlador.signal.aborted) return
      onSolicitar(correo.trim().toLowerCase())
    } catch {
      if (!controlador.signal.aborted) {
        setNotificacion({
          tipo: 'error',
          titulo: 'No se pudo completar la solicitud',
          detalle: 'Revisa tu conexión e inténtalo nuevamente. Conservamos el correo ingresado.',
        })
      }
    } finally {
      solicitud.current = null
      if (!controlador.signal.aborted) setCargando(false)
    }
  }

  return (
    <>
      <form className="registro-formulario recuperacion-formulario" onSubmit={enviar} noValidate aria-labelledby="recuperacion-titulo" aria-busy={cargando}>
        <h1 id="recuperacion-titulo">Recupera tu contraseña</h1>
        <p className="recuperacion-descripcion">Ingresa el correo con el que te registraste y te enviaremos un enlace para crear una contraseña nueva.</p>
        <fieldset className="registro-campos" disabled={cargando}>
          <CampoRegistro nombre="correo" etiqueta="Correo" ayuda="Usa el correo institucional o el correo de contacto de tu empresa." error={error}>
            <input
              id="registro-correo"
              name="correo"
              type="email"
              autoComplete="email"
              placeholder="mariana.quispe@aloe.ulima.edu.pe"
              value={correo}
              onChange={cambiarCorreo}
              onBlur={() => {
                setRevisado(true)
                setError(validarCorreoRecuperacion(correo))
              }}
              required
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'registro-correo-error' : 'registro-correo-ayuda'}
            />
          </CampoRegistro>
          <button className="recuperacion-enviar" type="submit">
            {cargando && <span className="registro-spinner" aria-hidden="true" />}
            {cargando ? 'Enviando solicitud...' : 'Enviar enlace de recuperación'}
          </button>
        </fieldset>
        <p className="registro-estado" role="status">{cargando ? 'Procesando la solicitud simulada…' : ''}</p>
        <Link className="recuperacion-volver" to="/iniciar-sesion">Volver al inicio de sesión</Link>
      </form>
      <NotificacionResultado notificacion={notificacion} onCerrar={() => setNotificacion(null)} />
    </>
  )
}
