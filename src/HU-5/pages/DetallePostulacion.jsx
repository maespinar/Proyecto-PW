import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePostulaciones } from '../context/usePostulaciones'
import BadgesEstado from '../components/BadgesEstado'
import LineaTiempoTrazabilidad from '../components/LineaTiempoTrazabilidad'
import ModalRetirarPostulacion from '../components/ModalRetirarPostulacion'
import { formatearMoneda } from '../utils/formateadores'
import { buscarPostulacion, puedeRetirarPostulacion, rutaConvocatoria } from '../utils/postulacionesUtils'
import EstadoCargaPostulaciones from '../components/EstadoCargaPostulaciones'

export default function DetallePostulacion() {
  const { id } = useParams()
  const { postulaciones, retirar, cargando, error, reintentar } = usePostulaciones()
  const postulacion = buscarPostulacion(postulaciones, id)
  const [modalRetiroAbierto, setModalRetiroAbierto] = useState(false)

  if (cargando || error) {
    return (
      <div className="hu5 container py-5 text-center">
        <EstadoCargaPostulaciones cargando={cargando} error={error} onReintentar={reintentar} />
      </div>
    )
  }

  if (!postulacion) {
    return (
      <div className="hu5 container py-5 text-center">
        <h1 className="hu5-page-title mb-3">Postulación no encontrada</h1>
        <p className="text-muted mb-4">
          La postulación que buscas no existe o ha sido eliminada.
        </p>
        <Link to="/postulaciones" className="hu5-btn-primary">
          Volver a mis postulaciones
        </Link>
      </div>
    )
  }

  const puedeRetirar = puedeRetirarPostulacion(postulacion)
  const ruta = rutaConvocatoria(postulacion)

  return (
    <div className="hu5 container py-4">
      {/* Migas de pan */}
      <nav className="hu5-breadcrumb" aria-label="Migas de pan">
        <Link to="/postulaciones">Mis postulaciones</Link>
        <span className="separador">/</span>
        <span className="activo">{postulacion.puesto}</span>
      </nav>
      <h1 className="hu5-page-title mb-3">{postulacion.puesto}</h1>
      <p className="hu5-nota-simulacion">Demostración local. Esta información no representa un envío real a la empresa.</p>

      <div className="row g-4">
        {/* Columna Izquierda: Estados, Mensaje y Perfil enviado */}
        <div className="col-12 col-lg-8">
          {/* Tarjeta 1: Estado de la postulación + Trazabilidad */}
          <div className="hu5-card">
            <div className="hu5-card-title">
              <span>Estado de la postulación</span>
              <BadgesEstado estado={postulacion.estado} />
            </div>

            <LineaTiempoTrazabilidad
              trazabilidad={postulacion.trazabilidad}
              estadoActual={postulacion.estado}
            />
          </div>

          {/* Tarjeta 2: Mensaje que enviaste */}
          <div className="hu5-card">
            <h3 className="hu5-card-title" style={{ fontSize: '1rem' }}>
              Mensaje registrado
            </h3>
            <div className="hu5-quote-box">
              {postulacion.mensaje || 'No se incluyó un mensaje opcional al reclutador.'}
            </div>
            <p className="hu5-help-note">
              Registrado el {postulacion.fechaPostulacion}. El mensaje no se puede
              editar después de postular.
            </p>
          </div>

          {/* Tarjeta 3: Perfil enviado */}
          <div className="hu5-card">
            <h3 className="hu5-card-title" style={{ fontSize: '1rem' }}>
              Perfil registrado
            </h3>
            <div className="hu5-perfil-resumen-box">
              {postulacion.perfilResumen ? <>
                {postulacion.perfilResumen.carrera} · {postulacion.perfilResumen.ciclo} ·{' '}
                {postulacion.perfilResumen.habilidadesCount} habilidades ·{' '}
                {postulacion.perfilResumen.experienciasCount} experiencias ·{' '}
                {postulacion.perfilResumen.enlacesCount} enlaces externos
              </> : 'Esta postulación semilla no incluye un resumen histórico del perfil.'}
            </div>
            <p className="hu5-help-note">
              Las nuevas postulaciones conservan el resumen del perfil al momento de registrarlas localmente.
            </p>
          </div>
        </div>

        {/* Columna Derecha: Ficha de la empresa y Acción de Retiro */}
        <div className="col-12 col-lg-4">
          {/* Tarjeta Empresa */}
          <div className="hu5-card">
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
              <div className="hu5-avatar-empresa">
                {postulacion.empresaSiglas || 'EM'}
              </div>
              <div>
                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    margin: 0,
                    color: '#0f172a',
                  }}
                >
                  {postulacion.empresa}
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {postulacion.rubro} · {postulacion.distrito}
                </div>
              </div>
            </div>

            <table className="hu5-table-info">
              <tbody>
                <tr>
                  <td>Subvención</td>
                  <td>{formatearMoneda(postulacion.subvencion)}</td>
                </tr>
                <tr>
                  <td>Modalidad</td>
                  <td>{postulacion.modalidad}</td>
                </tr>
                <tr>
                  <td>Jornada</td>
                  <td>{postulacion.jornada}</td>
                </tr>
                <tr>
                  <td>Cierre</td>
                  <td>{postulacion.fechaCierre}</td>
                </tr>
              </tbody>
            </table>

            {ruta ? <Link
              to={ruta}
              className="hu5-btn-outline"
              style={{ width: '100%' }}
            >
              Ver la convocatoria
            </Link> : <p className="hu5-help-note">La convocatoria original ya no está disponible en el catálogo.</p>}
          </div>

          {/* Tarjeta Retirar postulación */}
          {puedeRetirar ? (
            <div className="hu5-card">
              <h4
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '0.5rem',
                }}
              >
                Retirar mi postulación
              </h4>
              <p
                style={{
                  fontSize: '0.825rem',
                  color: '#64748b',
                  lineHeight: '1.4',
                  marginBottom: '1rem',
                }}
              >
                Puedes retirarte mientras la convocatoria siga vigente. No
                podrás volver a postular a este puesto.
              </p>
              <button
                type="button"
                className="hu5-btn-danger-outline"
                onClick={() => setModalRetiroAbierto(true)}
              >
                Retirar postulación
              </button>
            </div>
          ) : (
            <div
              className="hu5-card"
              style={{ background: '#f8fafc', textAlign: 'center' }}
            >
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {postulacion.estado === 'retirada'
                  ? 'Esta postulación ya ha sido retirada.'
                  : postulacion.estado === 'aceptada'
                  ? 'La postulación figura como aceptada en los datos de demostración.'
                  : ['recibida', 'en_revision'].includes(postulacion.estado)
                  ? 'No puedes retirar esta postulación porque la convocatoria ya no está vigente o no está disponible.'
                  : 'Este proceso de postulación ha finalizado en la demostración.'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación para retirar */}
      <ModalRetirarPostulacion
        postulacion={modalRetiroAbierto ? postulacion : null}
        onConfirmar={retirar}
        onCerrar={() => setModalRetiroAbierto(false)}
      />
    </div>
  )
}
