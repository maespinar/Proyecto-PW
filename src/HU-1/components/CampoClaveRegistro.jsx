import { useState } from 'react'
import CampoRegistro from './CampoRegistro'
import { obtenerFortalezaClave } from '../utils/validarRegistroEstudiante'

export default function CampoClaveRegistro({ valor, error, onChange }) {
  const [visible, setVisible] = useState(false)
  const { nivel, texto } = obtenerFortalezaClave(valor)

  return (
    <CampoRegistro nombre="clave" etiqueta="Contraseña" error={error}>
      <div className="registro-clave">
        <input id="registro-clave" name="clave" type={visible ? 'text' : 'password'} autoComplete="new-password" value={valor} onChange={onChange} required aria-invalid={Boolean(error)} aria-describedby={`registro-clave-fortaleza registro-confirmacion-ayuda${error ? ' registro-clave-error' : ''}`} />
        <button type="button" onClick={() => setVisible(!visible)} aria-controls="registro-clave" aria-pressed={visible}>
          {visible ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      <div className={`registro-fortaleza registro-fortaleza--${nivel}`}>
        <div className="registro-fortaleza-barras" aria-hidden="true">
          {[1, 2, 3, 4].map(segmento => <span key={segmento} className={segmento <= nivel ? 'registro-fortaleza-activa' : ''} />)}
        </div>
        <p id="registro-clave-fortaleza" role="status">Fortaleza: {texto}</p>
      </div>
    </CampoRegistro>
  )
}
