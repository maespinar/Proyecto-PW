import { useRef, useState } from 'react'
import { validarNotaBandeja } from '../utils/bandejaUtils'

export default function NotaInternaPostulante({ notaInicial, ocupado, onGuardar, onCambiar }) {
  const [nota, setNota] = useState(notaInicial)
  const [guardada, setGuardada] = useState(notaInicial)
  const [error, setError] = useState('')
  const campo = useRef(null)
  const hayCambios = nota !== guardada

  const guardar = async (evento) => {
    evento.preventDefault()
    const fallo = validarNotaBandeja(nota)
    setError(fallo)
    if (fallo) { campo.current.focus(); return }
    if (await onGuardar(nota)) {
      setNota(nota.trim())
      setGuardada(nota.trim())
      onCambiar(false)
    }
  }

  return (
    <section className="pp-tarjeta">
      <form onSubmit={guardar} noValidate>
        <label htmlFor="pp-nota" className="pp-etiqueta">Notas internas</label>
        <textarea id="pp-nota" ref={campo} rows={6} maxLength={2000} value={nota} disabled={ocupado} aria-invalid={Boolean(error)} aria-describedby={`pp-nota-ayuda${error ? ' pp-nota-error' : ''}`} onChange={(evento) => {
          const texto = evento.target.value
          setNota(texto)
          setError(validarNotaBandeja(texto))
          onCambiar(texto !== guardada)
        }} onBlur={() => setError(validarNotaBandeja(nota))} />
        <p id="pp-nota-ayuda" className="pp-ayuda">Solo tu equipo ve estas notas. El postulante nunca las verá. {nota.length} / 2000 caracteres.</p>
        {error && <p id="pp-nota-error" className="pp-error" role="alert">{error}</p>}
        {hayCambios && <p className="pp-ayuda">Tienes cambios sin guardar.</p>}
        <button type="submit" className="pp-boton" disabled={ocupado || !hayCambios}>{ocupado ? 'Guardando…' : 'Guardar nota'}</button>
      </form>
    </section>
  )
}
