import { Link } from 'react-router-dom'

export default function TarjetaEmpresa({ empresa, totalVigentes }) {
  return (
    <article className="empresas-tarjeta">
      <div className="empresas-identidad">
        <span className="empresas-logo" aria-hidden="true">{empresa.iniciales}</span>
        <div>
          <p className="empresas-sector">{empresa.sector}</p>
          <h3>{empresa.nombreComercial}</h3>
        </div>
      </div>
      <p className="empresas-ubicacion">{empresa.distrito}, Lima · Empresa {empresa.tamano.toLowerCase()}</p>
      <p className="empresas-descripcion">{empresa.descripcion}</p>
      <div className="empresas-tarjeta-pie">
        <span className={totalVigentes > 0 ? 'empresas-vigentes' : 'empresas-sin-vigentes'}>
          {totalVigentes > 0
            ? `${totalVigentes} ${totalVigentes === 1 ? 'convocatoria vigente' : 'convocatorias vigentes'}`
            : 'Sin convocatorias vigentes'}
        </span>
        <Link to={`/empresas/${empresa.id}`} aria-label={`Ver empresa: ${empresa.nombreComercial}`}>
          Ver empresa <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
