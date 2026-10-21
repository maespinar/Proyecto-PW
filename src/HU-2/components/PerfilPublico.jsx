import { claseNivel, ordenarPorNivel } from '../utils/habilidades'
import { ordenarExperiencias, textoPeriodo } from '../utils/experiencia'
import { hrefSeguro } from '../utils/enlaces'
import FotoPerfil from './FotoPerfil'
import '../styles/hu2.css'

const CLASE_ESTADO = {
  recibida: 'estado-recibida',
  'en revisión': 'estado-revision',
  aceptada: 'estado-aceptada',
  descartada: 'estado-descartada',
}

// "2026-08-20" -> "20/08/2026"
function formatearFecha(fecha) {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha ?? '')
  return partes ? `${partes[3]}/${partes[2]}/${partes[1]}` : fecha
}

// Contenido del perfil tal como lo ve la empresa (sin controles de edición).
//   perfil:      datos del estudiante (ver perfil.seed.json)
//   postulacion: opcional, { estado, fecha } -> lo pasa HU-5 desde la bandeja
export default function PerfilPublico({ perfil, postulacion }) {
  const habilidades = ordenarPorNivel(perfil.habilidades)
  const experiencias = ordenarExperiencias(perfil.experiencias)
  const nombreCompleto = `${perfil.nombres} ${perfil.apellidos}`

  return (
    <div className="hu2">
      <header className="tarjeta-hu2 p-4 mb-3">
        <div className="d-flex flex-wrap gap-3">
          <FotoPerfil foto={perfil.foto} nombres={perfil.nombres} tamano={104} />
          <div className="flex-grow-1">
            <h1 className="h3 titulo-hu2 mb-1">{nombreCompleto}</h1>
            <p className="mb-1">
              {perfil.carrera} · {perfil.ciclo} ciclo{perfil.distrito ? ` · ${perfil.distrito}` : ''}
            </p>
            <p className="small text-muted mb-0">
              <a href={`mailto:${perfil.correo}`}>{perfil.correo}</a>
              {perfil.telefono && <span className="ms-3">{perfil.telefono}</span>}
            </p>
          </div>
          {postulacion && (
            <div className="text-md-end">
              <span className={`estado-hu2 ${CLASE_ESTADO[postulacion.estado.toLowerCase()] ?? ''}`}>
                {postulacion.estado}
              </span>
              <p className="small text-muted mt-2 mb-0">Postuló el {formatearFecha(postulacion.fecha)}</p>
            </div>
          )}
        </div>
      </header>

      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <section className="tarjeta-hu2 p-4 mb-3">
            <h2 className="h5 titulo-hu2">Resumen profesional</h2>
            {perfil.resumen ? (
              <p className="mb-0">{perfil.resumen}</p>
            ) : (
              <p className="text-muted mb-0">Este estudiante aún no escribió su resumen profesional.</p>
            )}
          </section>

          <section className="tarjeta-hu2 p-4">
            <h2 className="h5 titulo-hu2">Experiencia</h2>
            {experiencias.length === 0 ? (
              <p className="text-muted mb-0">Este estudiante aún no registró experiencia.</p>
            ) : (
              <ul className="list-unstyled mb-0">
                {experiencias.map((experiencia) => (
                  <li key={experiencia.id} className="experiencia-publica">
                    <p className="fw-bold mb-0">{experiencia.cargo}</p>
                    <p className="mb-0">{experiencia.organizacion}</p>
                    <p className="small text-muted mb-1">{textoPeriodo(experiencia)}</p>
                    {experiencia.descripcion && <p className="small mb-0">{experiencia.descripcion}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="col-12 col-lg-4">
          <section className="tarjeta-hu2 p-4 mb-3">
            <h2 className="h5 titulo-hu2">Habilidades</h2>
            {habilidades.length === 0 ? (
              <p className="text-muted mb-0">Este estudiante aún no registró habilidades.</p>
            ) : (
              <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
                {habilidades.map((habilidad) => (
                  <li key={habilidad.id} className="chip-habilidad chip-publico">
                    <span className="fw-semibold">{habilidad.nombre}</span>
                    <span className={`etiqueta-nivel ${claseNivel(habilidad.nivel)}`}>{habilidad.nivel}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="tarjeta-hu2 p-4">
            <h2 className="h5 titulo-hu2">Enlaces</h2>
            {perfil.enlaces.length === 0 ? (
              <p className="text-muted mb-0">Este estudiante aún no agregó enlaces.</p>
            ) : (
              <ul className="list-unstyled mb-0">
                {perfil.enlaces.map((enlace) => (
                  <li key={enlace.id} className="mb-1 text-break">
                    <a href={hrefSeguro(enlace.url) ?? undefined} target="_blank" rel="noopener noreferrer">{enlace.url}</a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
