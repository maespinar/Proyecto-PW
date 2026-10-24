function ComoFunciona({ pasos }) {
  return (
    <div className="pasos" id="como-funciona" aria-label="Cómo funciona">
      {pasos.map((paso, indice) => (
        <article key={paso.titulo}>
          <h3><span className="numero">{indice + 1}</span> {paso.titulo}</h3>
          <p>{paso.descripcion}</p>
        </article>
      ))}
    </div>
  )
}

export default ComoFunciona
