import { useState } from 'react'
import { CARRERAS, DISTRITOS, JORNADAS, MODALIDADES } from '../data/catalogos'
import { formatearSoles } from '../utils/catalogoUtils'

function PanelFiltros({ filtros, conteo, carreraUsuario, onCambiar, onAlternar, onLimpiar }) {
  const [verTodas, setVerTodas] = useState(false)
  const [verDistritos, setVerDistritos] = useState(false)

  const carrerasOrdenadas = [...CARRERAS].sort((a, b) => {
    if (a === carreraUsuario) return -1
    if (b === carreraUsuario) return 1
    return conteo[b] - conteo[a]
  })
  const carrerasMostradas = verTodas ? carrerasOrdenadas : carrerasOrdenadas.slice(0, 4)

  return (
    <aside className="catalogo-filtros">
      <div className="catalogo-filtros-cabecera">
        <h2>Filtros</h2>
        <button type="button" className="boton-enlace" onClick={onLimpiar}>
          Limpiar todo
        </button>
      </div>

      <input
        type="text"
        className="catalogo-buscador"
        placeholder="Buscar puesto o empresa"
        aria-label="Buscar puesto o empresa"
        value={filtros.texto}
        onChange={(e) => onCambiar('texto', e.target.value)}
      />

      <p className="catalogo-filtro-titulo">Carrera</p>
      {carreraUsuario && filtros.carreras.includes(carreraUsuario) && (
        <p className="catalogo-aviso">
          <strong>i</strong>
          Preseleccionamos {carreraUsuario}, tu carrera. Puedes agregar otras.
        </p>
      )}
      <div className="catalogo-casillas">
        {carrerasMostradas.map((carrera) => (
          <label key={carrera} className="catalogo-casilla">
            <input
              type="checkbox"
              checked={filtros.carreras.includes(carrera)}
              onChange={() => onAlternar('carreras', carrera)}
            />
            {carrera}
            <span className="catalogo-conteo">{conteo[carrera]}</span>
          </label>
        ))}
      </div>
      {!verTodas && (
        <button type="button" className="boton-enlace" onClick={() => setVerTodas(true)}>
          Ver las {CARRERAS.length} carreras
        </button>
      )}

      <p className="catalogo-filtro-titulo">Modalidad</p>
      <div className="catalogo-opciones">
        {MODALIDADES.map((modalidad) => (
          <button
            key={modalidad}
            type="button"
            className={`catalogo-opcion ${filtros.modalidades.includes(modalidad) ? 'seleccionada' : ''}`}
            onClick={() => onAlternar('modalidades', modalidad)}
          >
            {modalidad}
          </button>
        ))}
      </div>

      <p className="catalogo-filtro-titulo">Jornada</p>
      <div className="catalogo-opciones">
        {JORNADAS.map((jornada) => (
          <button
            key={jornada}
            type="button"
            className={`catalogo-opcion ${filtros.jornadas.includes(jornada) ? 'seleccionada' : ''}`}
            onClick={() => onAlternar('jornadas', jornada)}
          >
            {jornada}
          </button>
        ))}
      </div>

      <p className="catalogo-filtro-titulo">Distrito</p>
      <button type="button" className="catalogo-desplegable" onClick={() => setVerDistritos(!verDistritos)}>
        <span>{filtros.distritos.length > 0 ? filtros.distritos.join(', ') : 'Todos los distritos'}</span>▾
      </button>
      {verDistritos && (
        <div className="catalogo-distritos">
          {DISTRITOS.map((distrito) => (
            <label key={distrito} className="catalogo-casilla">
              <input
                type="checkbox"
                checked={filtros.distritos.includes(distrito)}
                onChange={() => onAlternar('distritos', distrito)}
              />
              {distrito}
            </label>
          ))}
        </div>
      )}

      <p className="catalogo-filtro-titulo">Subvención mínima</p>
      <input
        type="range"
        className="catalogo-rango"
        min="0"
        max="2500"
        step="100"
        aria-label="Subvención mínima"
        value={filtros.subvencionMin}
        style={{ background: `linear-gradient(to right, var(--color-primary) ${filtros.subvencionMin / 25}%, var(--color-border) ${filtros.subvencionMin / 25}%)` }}
        onChange={(e) => onCambiar('subvencionMin', Number(e.target.value))}
      />
      <p className="catalogo-ayuda">Desde {formatearSoles(filtros.subvencionMin)}</p>

      <div className="catalogo-vigentes">
        Solo convocatorias vigentes
        <button
          type="button"
          className={`interruptor ${filtros.soloVigentes ? 'encendido' : ''}`}
          aria-label="Solo convocatorias vigentes"
          onClick={() => onCambiar('soloVigentes', !filtros.soloVigentes)}
        >
          <span />
        </button>
      </div>
    </aside>
  )
}

export default PanelFiltros
