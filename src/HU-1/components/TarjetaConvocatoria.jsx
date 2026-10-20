function TarjetaConvocatoria({ convocatoria }) {
  return (
    <article>
      <span className="avatar" aria-hidden="true">{convocatoria.iniciales}</span>
      <div className="convo-contenido">
        <h3>{convocatoria.puesto}</h3>
        <p className="empresa">{convocatoria.empresa}</p>
        <div className="pie">
          <p className="descripcion">{convocatoria.descripcion}</p>
          <p className="convo-condiciones">
            <span className="precio">{convocatoria.subvencion}</span>
            <span className="cierre">Cierra {convocatoria.cierre}</span>
          </p>
        </div>
      </div>
    </article>
  )
}

export default TarjetaConvocatoria
