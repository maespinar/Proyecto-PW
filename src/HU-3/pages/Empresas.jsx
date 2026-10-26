import { Link } from 'react-router-dom'
import empresas from '../../HU-4/data/empresas'
import convocatorias from '../../HU-4/data/convocatorias'
import { estaVigente } from '../../HU-4/utils/catalogoUtils'
import TarjetaEmpresa from '../components/TarjetaEmpresa'
import '../styles/Empresas.css'
import { useEmpresa } from '../context/empresaContexto'

export default function Empresas() {
  const { empresa: perfilEmpresa } = useEmpresa()
  const empresasPublicas = empresas.map(empresa => empresa.id === 'e01' ? { ...empresa, ...perfilEmpresa } : empresa)
  const vigentes = convocatorias.filter(estaVigente)

  return (
    <section className="directorio-empresas" aria-labelledby="empresas-titulo">
      <header className="empresas-cabecera">
        <div className="empresas-presentacion">
          <p className="empresas-antetitulo">Conoce dónde dar tu siguiente paso</p>
          <h1 id="empresas-titulo">Empresas</h1>
          <p className="empresas-introduccion">
            Explora las empresas, conoce a qué se dedican y descubre sus oportunidades de prácticas.
          </p>
          <Link className="empresas-boton" to="/convocatorias">
            Explorar convocatorias <span aria-hidden="true">→</span>
          </Link>
        </div>
        <dl className="empresas-resumen">
          <div>
            <dt>Empresas en el directorio</dt>
            <dd>{empresas.length}</dd>
          </div>
          <div>
            <dt>Convocatorias vigentes</dt>
            <dd>{vigentes.length}</dd>
          </div>
        </dl>
      </header>

      <div className="empresas-listado-cabecera">
        <h2>Conoce las empresas</h2>
        <p>{empresas.length} {empresas.length === 1 ? 'empresa' : 'empresas'}</p>
      </div>
      {empresas.length > 0 ? (
        <div className="empresas-grilla">
          {empresasPublicas.map((empresa) => (
            <TarjetaEmpresa
              key={empresa.id}
              empresa={empresa}
              totalVigentes={vigentes.filter((convocatoria) => convocatoria.empresaId === empresa.id).length}
            />
          ))}
        </div>
      ) : (
        <div className="empresas-vacio" role="status">
          <h3>Aún no hay empresas para mostrar</h3>
          <p>Cuando estén disponibles, podrás conocerlas aquí.</p>
        </div>
      )}

      <aside className="empresas-panel" aria-labelledby="empresas-panel-titulo">
        <div>
          <h2 id="empresas-panel-titulo">¿Representas a una empresa?</h2>
          <p>Conoce el panel para gestionar el perfil institucional y las convocatorias.</p>
        </div>
        <Link to="/empresa/perfil">Panel de empresa (demostración) <span aria-hidden="true">→</span></Link>
      </aside>
    </section>
  )
}
