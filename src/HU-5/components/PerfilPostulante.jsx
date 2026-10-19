import { useState } from 'react'
import './PerfilPostulante.css'
import StatusBadge from './StatusBadge'
import { CANDIDATO_PRINCIPAL, POSTULANTES_BANDEJA_INICIALES } from '../data/mockData'

function PerfilPostulante({
  candidatoInicial = CANDIDATO_PRINCIPAL,
  listaPostulantes = POSTULANTES_BANDEJA_INICIALES,
  onBackToBandeja,
  onUpdateEstado,
}) {
  const [candidatoIndex, setCandidatoIndex] = useState(() => {
    const idx = listaPostulantes.findIndex(
      (p) => p.id === candidatoInicial?.id || p.nombre === candidatoInicial?.nombre
    )
    return idx >= 0 ? idx : 3 // 4to postulante (índice 3: Mariana)
  })

  const [estados, setEstados] = useState(() => {
    const dict = {}
    listaPostulantes.forEach((p) => {
      dict[p.id] = p.estado
    })
    return dict
  })

  const [notaInterna, setNotaInterna] = useState(
    candidatoInicial?.notasInternas ||
      'Buen manejo de SQL en la entrevista técnica del 02/09. Coordinar segunda entrevista con el líder de producto.'
  )
  const [notificacion, setNotificacion] = useState('')

  const candidatoActual = listaPostulantes[candidatoIndex] || candidatoInicial
  const estadoActual = estados[candidatoActual.id] || candidatoActual.estado || 'En revisión'

  // Navegación Anterior / Siguiente
  const handleAnterior = () => {
    if (candidatoIndex > 0) {
      const newIdx = candidatoIndex - 1
      setCandidatoIndex(newIdx)
      setNotaInterna(listaPostulantes[newIdx]?.notasInternas || '')
    }
  }

  const handleSiguiente = () => {
    if (candidatoIndex < listaPostulantes.length - 1) {
      const newIdx = candidatoIndex + 1
      setCandidatoIndex(newIdx)
      setNotaInterna(listaPostulantes[newIdx]?.notasInternas || '')
    }
  }

  // Cambio de Estado
  const handleCambiarEstado = (nuevoEstado) => {
    setEstados((prev) => ({
      ...prev,
      [candidatoActual.id]: nuevoEstado,
    }))
    if (onUpdateEstado) {
      onUpdateEstado(candidatoActual.id, nuevoEstado)
    }
    setNotificacion(`Se actualizó el estado a «${nuevoEstado}». Se envió correo automático al postulante.`)
    setTimeout(() => setNotificacion(''), 4500)
  }

  // Guardar Nota Interna
  const handleGuardarNota = () => {
    setNotificacion('Nota interna guardada correctamente.')
    setTimeout(() => setNotificacion(''), 3500)
  }

  const habilidades = candidatoActual.habilidades || [
    'JavaScript',
    'React',
    'SQL',
    'Python',
    'Power BI',
    'Git',
    'Excel avanzado',
    'Figma',
    'Docker',
  ]

  return (
    <div className="perfil-postulante-page">
      <div className="perfil-postulante-container">
        
        {/* Notificación de feedback */}
        {notificacion && (
          <div className="perfil-alerta-toast" role="status">
            <span>✓ {notificacion}</span>
            <button type="button" onClick={() => setNotificacion('')}>✕</button>
          </div>
        )}

        {/* Barra superior: Miga de pan y Navegación Anterior / Siguiente */}
        <div className="perfil-top-nav">
          <nav className="breadcrumb" aria-label="Miga de pan">
            <button type="button" className="breadcrumb-btn-link" onClick={onBackToBandeja}>
              Bandeja de postulantes
            </button>
            <span className="breadcrumb-separator">·</span>
            <span className="breadcrumb-current">{candidatoActual.nombre}</span>
          </nav>

          <div className="nav-postulante-controls">
            <span className="postulante-counter-text">
              Postulante {candidatoIndex + 1} de {listaPostulantes.length}
            </span>
            <button
              type="button"
              className="btn-nav-arrow"
              onClick={handleAnterior}
              disabled={candidatoIndex === 0}
              title="Postulante anterior"
            >
              ← Anterior
            </button>
            <button
              type="button"
              className="btn-nav-arrow"
              onClick={handleSiguiente}
              disabled={candidatoIndex === listaPostulantes.length - 1}
              title="Siguiente postulante"
            >
              Siguiente →
            </button>
          </div>
        </div>

        {/* Layout en 2 Columnas */}
        <div className="perfil-grid">
          
          {/* Columna Izquierda (Datos del postulante) */}
          <div className="perfil-col-main">
            
            {/* Tarjeta de Encabezado de Mariana */}
            <div className="perfil-card header-candidate-card">
              <div className="candidate-header-left">
                <div className="candidate-photo-box" aria-label="Foto del postulante">
                  <span>foto</span>
                </div>
                <div className="candidate-title-info">
                  <h1 className="candidate-name">{candidatoActual.nombre}</h1>
                  <p className="candidate-sub-1">
                    {candidatoActual.carrera} · {candidatoActual.ciclo || 'Octavo ciclo'} · {candidatoActual.distrito || 'La Molina'}
                  </p>
                  <p className="candidate-sub-2">
                    {candidatoActual.correo} · {candidatoActual.telefono || '987 654 321'} · postuló el {candidatoActual.fechaPostulo || '20/08/2026'}
                  </p>
                </div>
              </div>

              <div className="candidate-header-right">
                <StatusBadge estado={estadoActual} />
                <span className="candidate-perfil-pct">
                  Perfil completo al {candidatoActual.porcentajePerfil || 78} %
                </span>
              </div>
            </div>

            {/* Tarjeta: Mensaje de la postulante */}
            <section className="perfil-card" aria-labelledby="mensaje-postulante-label">
              <h2 id="mensaje-postulante-label" className="perfil-card-title">
                Mensaje de la postulante
              </h2>
              <p className="perfil-card-paragraph">
                {candidatoActual.mensaje ||
                  'Me interesa el módulo de reportes que mencionan en la convocatoria: hice algo parecido con SQL y React en un proyecto del curso de Bases de Datos, donde reduje en 40 % el tiempo de consulta del reporte de ventas.'}
              </p>
            </section>

            {/* Tarjeta: Resumen profesional */}
            <section className="perfil-card" aria-labelledby="resumen-postulante-label">
              <h2 id="resumen-postulante-label" className="perfil-card-title">
                Resumen profesional
              </h2>
              <p className="perfil-card-paragraph">
                {candidatoActual.resumenProfesional ||
                  'Estudiante de octavo ciclo de Ingeniería de Sistemas con interés en desarrollo web y analítica de datos. Busco prácticas híbridas en Lima para aplicar React y SQL en un equipo de producto.'}
              </p>
            </section>

            {/* Tarjeta: Experiencia */}
            <section className="perfil-card" aria-labelledby="experiencia-postulante-label">
              <h2 id="experiencia-postulante-label" className="perfil-card-title">
                Experiencia
              </h2>
              <div className="experiencias-list">
                <article className="experiencia-item">
                  <h3 className="exp-cargo">Asistente de Soporte TI</h3>
                  <p className="exp-empresa">
                    Centro de Cómputo — Universidad de Lima · 03/2025 — actualidad
                  </p>
                </article>
                <article className="experiencia-item">
                  <h3 className="exp-cargo">Practicante de Analítica (proyecto de curso)</h3>
                  <p className="exp-empresa">
                    Cátedra de Bases de Datos — Universidad de Lima · 08/2025 — 12/2025
                  </p>
                </article>
                <article className="experiencia-item">
                  <h3 className="exp-cargo">Voluntaria de logística</h3>
                  <p className="exp-empresa">
                    Feria de Innovación Universitaria · 04/2025 — 05/2025
                  </p>
                </article>
              </div>
            </section>

          </div>

          {/* Columna Derecha (Acciones y notas internas) */}
          <aside className="perfil-col-side">
            
            {/* Tarjeta: CAMBIAR ESTADO */}
            <div className="perfil-card side-action-card">
              <h3 className="side-card-section-label">CAMBIAR ESTADO</h3>
              <div className="cambiar-estado-buttons">
                <button
                  type="button"
                  className="btn-estado-revision"
                  onClick={() => handleCambiarEstado('En revisión')}
                >
                  Marcar en revisión
                </button>
                <button
                  type="button"
                  className="btn-estado-aceptar"
                  onClick={() => handleCambiarEstado('Aceptada')}
                >
                  Aceptar postulante
                </button>
                <button
                  type="button"
                  className="btn-estado-descartar"
                  onClick={() => handleCambiarEstado('Descartada')}
                >
                  Descartar postulante
                </button>
              </div>
              <p className="side-footnote-desc">
                Al cambiar el estado, la postulante recibe un correo automático.
              </p>
            </div>

            {/* Tarjeta: NOTAS INTERNAS */}
            <div className="perfil-card side-notes-card">
              <h3 className="side-card-section-label">NOTAS INTERNAS</h3>
              <textarea
                className="side-notes-textarea"
                rows={4}
                value={notaInterna}
                onChange={(e) => setNotaInterna(e.target.value)}
                placeholder="Escribe comentarios privados sobre la entrevista o el perfil..."
              ></textarea>
              <p className="side-footnote-desc">
                Solo tu equipo ve estas notas. La postulante nunca las verá.
              </p>
              <button
                type="button"
                className="btn-guardar-nota"
                onClick={handleGuardarNota}
              >
                Guardar nota
              </button>
            </div>

            {/* Tarjeta: HABILIDADES DECLARADAS */}
            <div className="perfil-card side-skills-card">
              <h3 className="side-card-section-label">HABILIDADES DECLARADAS</h3>
              <div className="skills-chips-wrapper">
                {habilidades.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </div>
    </div>
  )
}

export default PerfilPostulante
