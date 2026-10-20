import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePostulaciones } from '../context/usePostulaciones'
import TarjetaPostulacion from '../components/TarjetaPostulacion'
import EstadoVacio from '../components/EstadoVacio'
import ModalRetirarPostulacion from '../components/ModalRetirarPostulacion'
import ModalConfirmarPostulacion from '../components/ModalConfirmarPostulacion'

export default function MisPostulaciones() {
  const {
    postulaciones,
    postulacionesFiltradas,
    cargando,
    filtroEstado,
    setFiltroEstado,
    conteos,
    retirar,
    convocatoriaModal,
    cerrarModalPostulacion,
  } = usePostulaciones()

  const [postulacionARetirar, setPostulacionARetirar] = useState(null)

  const pestañas = [
    { id: 'todas', etiqueta: 'Todas', count: conteos.todas },
    { id: 'recibida', etiqueta: 'Recibidas', count: conteos.recibida },
    { id: 'en_revision', etiqueta: 'En revisión', count: conteos.en_revision },
    { id: 'aceptada', etiqueta: 'Aceptadas', count: conteos.aceptada },
    { id: 'descartada', etiqueta: 'Descartadas', count: conteos.descartada },
    { id: 'retirada', etiqueta: 'Retiradas', count: conteos.retirada },
  ]

  const fechaUltimaActualizacion = () => {
    if (!postulaciones.length) return '06/09/2026'
    return postulaciones[0].fechaActualizacion || '06/09/2026'
  }

  return (
    <div className="hu5-pagina-contenedor">
      {/* Migas de pan */}
      <nav className="hu5-breadcrumb" aria-label="Migas de pan">
        <Link to="/">Inicio</Link>
        <span className="separador">·</span>
        <span className="activo">Mis postulaciones</span>
      </nav>

      {/* Encabezado */}
      <header className="hu5-page-header">
        <h1 className="hu5-page-title">Mis postulaciones</h1>
        <span className="hu5-page-subtitle">
          {conteos.todas} postulaciones · última actualización{' '}
          {fechaUltimaActualizacion()}
        </span>
      </header>

      {/* Barra de filtros por estado */}
      <div className="hu5-pills-bar" role="tablist" aria-label="Filtro por estado">
        {pestañas.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={filtroEstado === p.id}
            className={`hu5-pill ${filtroEstado === p.id ? 'active' : ''}`}
            onClick={() => setFiltroEstado(p.id)}
          >
            <span>{p.etiqueta}</span>
            <span className="hu5-pill-count">· {p.count}</span>
          </button>
        ))}
      </div>

      {/* Lista de postulaciones o Estado Vacío */}
      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2 text-muted">Cargando tus postulaciones...</p>
        </div>
      ) : postulacionesFiltradas.length > 0 ? (
        <section aria-label="Listado de postulaciones">
          {postulacionesFiltradas.map((post) => (
            <TarjetaPostulacion
              key={post.id}
              postulacion={post}
              onSolicitarRetiro={(item) => setPostulacionARetirar(item)}
            />
          ))}
        </section>
      ) : (
        <EstadoVacio
          titulo={
            filtroEstado === 'todas'
              ? 'Aún no postulas a ninguna convocatoria'
              : `No tienes postulaciones en estado "${pestañas.find((p) => p.id === filtroEstado)?.etiqueta}"`
          }
          descripcion={
            filtroEstado === 'todas'
              ? 'Hay 38 convocatorias vigentes para Ingeniería de Sistemas. Aquí verás el estado de cada postulación que envíes.'
              : 'Puedes cambiar el filtro para ver tus otras postulaciones o revisar convocatorias en el catálogo.'
          }
          botonTexto={
            filtroEstado === 'todas'
              ? 'Ver convocatorias de mi carrera'
              : 'Ver todas las postulaciones'
          }
          onAccion={
            filtroEstado !== 'todas' ? () => setFiltroEstado('todas') : null
          }
          botonUrl="/"
        />
      )}

      {/* Modal para retirar postulación */}
      <ModalRetirarPostulacion
        postulacion={postulacionARetirar}
        onConfirmar={retirar}
        onCerrar={() => setPostulacionARetirar(null)}
      />

      {/* Modal para postular (disparable desde catálogo o botón de prueba) */}
      <ModalConfirmarPostulacion
        convocatoria={convocatoriaModal}
        onCerrar={cerrarModalPostulacion}
      />
    </div>
  )
}
