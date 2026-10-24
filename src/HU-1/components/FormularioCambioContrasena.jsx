import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CampoRegistro from './CampoRegistro'
import NotificacionResultado from './NotificacionResultado'
import { validarCambioContrasena } from '../utils/validarCambioContrasena'
import { cambiarContrasena } from '../services/contrasenaService'

const DATOS_VACIOS = { claveActual: '', clave: '', confirmacion: '' }
const CAMPOS = [
  { nombre: 'claveActual', etiqueta: 'Contraseña actual', autoComplete: 'current-password' },
  { nombre: 'clave', etiqueta: 'Nueva contraseña', autoComplete: 'new-password', ayuda: 'Mínimo 8 caracteres, con una mayúscula y un número.' },
  { nombre: 'confirmacion', etiqueta: 'Confirmar nueva contraseña', autoComplete: 'new-password' },
]

export default function FormularioCambioContrasena({ correo, onCancelar }) {
  const [datos, setDatos] = useState(DATOS_VACIOS)
  const [revisados, setRevisados] = useState({})
  const [errorActual, setErrorActual] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [notificacion, setNotificacion] = useState(null)
  const solicitud = useRef(null)
  const formulario = useRef(null)
  const validacion = validarCambioContrasena(datos)
  const errores = Object.fromEntries(Object.entries(validacion).filter(([campo]) => revisados[campo]))
  if (errorActual) errores.claveActual = errorActual

  useEffect(() => () => solicitud.current?.abort(), [])

  function cambiarCampo(evento) {
    const { name, value } = evento.target
    setDatos(anteriores => ({ ...anteriores, [name]: value }))
    if (name === 'claveActual') setErrorActual('')
    if (name === 'clave' && datos.confirmacion) {
      setRevisados(anteriores => ({ ...anteriores, confirmacion: true }))
    }
    setNotificacion(null)
  }

  async function guardar(evento) {
    evento.preventDefault()
    if (solicitud.current) return
    setRevisados({ claveActual: true, clave: true, confirmacion: true })
    setNotificacion(null)
    const primerError = errorActual ? 'claveActual' : Object.keys(validacion)[0]
    if (primerError) {
      formulario.current.elements[primerError].focus()
      return
    }

    const controlador = new AbortController()
    solicitud.current = controlador
    setGuardando(true)
    try {
      const resultado = await cambiarContrasena(correo, datos, controlador.signal)
      if (controlador.signal.aborted) return
      if (!resultado.claveActualValida) {
        setErrorActual('La contraseña actual es incorrecta. Verifícala e inténtalo otra vez.')
        // El fieldset debe habilitarse antes de enfocar el campo.
        setNotificacion({ tipo: 'error', titulo: 'No se pudo guardar', detalle: 'Revisa la contraseña actual. Conservamos los datos para que puedas corregirlos.' })
        return
      }
      setDatos(DATOS_VACIOS)
      setRevisados({})
      setNotificacion({ tipo: 'exito', titulo: 'Cambio completado · simulación', detalle: 'No se modificaron credenciales ni se cerraron sesiones reales. La cuenta de prueba conserva su contraseña original.' })
    } catch {
      if (!controlador.signal.aborted) {
        setNotificacion({ tipo: 'error', titulo: 'No se pudo guardar', detalle: 'Revisa tu conexión e inténtalo nuevamente. Conservamos los datos del formulario.' })
      }
    } finally {
      solicitud.current = null
      if (!controlador.signal.aborted) setGuardando(false)
    }
  }

  useEffect(() => {
    if (errorActual && !guardando) formulario.current?.elements.claveActual.focus()
  }, [errorActual, guardando])

  return (
    <div className="configuracion-contenido">
      <form ref={formulario} className="registro-formulario configuracion-formulario" noValidate onSubmit={guardar} aria-labelledby="cambio-contrasena-titulo" aria-busy={guardando}>
        <div className="configuracion-presentacion">
          <h2 id="cambio-contrasena-titulo">Cambiar contraseña</h2>
          <p>Ingresa tu contraseña actual y elige una nueva para simular el cambio.</p>
        </div>
        <fieldset className="registro-campos" disabled={guardando}>
          <legend className="visually-hidden">Cambiar contraseña</legend>
          {CAMPOS.map(({ nombre, etiqueta, autoComplete, ayuda }) => (
            <CampoRegistro key={nombre} nombre={nombre} etiqueta={etiqueta} ayuda={ayuda} error={errores[nombre]}>
              <input id={`registro-${nombre}`} name={nombre} type="password" autoComplete={autoComplete} value={datos[nombre]} onChange={cambiarCampo} onBlur={() => setRevisados(anteriores => ({ ...anteriores, [nombre]: true }))} required aria-invalid={Boolean(errores[nombre])} aria-describedby={errores[nombre] ? `registro-${nombre}-error` : ayuda ? `registro-${nombre}-ayuda` : undefined} />
            </CampoRegistro>
          ))}
          <p className="configuracion-recuperar">
            {guardando
              ? <span role="link" aria-disabled="true">¿Olvidaste tu contraseña actual?</span>
              : <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña actual?</Link>}
          </p>
          <div className="configuracion-acciones">
            <button className="configuracion-guardar" type="submit">
              {guardando && <span className="registro-spinner" aria-hidden="true" />}
              {guardando ? 'Guardando...' : 'Guardar contraseña'}
            </button>
            <button className="configuracion-cancelar" type="button" onClick={onCancelar}>Cancelar</button>
          </div>
        </fieldset>
        <p className="registro-estado" role="status">{guardando ? 'Procesando el cambio simulado…' : 'Simulación de la primera entrega. No se modifican contraseñas reales.'}</p>
      </form>
      <NotificacionResultado notificacion={notificacion} onCerrar={() => setNotificacion(null)} />
    </div>
  )
}
