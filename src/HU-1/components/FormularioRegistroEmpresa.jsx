import { Link } from 'react-router-dom'
import CampoRegistro from './CampoRegistro'
import CampoClaveRegistro from './CampoClaveRegistro'
import AlertaValidacionRegistro from './AlertaValidacionRegistro'
import { useFormularioRegistro } from '../context/useFormularioRegistro'
import { SECTORES_EMPRESA, TAMANOS_EMPRESA } from '../data/catalogosEmpresa'
import { validarRegistroEmpresa } from '../utils/validarRegistroEmpresa'

export default function FormularioRegistroEmpresa({ enviando, onRegistrar }) {
  const { datos, errores, cantidadErrores, cambiar, marcarVisitado, registrar, atributos } = useFormularioRegistro(
    { razonSocial: '', ruc: '', sector: '', tamano: '', correo: '', telefono: '', clave: '', confirmacion: '', terminos: false },
    validarRegistroEmpresa,
    enviando,
    onRegistrar,
  )

  return (
    <form className="registro-formulario" onSubmit={registrar} noValidate aria-label="Registro de empresa" aria-busy={enviando}>
      <AlertaValidacionRegistro cantidad={cantidadErrores} />
      <fieldset className="registro-campos" disabled={enviando}>
        <legend className="registro-seccion-titulo">Datos de la empresa</legend>
        <div className="registro-fila registro-fila-empresa">
          <CampoRegistro nombre="razonSocial" etiqueta="Razón social" error={errores.razonSocial}>
            <input {...atributos('razonSocial')} autoComplete="organization" placeholder="Consultora Andes Perú S.A.C." />
          </CampoRegistro>
          <CampoRegistro nombre="ruc" etiqueta="RUC" ayuda="11 dígitos." error={errores.ruc}>
            <input {...atributos('ruc', true)} inputMode="numeric" placeholder="20548712936" />
          </CampoRegistro>
        </div>
        <div className="registro-fila">
          <CampoRegistro nombre="sector" etiqueta="Sector" error={errores.sector}>
            <select {...atributos('sector')}>
              <option value="" disabled>Selecciona un sector</option>
              {SECTORES_EMPRESA.map(sector => <option key={sector} value={sector}>{sector}</option>)}
            </select>
          </CampoRegistro>
          <CampoRegistro nombre="tamano" etiqueta="Tamaño" error={errores.tamano}>
            <select {...atributos('tamano')}>
              <option value="" disabled>Selecciona un tamaño</option>
              {TAMANOS_EMPRESA.map(tamano => <option key={tamano.valor} value={tamano.valor}>{tamano.etiqueta}</option>)}
            </select>
          </CampoRegistro>
        </div>
      </fieldset>

      <fieldset className="registro-campos registro-contacto" disabled={enviando}>
        <legend className="registro-seccion-titulo">Contacto y acceso</legend>
        <div className="registro-fila registro-fila-contacto">
          <CampoRegistro nombre="correo" etiqueta="Correo de contacto" error={errores.correo}>
            <input {...atributos('correo')} type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} placeholder="seleccion@andesperu.com.pe" />
          </CampoRegistro>
          <CampoRegistro nombre="telefono" etiqueta="Teléfono" error={errores.telefono}>
            <input {...atributos('telefono')} type="tel" autoComplete="tel" placeholder="(01) 415 8820" />
          </CampoRegistro>
        </div>
        <div className="registro-fila">
          <CampoClaveRegistro valor={datos.clave} error={errores.clave} onChange={cambiar} onBlur={marcarVisitado} enviando={enviando} />
          <CampoRegistro nombre="confirmacion" etiqueta="Confirmar contraseña" error={errores.confirmacion}>
            <input {...atributos('confirmacion')} type="password" autoComplete="new-password" />
          </CampoRegistro>
        </div>
        <p className="registro-ayuda registro-requisitos">Mínimo 8 caracteres, con una mayúscula y un número.</p>
        <div>
          <div className="registro-terminos">
            <input id="registro-terminos" name="terminos" type="checkbox" checked={datos.terminos} onChange={cambiar} onBlur={marcarVisitado} required aria-invalid={Boolean(errores.terminos)} aria-describedby={errores.terminos ? 'registro-terminos-error' : undefined} />
            <label htmlFor="registro-terminos">Declaro que represento a la empresa y acepto los {enviando ? <span>términos del servicio</span> : <Link to="/terminos">términos del servicio</Link>}.</label>
          </div>
          {errores.terminos && <p className="registro-error" id="registro-terminos-error">{errores.terminos}</p>}
        </div>
        <div className="registro-acciones-empresa">
          <button className="registro-crear" type="submit" disabled={enviando || cantidadErrores > 0}>
            {enviando && <span className="registro-spinner" aria-hidden="true" />}
            {enviando ? 'Registrando empresa...' : 'Registrar mi empresa'}
          </button>
          {enviando
            ? <span className="registro-cancelar" role="link" aria-disabled="true">Cancelar</span>
            : <Link className="registro-cancelar" to="/">Cancelar</Link>}
        </div>
      </fieldset>
      <p className="registro-estado" role="status">{enviando ? 'Estamos simulando el registro de tu empresa. Espera un momento.' : ''}</p>
    </form>
  )
}
