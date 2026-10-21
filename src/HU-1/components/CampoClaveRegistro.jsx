import { useState } from 'react'
import CampoRegistro from './CampoRegistro'
import IndicadorFortalezaClave from './IndicadorFortalezaClave'

export default function CampoClaveRegistro({ valor, error, onChange, onBlur, enviando, etiqueta = 'Contraseña', mostrarFortaleza = true, requisitosVisibles = false }) {
  const [visible, setVisible] = useState(false)
  const mostrando = visible && !enviando

  return (
    <CampoRegistro nombre="clave" etiqueta={etiqueta} error={error}>
      <div className="registro-clave">
        <input id="registro-clave" name="clave" type={mostrando ? 'text' : 'password'} autoComplete="new-password" value={valor} onChange={onChange} onBlur={onBlur} required aria-invalid={Boolean(error)} aria-describedby={`registro-clave-fortaleza registro-clave-requisitos${error ? ' registro-clave-error' : ''}`} />
        <button type="button" onClick={() => setVisible(!visible)} aria-controls="registro-clave" aria-pressed={mostrando}>
          {mostrando ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      <p className={requisitosVisibles ? 'registro-ayuda' : 'visually-hidden'} id="registro-clave-requisitos">Mínimo 8 caracteres, con una mayúscula y un número.</p>
      {mostrarFortaleza && <IndicadorFortalezaClave valor={valor} />}
    </CampoRegistro>
  )
}
