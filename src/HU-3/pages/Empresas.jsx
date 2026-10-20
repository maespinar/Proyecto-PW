import { Link } from 'react-router-dom'
import empresas from '../../HU-4/data/empresas'
import '../styles/FichaEmpresa.css'

export default function Empresas() {
  return (
    <section className="fe">
      <h1>Empresas</h1>
      <p>Conoce las empresas y sus convocatorias vigentes.</p>
      <p><Link to="/empresa/perfil">Panel de empresa (demostración)</Link></p>
      <div className="fe-lista">
        {empresas.map((empresa) => (
          <article key={empresa.id} className="fe-tarjeta">
            <h2><Link to={'/empresas/' + empresa.id}>{empresa.nombreComercial}</Link></h2>
            <p>{empresa.sector} · {empresa.distrito}, Lima</p>
            <p>{empresa.descripcion}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
