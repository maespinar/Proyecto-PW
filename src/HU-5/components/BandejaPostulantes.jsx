import { useState } from 'react'
import './BandejaPostulantes.css'
import StatusBadge from './StatusBadge'
import { POSTULANTES_BANDEJA_INICIALES } from '../data/mockData'

function BandejaPostulantes({
  postulantes = POSTULANTES_BANDEJA_INICIALES,
  onVerPerfil,
  onUpdateEstado,
}) {
  const [listaPostulantes, setListaPostulantes] = useState(postulantes)
  const [seleccionados, setSeleccionados] = useState([1, 2, 3]) // IDs de Renzo, Camila, Diego como en la maqueta
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('Todos los estados')
  const [filtroCiclo, setFiltroCiclo] = useState('Ciclo: todos')
  const [menuAccionesAbierto, setMenuAccionesAbierto] = useState(null)
  const [modalCerrarConvo, setModalCerrarConvo] = useState(false)
  const [notificacion, setNotificacion] = useState('')
  const [mostrarVacioSimulado, setMostrarVacioSimulado] = useState(false)

  // Métricas de postulantes
  const total = listaPostulantes.length
  const totalRecibidas = listaPostulantes.filter((p) => p.estado.toLowerCase() === 'recibida').length
  const totalEnRevision = listaPostulantes.filter((p) => p.estado.toLowerCase() === 'en revisión').length
  const totalAceptadas = listaPostulantes.filter((p) => p.estado.toLowerCase() === 'aceptada').length
  const totalDescartadas = listaPostulantes.filter((p) => p.estado.toLowerCase() === 'descartada').length

  // Filtrado de la tabla
  const postulantesFiltrados = listaPostulantes.filter((post) => {
    if (mostrarVacioSimulado) return false

    const coincideNombre = post.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
    const coincideEstado =
      filtroEstado === 'Todos los estados' ||
      post.estado.toLowerCase() === filtroEstado.toLowerCase()
    const coincideCiclo =
      filtroCiclo === 'Ciclo: todos' || post.ciclo === filtroCiclo

    return coincideNombre && coincideEstado && coincideCiclo
  })

  // Manejo de Selección
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSeleccionados(postulantesFiltrados.map((p) => p.id))
    } else {
      setSeleccionados([])
    }
  }

  const handleToggleSelect = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Acciones en Lote
  const handleAccionLote = (nuevoEstado) => {
    setListaPostulantes((prev) =>
      prev.map((p) =>
        seleccionados.includes(p.id) ? { ...p, estado: nuevoEstado } : p
      )
    )
    if (onUpdateEstado) {
      seleccionados.forEach((id) => onUpdateEstado(id, nuevoEstado))
    }
    setNotificacion(`Se actualizaron ${seleccionados.length} postulantes a estado «${nuevoEstado}».`)
    setSeleccionados([])
    setTimeout(() => setNotificacion(''), 4000)
  }

  // Acción individual desde el menú de fila
  const handleCambiarEstadoFila = (id, nuevoEstado) => {
    setListaPostulantes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    )
    if (onUpdateEstado) {
      onUpdateEstado(id, nuevoEstado)
    }
    setMenuAccionesAbierto(null)
    setNotificacion(`Estado actualizado a «${nuevoEstado}».`)
    setTimeout(() => setNotificacion(''), 4000)
  }

  return (
    <div className="bandeja-postulantes-container">
      
      {/* Alerta de notificación */}
      {notificacion && (
        <div className="bandeja-alerta-toast" role="status">
          <span>✓ {notificacion}</span>
          <button type="button" onClick={() => setNotificacion('')}>✕</button>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="bandeja-breadcrumb" aria-label="Miga de pan">
        <span>Convocatorias</span>
        <span className="separator">·</span>
        <span>Mis convocatorias</span>
        <span className="separator">·</span>
        <span className="current">Bandeja de postulantes</span>
      </nav>

      {/* Encabezado de la convocatoria */}
      <div className="bandeja-header-banner">
        <div className="banner-info">
          <h1 className="banner-title">Practicante de Desarrollo de Software</h1>
          <p className="banner-meta">
            Publicada el 18/08/2026 · cierra el 30/09/2026 · 2 vacantes · Ingeniería de Sistemas
          </p>
        </div>
        <div className="banner-actions">
          <button
            type="button"
            className="btn-simular-vacio"
            onClick={() => setMostrarVacioSimulado(!mostrarVacioSimulado)}
            title="Alternar entre la tabla de candidatos y el estado vacío de la página 46"
          >
            {mostrarVacioSimulado ? 'Ver tabla con datos' : 'Ver pieza: Bandeja vacía'}
          </button>
          <button type="button" className="btn-secundario">
            Editar convocatoria
          </button>
          <button
            type="button"
            className="btn-cerrar-convo"
            onClick={() => setModalCerrarConvo(true)}
          >
            Cerrar convocatoria
          </button>
        </div>
      </div>

      {/* 5 Tarjetas de Métricas / Contadores */}
      <div className="kpi-metrics-row">
        <div className="kpi-card">
          <span className="kpi-number">{total}</span>
          <span className="kpi-label">Total de postulantes</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-number">{totalRecibidas}</span>
          <span className="kpi-label">Recibidas</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-number">{totalEnRevision}</span>
          <span className="kpi-label">En revisión</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-number">{totalAceptadas}</span>
          <span className="kpi-label">Aceptadas</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-number">{totalDescartadas}</span>
          <span className="kpi-label">Descartadas</span>
        </div>
      </div>

      {/* Barra de Acciones en Lote (cuando hay seleccionados) */}
      {seleccionados.length > 0 && !mostrarVacioSimulado && (
        <div className="batch-actions-bar">
          <span className="batch-count-text">
            <strong>{seleccionados.length}</strong> postulantes seleccionados
          </span>
          <div className="batch-buttons-group">
            <button
              type="button"
              className="btn-batch-revision"
              onClick={() => handleAccionLote('En revisión')}
            >
              Marcar en revisión
            </button>
            <button
              type="button"
              className="btn-batch-aceptar"
              onClick={() => handleAccionLote('Aceptada')}
            >
              Aceptar
            </button>
            <button
              type="button"
              className="btn-batch-descartar"
              onClick={() => handleAccionLote('Descartada')}
            >
              Descartar
            </button>
            <button
              type="button"
              className="btn-batch-quitar"
              onClick={() => setSeleccionados([])}
            >
              Quitar selección
            </button>
          </div>
        </div>
      )}

      {/* Barra de Búsqueda y Filtros */}
      {!mostrarVacioSimulado && (
        <div className="bandeja-controls-bar">
          <div className="controls-left">
            <div className="input-search-wrapper">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Buscar por nombre"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
              />
            </div>

            <select
              className="select-filtro"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="Todos los estados">Todos los estados</option>
              <option value="Recibida">Recibidas</option>
              <option value="En revisión">En revisión</option>
              <option value="Aceptada">Aceptadas</option>
              <option value="Descartada">Descartadas</option>
            </select>

            <select
              className="select-filtro"
              value={filtroCiclo}
              onChange={(e) => setFiltroCiclo(e.target.value)}
            >
              <option value="Ciclo: todos">Ciclo: todos</option>
              <option value="7.º">7.º</option>
              <option value="8.º">8.º</option>
              <option value="9.º">9.º</option>
              <option value="10.º">10.º</option>
            </select>
          </div>

          <div className="controls-right">
            <span className="results-counter">
              {postulantesFiltrados.length} de {total} postulantes · ordenados por fecha
            </span>
          </div>
        </div>
      )}

      {/* Tabla de Postulantes o Estado Vacío */}
      {!mostrarVacioSimulado && postulantesFiltrados.length > 0 ? (
        <div className="table-responsive-wrapper">
          <table className="tabla-postulantes">
            <thead>
              <tr>
                <th className="col-checkbox">
                  <input
                    type="checkbox"
                    checked={
                      postulantesFiltrados.length > 0 &&
                      seleccionados.length === postulantesFiltrados.length
                    }
                    onChange={handleSelectAll}
                    aria-label="Seleccionar todos los postulantes"
                  />
                </th>
                <th>POSTULANTE</th>
                <th>CARRERA</th>
                <th>CICLO</th>
                <th>POSTULÓ</th>
                <th>ESTADO</th>
                <th className="col-acciones">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {postulantesFiltrados.map((post) => {
                const isSelected = seleccionados.includes(post.id)
                return (
                  <tr key={post.id} className={isSelected ? 'row-selected' : ''}>
                    <td className="col-checkbox">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(post.id)}
                        aria-label={`Seleccionar ${post.nombre}`}
                      />
                    </td>
                    <td>
                      <div className="postulante-cell">
                        <span className="postulante-avatar-circle" aria-hidden="true">
                          {post.nombre.charAt(0)}
                        </span>
                        <button
                          type="button"
                          className="link-postulante-nombre"
                          onClick={() => onVerPerfil && onVerPerfil(post)}
                          title="Ver perfil completo del postulante"
                        >
                          {post.nombre}
                        </button>
                      </div>
                    </td>
                    <td className="cell-carrera">{post.carrera}</td>
                    <td className="cell-ciclo">{post.ciclo}</td>
                    <td className="cell-fecha">{post.fechaPostulo}</td>
                    <td>
                      <StatusBadge estado={post.estado} />
                    </td>
                    <td className="col-acciones">
                      <div className="menu-acciones-wrapper">
                        <button
                          type="button"
                          className="btn-menu-puntos"
                          onClick={() =>
                            setMenuAccionesAbierto(
                              menuAccionesAbierto === post.id ? null : post.id
                            )
                          }
                          aria-label="Acciones de postulante"
                        >
                          ⋯
                        </button>

                        {menuAccionesAbierto === post.id && (
                          <div className="dropdown-acciones-menu">
                            <button
                              type="button"
                              onClick={() => {
                                setMenuAccionesAbierto(null)
                                if (onVerPerfil) onVerPerfil(post)
                              }}
                            >
                              Ver perfil
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCambiarEstadoFila(post.id, 'En revisión')}
                            >
                              Marcar en revisión
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCambiarEstadoFila(post.id, 'Aceptada')}
                            >
                              Aceptar postulante
                            </button>
                            <button
                              type="button"
                              className="text-danger"
                              onClick={() => handleCambiarEstadoFila(post.id, 'Descartada')}
                            >
                              Descartar postulante
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* PIEZA SUELTA 5.5: BANDEJA SIN POSTULANTES (PÁGINA 46) */
        <div className="empty-bandeja-card">
          <div className="empty-icon-box">▤</div>
          <h2 className="empty-title">Todavía nadie postuló a esta convocatoria</h2>
          <p className="empty-desc">
            Se publicó hace 2 días y aparece en el catálogo de 412 estudiantes de Ingeniería de Sistemas. Aquí verás cada postulante con su carrera y su ciclo.
          </p>
          <div className="empty-actions">
            <button
              type="button"
              className="btn-primario"
              onClick={() => alert('Abriendo detalle de la convocatoria publicada...')}
            >
              Revisar la convocatoria
            </button>
            <button
              type="button"
              className="btn-secundario"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href)
                setNotificacion('Enlace de la convocatoria copiado al portapapeles.')
                setTimeout(() => setNotificacion(''), 3000)
              }}
            >
              Compartir enlace
            </button>
          </div>
        </div>
      )}

      {/* Modal de confirmación para cerrar convocatoria */}
      {modalCerrarConvo && (
        <div className="modal-backdrop-overlay" role="dialog" aria-modal="true">
          <div className="modal-confirm-card">
            <h2 className="confirm-title">¿Cerrar esta convocatoria?</h2>
            <p className="confirm-message">
              «Practicante de Desarrollo de Software» tiene <strong>{total} postulantes</strong>. Al cerrarla, los estudiantes ya no podrán postular y la convocatoria saldrá del catálogo.
            </p>
            <div className="confirm-warning">
              ! Esta acción no se puede deshacer. Las postulaciones recibidas se conservan en tu bandeja.
            </div>
            <div className="confirm-actions">
              <button
                type="button"
                className="btn-secundario"
                onClick={() => setModalCerrarConvo(false)}
              >
                Mantener abierta
              </button>
              <button
                type="button"
                className="btn-danger-confirm"
                onClick={() => {
                  setModalCerrarConvo(false)
                  setNotificacion('Convocatoria cerrada con éxito.')
                  setTimeout(() => setNotificacion(''), 4000)
                }}
              >
                Cerrar convocatoria
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default BandejaPostulantes
