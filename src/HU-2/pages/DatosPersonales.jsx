import { Link } from 'react-router-dom'
import { usePerfil } from '../context/perfilContexto'
import { MAX_RESUMEN } from '../utils/validaciones'
import BarraCompletitud from '../components/BarraCompletitud'
import FotoPerfil from '../components/FotoPerfil'
import Cargando from '../components/Cargando'

function Dato({ etiqueta, valor }) {
  return (
    <div className="col-12 col-sm-6">
      <dt className="etiqueta-hu2">{etiqueta}</dt>
      <dd className="mb-3">{valor || <span className="text-muted">Sin registrar</span>}</dd>
    </div>
  )
}

export default function DatosPersonales() {
  const { perfil, cargando } = usePerfil()

  if (cargando || !perfil) return <Cargando />

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <p className="small text-muted mb-1">Inicio · <strong>Mi perfil</strong></p>
          <h1 className="h2 titulo-hu2 mb-0">Mi perfil profesional</h1>
        </div>
        <div className="d-flex gap-2">
          <Link to="/perfil/publico" className="btn btn-outline-secondary">Ver mi perfil público</Link>
          <Link to="/perfil/editar" className="btn btn-primary">Editar datos</Link>
        </div>
      </div>

      <BarraCompletitud perfil={perfil} />

      <div className="tarjeta-hu2 p-4 mb-3">
        <div className="row g-4">
          <div className="col-12 col-sm-auto text-center">
            <FotoPerfil foto={perfil.foto} nombres={perfil.nombres} />
            <div className="mt-2">
              <Link to="/perfil/editar" className="small">Cambiar foto</Link>
            </div>
          </div>
          <dl className="col row mb-0">
            <Dato etiqueta="Nombre completo" valor={`${perfil.nombres} ${perfil.apellidos}`} />
            <Dato etiqueta="Correo institucional" valor={perfil.correo} />
            <Dato etiqueta="Teléfono" valor={perfil.telefono} />
            <Dato etiqueta="Distrito de residencia" valor={perfil.distrito} />
            <Dato etiqueta="Carrera" valor={perfil.carrera} />
            <Dato etiqueta="Ciclo" valor={perfil.ciclo} />
          </dl>
        </div>
      </div>

      <div className="tarjeta-hu2 p-4 mb-3">
        <h2 className="h5 titulo-hu2">Resumen profesional</h2>
        {perfil.resumen ? (
          <>
            <p className="mb-2">{perfil.resumen}</p>
            <p className="small text-muted text-end mb-0">
              {perfil.resumen.length} / {MAX_RESUMEN} caracteres
            </p>
          </>
        ) : (
          <p className="text-muted mb-0">
            Aún no escribes tu resumen. <Link to="/perfil/editar">Escríbelo ahora</Link> para presentarte ante las empresas.
          </p>
        )}
      </div>

      <div className="tarjeta-hu2 p-4">
        <h2 className="h5 titulo-hu2">Enlaces externos</h2>
        {perfil.enlaces.length > 0 ? (
          <ul className="list-unstyled row g-2 mb-0">
            {perfil.enlaces.map((enlace) => (
              <li key={enlace.id} className="col-12 col-sm-6">
                <div className="enlace-hu2">
                  <span className="etiqueta-hu2 d-block">{enlace.tipo}</span>
                  {enlace.url}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted mb-0">Aún no agregas enlaces a tu portafolio o repositorio.</p>
        )}
      </div>
    </>
  )
}
