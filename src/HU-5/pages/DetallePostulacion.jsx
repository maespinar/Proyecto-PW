import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePostulaciones } from '../context/usePostulaciones'
import * as postulacionesService from '../services/postulacionesService'
import BadgesEstado from '../components/BadgesEstado'
import LineaTiempoTrazabilidad from '../components/LineaTiempoTrazabilidad'
import ModalRetirarPostulacion from '../components/ModalRetirarPostulacion'
import { formatearMoneda } from '../utils/formateadores'

export default function DetallePostulacion() {
  const { id } = useParams()
  const { retirar } = usePostulaciones()

  const [postulacion, setPostulacion] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [modalRetiroAbierto, setModalRetiroAbierto] = useState(false)

  useEffect(() => {
    let activo = true
    postulacionesService
      .obtenerPostulacionPorId(id)
      .then((datos) => {
        if (activo) {
          setPostulacion(datos)
          setCargando(false)
        }
      })
      .catch(() => {
        if (activo) setCargando(false)
      })
    return () => {
      activo = false
    }
  }, [id])

  const handleConfirmarRetiro = async (idPost) => {
    const actualizada = await retirar(idPost)
    setPostulacion(actualizada)
    setModalRetiroAbierto(false)
  }

  if (cargando) {
    return (
      <div className="hu5 container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando detalle...</span>
        </div>
      </div>
    )
  }

  if (!postulacion) {
    return (
      <div className="hu5 container py-5 text-center">
        <h2 className="hu5-page-title mb-3">Postulación no encontrada</h2>
        <p className="text-muted mb-4">
          La postulación que buscas no existe o ha sido eliminada.
        </p>
        <Link to="/postulaciones" className="hu5-btn-primary">
          Volver a mis postulaciones
        </Link>
      </div>
    )
  }

  const puedeRetirar =
    postulacion.estado === 'recibida' || postulacion.estado === 'en_revision'

  return (
    <div className="hu5 container py-4">
      {/* Migas de pan */}
      <nav className="hu5-breadcrumb" aria-label="Migas de pan">
        <Link to="/postulaciones">Mis postulaciones</Link>
        <span className="separador">/</span>
        <span className="activo">{postulacion.puesto}</span>
      </nav>

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
              Mensaje que enviaste
            </h3>
            <div className="hu5-quote-box">
              {postulacion.mensaje || 'No se incluyó un mensaje opcional al reclutador.'}
            </div>
            <p className="hu5-help-note">
              Enviado el {postulacion.fechaPostulacion}. El mensaje no se puede
              editar después de postular.
            </p>
          </div>

          {/* Tarjeta 3: Perfil enviado */}
          <div className="hu5-card">
            <h3 className="hu5-card-title" style={{ fontSize: '1rem' }}>
              Perfil enviado
            </h3>
            <div className="hu5-perfil-resumen-box">
              {postulacion.perfilResumen?.carrera || 'Ingeniería de Sistemas'} ·{' '}
              {postulacion.perfilResumen?.ciclo || 'Octavo ciclo'} ·{' '}
              {postulacion.perfilResumen?.habilidadesCount || 9} habilidades ·{' '}
              {postulacion.perfilResumen?.experienciasCount || 3} experiencias ·{' '}
              {postulacion.perfilResumen?.enlacesCount || 2} enlaces externos
            </div>
            <p className="hu5-help-note">
              La empresa ve la versión de tu perfil al momento de postular.
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

            <Link
              to="/"
              className="hu5-btn-outline"
              style={{ width: '100%' }}
            >
              Ver la convocatoria
            </Link>
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
                  ? '¡Has sido aceptado para esta vacante!'
                  : 'Este proceso de postulación ha finalizado.'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación para retirar */}
      <ModalRetirarPostulacion
        postulacion={modalRetiroAbierto ? postulacion : null}
        onConfirmar={handleConfirmarRetiro}
        onCerrar={() => setModalRetiroAbierto(false)}
      />
    </div>
  )
}
