import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { iniciarSesion, obtenerEstadoAcceso } from '../services/sesionService'

export default function FormularioInicioSesion({ onIniciarSesion }) {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [mostrarClave, setMostrarClave] = useState(false)
  const [errores, setErrores] = useState({})
  const [estado, setEstado] = useState('inactivo')
  const [acceso, setAcceso] = useState(obtenerEstadoAcceso)
  const solicitud = useRef(null)
  const cargando = estado === 'cargando'
  const bloqueado = Boolean(acceso.bloqueoHasta)
  const deshabilitado = cargando || bloqueado
  const errorCredenciales = estado === 'credenciales'
  const camposVacios = Object.values(errores).filter(error => error === 'Ingresa tu correo.' || error === 'Ingresa tu contraseña.').length

  useEffect(() => () => solicitud.current?.abort(), [])

  useEffect(() => {
    if (!acceso.bloqueoHasta) return
    const temporizador = setTimeout(() => {
      setAcceso(obtenerEstadoAcceso())
      setEstado('inactivo')
    }, Math.max(0, acceso.bloqueoHasta - Date.now()))
    return () => clearTimeout(temporizador)
  }, [acceso.bloqueoHasta])

  function cambiarCampo(campo, valor) {
    if (campo === 'correo') setCorreo(valor)
    else setClave(valor)
    setErrores(anteriores => ({ ...anteriores, [campo]: undefined }))
    setEstado('inactivo')
  }

  async function ingresar(evento) {
    evento.preventDefault()
    if (solicitud.current || deshabilitado) return

    const formulario = evento.currentTarget
    const nuevosErrores = {}
    if (!correo.trim()) nuevosErrores.correo = 'Ingresa tu correo.'
    else if (formulario.elements.correo.validity.typeMismatch) nuevosErrores.correo = 'Ingresa un correo válido.'
    if (!clave.trim()) nuevosErrores.clave = 'Ingresa tu contraseña.'
    setErrores(nuevosErrores)
    setEstado('inactivo')

    if (Object.keys(nuevosErrores).length) {
      formulario.elements[Object.keys(nuevosErrores)[0]].focus()
      return
    }

    const controlador = new AbortController()
    solicitud.current = controlador
    setMostrarClave(false)
    setEstado('cargando')

    try {
      const resultado = await iniciarSesion({ correo, clave }, controlador.signal)
      if (controlador.signal.aborted) return
      setAcceso(resultado)
      if (!resultado.acceso) {
        setEstado('credenciales')
        return
      }
      onIniciarSesion()
      navigate(state?.destino || '/perfil', { replace: true })
    } catch {
      if (!controlador.signal.aborted) setEstado('error')
    } finally {
      solicitud.current = null
    }
  }

  const mensajeAcceso = bloqueado
    ? 'Alcanzaste el límite de intentos. Espera 30 segundos para volver a intentarlo.'
    : `Correo o contraseña incorrectos. Te ${acceso.intentosRestantes === 1 ? 'queda 1 intento' : `quedan ${acceso.intentosRestantes} intentos`} antes del bloqueo temporal.`

  return (
    <form className="inicio-sesion-formulario" onSubmit={ingresar} noValidate aria-labelledby="formulario-sesion-titulo" aria-busy={cargando}>
      <h2 id="formulario-sesion-titulo">Inicia sesión</h2>
      {(errorCredenciales || bloqueado) ? (
        <div id="sesion-error" className="inicio-sesion-alerta" role="alert">
          <span aria-hidden="true">!</span>
          <p>{mensajeAcceso}</p>
        </div>
      ) : (
        <p className={`inicio-sesion-ayuda${Object.values(errores).some(Boolean) ? ' inicio-sesion-aviso' : ''}`} role="status">
          {camposVacios > 0
            ? `Completa ${camposVacios} ${camposVacios === 1 ? 'campo' : 'campos'} para continuar.`
            : Object.values(errores).some(Boolean)
              ? 'Revisa el campo señalado para continuar.'
              : 'Usa tu correo institucional o el correo de tu empresa.'}
        </p>
      )}

      <fieldset className="inicio-sesion-campos" disabled={deshabilitado}>
        <div className="inicio-sesion-campo">
          <label className="inicio-sesion-etiqueta" htmlFor="sesion-correo">Correo</label>
          <input id="sesion-correo" name="correo" type="email" autoComplete="username" placeholder="tu.correo@aloe.ulima.edu.pe" value={correo} onChange={evento => cambiarCampo('correo', evento.target.value)} required aria-invalid={Boolean(errores.correo || errorCredenciales || bloqueado)} aria-describedby={errores.correo ? 'sesion-correo-error' : errorCredenciales || bloqueado ? 'sesion-error' : undefined} />
          {errores.correo && <p id="sesion-correo-error" className="inicio-sesion-error">{errores.correo}</p>}
        </div>

        <div className="inicio-sesion-campo">
          <label className="inicio-sesion-etiqueta" htmlFor="sesion-clave">Contraseña</label>
          <div className="inicio-sesion-clave">
            <input id="sesion-clave" name="clave" type={mostrarClave ? 'text' : 'password'} autoComplete="current-password" value={clave} onChange={evento => cambiarCampo('clave', evento.target.value)} required aria-invalid={Boolean(errores.clave || errorCredenciales || bloqueado)} aria-describedby={errores.clave ? 'sesion-clave-error' : errorCredenciales || bloqueado ? 'sesion-error sesion-credenciales-ayuda' : undefined} />
            <button type="button" onClick={() => setMostrarClave(!mostrarClave)} aria-controls="sesion-clave" aria-pressed={mostrarClave}>
              {mostrarClave ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errores.clave && <p id="sesion-clave-error" className="inicio-sesion-error">{errores.clave}</p>}
          {(errorCredenciales || bloqueado) && <p id="sesion-credenciales-ayuda" className="inicio-sesion-error">{bloqueado ? 'Podrás intentarlo nuevamente al terminar el bloqueo.' : 'Verifica tus datos e inténtalo otra vez.'}</p>}
        </div>

        <div className="inicio-sesion-opciones">
          <label title="Disponible próximamente"><input type="checkbox" disabled /> Recordarme</label>
          {deshabilitado
            ? <span role="link" aria-disabled="true">¿Olvidaste tu contraseña?</span>
            : <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>}
        </div>

        {estado === 'error' && <p className="inicio-sesion-error" role="alert">No pudimos validar tus datos. Inténtalo nuevamente.</p>}
        <button type="submit" className="inicio-sesion-ingresar">
          {cargando && <span className="inicio-sesion-spinner" aria-hidden="true" />}
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </fieldset>
      <p className="inicio-sesion-estado" role="status">{cargando ? 'Campos y enlaces deshabilitados mientras se valida.' : bloqueado ? 'El formulario se habilitará automáticamente al terminar el bloqueo.' : ''}</p>

      <div className="inicio-sesion-registro">
        <p className="inicio-sesion-ayuda">¿Aún no tienes cuenta?</p>
        <div>
          {deshabilitado ? (
            <>
              <span role="link" aria-disabled="true">Registrarme como estudiante</span>
              <span role="link" aria-disabled="true">Registrar mi empresa</span>
            </>
          ) : (
            <>
              <Link to="/registro?tipo=estudiante">Registrarme como estudiante</Link>
              <Link to="/registro?tipo=empresa">Registrar mi empresa</Link>
            </>
          )}
        </div>
      </div>
    </form>
  )
}
