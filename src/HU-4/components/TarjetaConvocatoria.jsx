import { Link } from 'react-router-dom'
import empresas from '../data/empresas'
import { diasParaCierre, estaVigente, formatearFecha, formatearSoles, textoCierre } from '../utils/catalogoUtils'
import '../styles/Comun.css'

function TarjetaConvocatoria({ convocatoria, mostrarVigente, extra, children }) {
  const empresa = empresas.find((e) => e.id === convocatoria.empresaId)
  const vigente = estaVigente(convocatoria)
  const dias = diasParaCierre(convocatoria)
  const cierraPronto = vigente && dias <= 7

  const abreviadas = convocatoria.carreras.map((carrera) => carrera.replace('Ingeniería', 'Ing.'))
  let carreras = abreviadas[0]
  if (abreviadas.length > 1) {
    carreras = `${abreviadas.slice(0, -1).join(', ')} e ${abreviadas[abreviadas.length - 1]}`
  }

  return (
    <article className="tarjeta-conv">
      <span className="tarjeta-conv-logo">{empresa.iniciales}</span>

      <div className="tarjeta-conv-cuerpo">
        <div className="tarjeta-conv-titulo">
          <h3>
            <Link to={`/convocatorias/${convocatoria.id}`}>{convocatoria.puesto}</Link>
          </h3>
          {cierraPronto && <span className="etiqueta etiqueta-aviso">{textoCierre(dias)}</span>}
          {mostrarVigente && vigente && !cierraPronto && <span className="etiqueta etiqueta-vigente">Vigente</span>}
          {!vigente && <span className="etiqueta etiqueta-cerrada">Cerrada</span>}
        </div>

        <p className="tarjeta-conv-empresa">
          {empresa.nombreComercial} · {empresa.sector}
        </p>

        <div className="tarjeta-conv-pie">
          <p className="tarjeta-conv-meta">
            {carreras} · {convocatoria.modalidad} · {convocatoria.jornada} · {convocatoria.distrito}
            {extra && ` · ${extra}`}
          </p>
          <p className="tarjeta-conv-condiciones">
            <strong>{formatearSoles(convocatoria.subvencion)}</strong>
            <span>Cierra {formatearFecha(convocatoria.fechaCierre)}</span>
          </p>
        </div>
      </div>

      {children && <div className="tarjeta-conv-accion">{children}</div>}
    </article>
  )
}

export default TarjetaConvocatoria
