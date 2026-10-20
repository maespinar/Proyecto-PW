import { Link } from 'react-router-dom'
import { usePostulaciones } from '../context/usePostulaciones'
import BadgesEstado from '../components/BadgesEstado'
import convocatoriasDisponibles from '../data/convocatoriasDisponibles.json'
import { formatearMoneda } from '../utils/formateadores'

export default function ConfirmacionEnvio() {
  const { ultimaPostulacionCreada } = usePostulaciones()

  // Si no hay una recién creada, tomamos datos por defecto para exhibir la pantalla fiel a la imagen
  const datos = ultimaPostulacionCreada || {
    puesto: 'Practicante de Desarrollo de Software',
    empresa: 'Consultora Andes Perú',
    fechaEnvio: '07/09/2026 · 10:24',
    estado: 'recibida',
  }

  // Recomendaciones basadas en las otras convocatorias de su carrera (Ingeniería de Sistemas)
  const recomendaciones = convocatoriasDisponibles.slice(1, 3)

  return (
    <div className="hu5 container py-4">
      {/* Tarjeta Central de Confirmación de Postulación */}
      <div className="hu5-confirmacion-card">
        <div className="hu5-check-circle" aria-hidden="true">
          ✓
        </div>

        <h1 className="hu5-confirmacion-titulo">Tu postulación fue enviada</h1>

        <p className="hu5-confirmacion-desc">
          <strong>{datos.empresa}</strong> recibió tu perfil y tu mensaje para «
          {datos.puesto}». Te avisaremos por correo cada vez que el estado
          cambie.
        </p>

        <div className="hu5-confirmacion-snippet">
          <div>
            <div className="titulo">{datos.puesto}</div>
            <div className="fecha">
              Enviada el{' '}
              {datos.trazabilidad?.[0]?.fecha || datos.fechaEnvio || 'Hoy'}
            </div>
          </div>
          <BadgesEstado estado={datos.estado || 'recibida'} />
        </div>

        <div className="hu5-confirmacion-botones">
          <Link to="/postulaciones" className="hu5-btn-primary">
            Ir a mis postulaciones
          </Link>
          <Link to="/" className="hu5-btn-outline">
            Seguir buscando
          </Link>
        </div>
      </div>

      {/* Otras convocatorias de tu carrera */}
      <section className="hu5-recomendaciones-seccion">
        <h2 className="hu5-recomendaciones-titulo">
          Otras convocatorias de tu carrera
        </h2>

        {recomendaciones.map((conv) => (
          <article key={conv.id} className="hu5-recomendacion-item">
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
              <div className="hu5-avatar-empresa">{conv.empresaSiglas}</div>
              <div>
                <h3
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    margin: '0 0 0.15rem 0',
                  }}
                >
                  {conv.puesto}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {conv.empresa} · {conv.rubro}
                </div>
                <div style={{ marginTop: '0.35rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: '#eff6ff',
                      color: '#1d4ed8',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  >
                    {conv.carrera}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#8c9ba8' }}>
                    {conv.modalidad} · {conv.jornada} · {conv.distrito}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: '#0f172a',
                }}
              >
                {formatearMoneda(conv.subvencion)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Cierra {conv.fechaCierre}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
