import { useState } from 'react'
import { Link } from 'react-router-dom'
import CampoRegistro from './CampoRegistro'
import CampoClaveRegistro from './CampoClaveRegistro'
import AlertaValidacionRegistro from './AlertaValidacionRegistro'
import { CARRERAS, CICLOS } from '../../HU-2/data/catalogos'
import { validarRegistroEstudiante } from '../utils/validarRegistroEstudiante'

export default function FormularioRegistroEstudiante({ enviando, onRegistrar }) {
  const [datos, setDatos] = useState({ nombres: '', apellidos: '', correo: '', clave: '', confirmacion: '', carrera: '', ciclo: '', terminos: false })
  const [visitados, setVisitados] = useState({})
  const [intentoEnvio, setIntentoEnvio] = useState(false)
  const validacion = validarRegistroEstudiante(datos)
  const errores = Object.fromEntries(Object.entries(validacion).filter(([campo]) => intentoEnvio || visitados[campo]))
  const cantidadErrores = Object.keys(errores).length

  function cambiar(evento) {
    const { name, value, type, checked } = evento.target
    setDatos(anteriores => ({ ...anteriores, [name]: type === 'checkbox' ? checked : value }))
  }

  function marcarVisitado(evento) {
    const { name } = evento.target
    setVisitados(anteriores => ({ ...anteriores, [name]: true }))
  }

  function registrar(evento) {
    evento.preventDefault()
    if (enviando) return
    setIntentoEnvio(true)
    const primerError = Object.keys(validacion)[0]
    if (primerError) {
      evento.currentTarget.elements[primerError].focus()
      return
    }
    onRegistrar(datos)
  }

  function atributos(nombre, ayuda = false) {
    const descripcion = [ayuda && !errores[nombre] && `registro-${nombre}-ayuda`, errores[nombre] && `registro-${nombre}-error`].filter(Boolean).join(' ')
    return {
      id: `registro-${nombre}`,
      name: nombre,
      value: datos[nombre],
      onChange: cambiar,
      onBlur: marcarVisitado,
      required: true,
      'aria-invalid': Boolean(errores[nombre]),
      'aria-describedby': descripcion || undefined,
    }
  }

  return (
    <form className="registro-formulario" onSubmit={registrar} noValidate aria-label="Registro de estudiante" aria-busy={enviando}>
      <AlertaValidacionRegistro cantidad={cantidadErrores} />
      <fieldset className="registro-campos" disabled={enviando}>
        <div className="registro-fila">
          <CampoRegistro nombre="nombres" etiqueta="Nombres" error={errores.nombres}>
            <input {...atributos('nombres')} autoComplete="given-name" placeholder="Mariana Lucía" />
          </CampoRegistro>
          <CampoRegistro nombre="apellidos" etiqueta="Apellidos" error={errores.apellidos}>
            <input {...atributos('apellidos')} autoComplete="family-name" placeholder="Quispe Ramírez" />
          </CampoRegistro>
        </div>

        <CampoRegistro nombre="correo" etiqueta="Correo institucional" ayuda="Debe terminar en @aloe.ulima.edu.pe" error={errores.correo}>
          <input {...atributos('correo', true)} type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} placeholder="mariana.quispe@aloe.ulima.edu.pe" />
        </CampoRegistro>

        <div className="registro-fila">
          <CampoClaveRegistro valor={datos.clave} error={errores.clave} onChange={cambiar} onBlur={marcarVisitado} enviando={enviando} />
          <CampoRegistro nombre="confirmacion" etiqueta="Confirmar contraseña" ayuda="Mínimo 8 caracteres, con una mayúscula y un número." error={errores.confirmacion}>
            <input {...atributos('confirmacion', true)} type="password" autoComplete="new-password" />
          </CampoRegistro>
        </div>

        <div className="registro-fila registro-fila-academica">
          <CampoRegistro nombre="carrera" etiqueta="Carrera" error={errores.carrera}>
            <select {...atributos('carrera')}>
              <option value="" disabled>Selecciona tu carrera</option>
              {CARRERAS.map(carrera => <option key={carrera} value={carrera}>{carrera}</option>)}
            </select>
          </CampoRegistro>
          <CampoRegistro nombre="ciclo" etiqueta="Ciclo" error={errores.ciclo}>
            <select {...atributos('ciclo')}>
              <option value="" disabled>Selecciona tu ciclo</option>
              {CICLOS.map(ciclo => <option key={ciclo} value={ciclo}>{ciclo}</option>)}
            </select>
          </CampoRegistro>
        </div>

        <div>
          <div className="registro-terminos">
            <input id="registro-terminos" name="terminos" type="checkbox" checked={datos.terminos} onChange={cambiar} onBlur={marcarVisitado} required aria-invalid={Boolean(errores.terminos)} aria-describedby={errores.terminos ? 'registro-terminos-error' : undefined} />
            <label htmlFor="registro-terminos">Acepto los {enviando ? <span>términos del servicio</span> : <Link to="/terminos">términos del servicio</Link>} y la {enviando ? <span>política de privacidad de datos</span> : <Link to="/privacidad">política de privacidad de datos</Link>} de la plataforma.</label>
          </div>
          {errores.terminos && <p className="registro-error" id="registro-terminos-error">{errores.terminos}</p>}
        </div>

        <button className="registro-crear" type="submit" disabled={enviando || cantidadErrores > 0}>
          {enviando && <span className="registro-spinner" aria-hidden="true" />}
          {enviando ? 'Creando cuenta...' : 'Crear mi cuenta'}
        </button>
      </fieldset>
      <p className="registro-estado" role="status">{enviando ? 'Estamos creando tu cuenta. Espera un momento.' : ''}</p>
      <p className="registro-iniciar">¿Ya tienes cuenta? {enviando ? <span aria-disabled="true" role="link">Inicia sesión</span> : <Link to="/iniciar-sesion">Inicia sesión</Link>}</p>
    </form>
  )
}
