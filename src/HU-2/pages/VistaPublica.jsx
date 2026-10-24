import { Link } from 'react-router-dom'
import { usePerfil } from '../context/perfilContexto'
import PerfilPublico from '../components/PerfilPublico'
import Cargando from '../components/Cargando'

// Vista previa para el estudiante: así lo ve una empresa.
export default function VistaPublica() {
  const { perfil, cargando } = usePerfil()

  if (cargando || !perfil) return <Cargando />

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <p className="small text-muted mb-1">Inicio · Mi perfil · <strong>Vista pública</strong></p>
          <h1 className="h2 titulo-hu2 mb-0">Mi perfil público</h1>
        </div>
        <Link to="/perfil" className="btn btn-outline-secondary">Volver a mi perfil</Link>
      </div>
      <div className="alert alert-info" role="note">
        Así ve tu perfil una empresa cuando revisa tu postulación. Desde aquí no se puede editar.
      </div>
      <PerfilPublico perfil={perfil} />
    </>
  )
}
