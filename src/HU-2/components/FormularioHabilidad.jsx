import { useMemo, useState } from 'react'
import { MAX_HABILIDADES, NIVELES, sugerirHabilidades } from '../utils/habilidades'
import { validarHabilidad } from '../utils/validaciones'

export default function FormularioHabilidad({ carrera, registradas, onAgregar, inputRef }) {
  const [nombre, setNombre] = useState('')
  const [nivel, setNivel] = useState('Intermedio')
  const [error, setError] = useState('')
  const [abierto, setAbierto] = useState(false)
  const [indice, setIndice] = useState(-1)
  const [guardando, setGuardando] = useState(false)

  const nombresRegistrados = useMemo(() => registradas.map((h) => h.nombre), [registradas])
  const lleno = registradas.length >= MAX_HABILIDADES
  const sugerencias = useMemo(
    () => (abierto && !lleno ? sugerirHabilidades(nombre, carrera, nombresRegistrados) : []),
    [abierto, lleno, nombre, carrera, nombresRegistrados],
  )

  function elegir(sugerencia) {
    setNombre(sugerencia)
    setError('')
    setAbierto(false)
    setIndice(-1)
    inputRef.current?.focus()
  }

  function alEscribir(evento) {
    setNombre(evento.target.value)
    setError('')
    setAbierto(true)
    setIndice(-1)
  }

  function alPresionarTecla(evento) {
    if (evento.key === 'ArrowDown') {
      evento.preventDefault()
      setAbierto(true)
      setIndice((actual) => Math.min(actual + 1, sugerencias.length - 1))
    } else if (evento.key === 'ArrowUp') {
      evento.preventDefault()
      setIndice((actual) => Math.max(actual - 1, 0))
    } else if (evento.key === 'Enter' && abierto && indice >= 0) {
      evento.preventDefault()
      elegir(sugerencias[indice])
    } else if (evento.key === 'Escape') {
      setAbierto(false)
    }
  }

  async function enviar(evento) {
    evento.preventDefault()
    const mensaje = validarHabilidad(nombre, nombresRegistrados)
    if (mensaje) {
      setError(mensaje)
      return
    }
    setGuardando(true)
    const agregada = await onAgregar({ nombre, nivel })
    setGuardando(false)
    if (agregada) {
      setNombre('')
      setAbierto(false)
      inputRef.current?.focus()
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="tarjeta-hu2 p-4 mb-3">
      <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-3">
        <h2 className="h5 titulo-hu2 mb-0">Agregar una habilidad</h2>
        <span className="small text-muted">{registradas.length} de {MAX_HABILIDADES} habilidades registradas</span>
      </div>

      <div className="row g-3 align-items-start">
        <div className="col-12 col-md">
          <label htmlFor="habilidad-nombre" className="form-label etiqueta-hu2">Habilidad</label>
          <div className="position-relative">
            <input
              ref={inputRef}
              id="habilidad-nombre"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              value={nombre}
              onChange={alEscribir}
              onFocus={() => setAbierto(true)}
              onBlur={() => setAbierto(false)}
              onKeyDown={alPresionarTecla}
              autoComplete="off"
              disabled={lleno}
              role="combobox"
              aria-expanded={sugerencias.length > 0}
              aria-controls="habilidad-sugerencias"
              aria-autocomplete="list"
              aria-activedescendant={indice >= 0 ? `sugerencia-${indice}` : undefined}
              aria-describedby="habilidad-ayuda"
            />
            {sugerencias.length > 0 && (
              <ul className="sugerencias-hu2" id="habilidad-sugerencias" role="listbox">
                {sugerencias.map((sugerencia, i) => (
                  <li
                    key={sugerencia}
                    id={`sugerencia-${i}`}
                    role="option"
                    aria-selected={i === indice}
                    className={i === indice ? 'activa' : ''}
                    onMouseDown={(evento) => {
                      evento.preventDefault()
                      elegir(sugerencia)
                    }}
                  >
                    {sugerencia}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <label htmlFor="habilidad-nivel" className="form-label etiqueta-hu2">Nivel de dominio</label>
          <select id="habilidad-nivel" className="form-select" value={nivel} onChange={(e) => setNivel(e.target.value)} disabled={lleno}>
            {NIVELES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="col-12 col-sm-6 col-md-auto">
          <span className="form-label etiqueta-hu2 d-none d-md-block">&nbsp;</span>
          <button type="submit" className="btn btn-primary w-100" disabled={lleno || guardando}>
            {guardando ? 'Agregando…' : 'Agregar'}
          </button>
        </div>
      </div>

      <p className="small text-muted mt-3 mb-0" id="habilidad-ayuda">
        {lleno
          ? `Llegaste al máximo de ${MAX_HABILIDADES} habilidades. Elimina alguna para agregar otra.`
          : 'Sugerencias según tu carrera. También puedes escribir una habilidad nueva.'}
      </p>
    </form>
  )
}
