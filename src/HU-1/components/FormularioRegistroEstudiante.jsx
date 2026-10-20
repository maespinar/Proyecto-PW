import { useState } from 'react'
import { Link } from 'react-router-dom'
import CampoRegistro from './CampoRegistro'
import CampoClaveRegistro from './CampoClaveRegistro'
import { CARRERAS, CICLOS } from '../../HU-2/data/catalogos'
import { validarRegistroEstudiante } from '../utils/validarRegistroEstudiante'

export default function FormularioRegistroEstudiante() {
  const [datos, setDatos] = useState({ nombres: '', apellidos: '', correo: '', clave: '', confirmacion: '', carrera: '', ciclo: '', terminos: false })
  const [errores, setErrores] = useState({})
  const [registroSimulado, setRegistroSimulado] = useState(false)

  function cambiar(evento) {
    const { name, value, type, checked } = evento.target
    setDatos(anteriores => ({ ...anteriores, [name]: type === 'checkbox' ? checked : value }))
    setErrores(anteriores => ({ ...anteriores, [name]: undefined, ...(name === 'clave' ? { confirmacion: undefined } : {}) }))
    setRegistroSimulado(false)
  }

  function registrar(evento) {
    evento.preventDefault()
    const nuevosErrores = validarRegistroEstudiante(datos)
    setErrores(nuevosErrores)
    setRegistroSimulado(false)
    const primerError = Object.keys(nuevosErrores)[0]
    if (primerError) {
      evento.currentTarget.elements[primerError].focus()
      return
    }
    setRegistroSimulado(true)
  }

  function atributos(nombre, ayuda = false) {
    const descripcion = [ayuda && `registro-${nombre}-ayuda`, errores[nombre] && `registro-${nombre}-error`].filter(Boolean).join(' ')
    return {
      id: `registro-${nombre}`,
      name: nombre,
      value: datos[nombre],
      onChange: cambiar,
      required: true,
      'aria-invalid': Boolean(errores[nombre]),
      'aria-describedby': descripcion || undefined,
    }
  }

  return (
    <form className="registro-formulario" onSubmit={registrar} noValidate aria-label="Registro de estudiante">
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
        <CampoClaveRegistro valor={datos.clave} error={errores.clave} onChange={cambiar} />
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
          <input id="registro-terminos" name="terminos" type="checkbox" checked={datos.terminos} onChange={cambiar} required aria-invalid={Boolean(errores.terminos)} aria-describedby={errores.terminos ? 'registro-terminos-error' : undefined} />
          <label htmlFor="registro-terminos">Acepto los <Link to="/terminos">términos del servicio</Link> y la <Link to="/privacidad">política de privacidad de datos</Link> de la plataforma.</label>
        </div>
        {errores.terminos && <p className="registro-error" id="registro-terminos-error">{errores.terminos}</p>}
      </div>

      <div className="registro-resultado" role="status">
        {Object.values(errores).some(Boolean) && <p className="registro-error">Revisa los campos señalados para continuar.</p>}
        {registroSimulado && <p className="registro-exito">Registro simulado correctamente. En esta versión de demostración no se crea una cuenta ni se envía un correo de verificación.</p>}
      </div>
      <button className="registro-crear" type="submit">Crear mi cuenta</button>
      <p className="registro-iniciar">¿Ya tienes cuenta? <Link to="/iniciar-sesion">Inicia sesión</Link></p>
    </form>
  )
}
