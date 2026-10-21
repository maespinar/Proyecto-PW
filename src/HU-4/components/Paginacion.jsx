function Paginacion({ pagina, total, porPagina, onCambiar }) {
  const totalPaginas = Math.ceil(total / porPagina)
  const desde = (pagina - 1) * porPagina + 1
  const hasta = Math.min(pagina * porPagina, total)

  const numeros = []
  for (let numero = 1; numero <= totalPaginas; numero++) {
    numeros.push(numero)
  }

  return (
    <div className="catalogo-paginacion">
      <p>
        Mostrando {desde}–{hasta} de {total} convocatorias
      </p>

      {totalPaginas > 1 && (
        <div className="catalogo-paginas">
          <button type="button" disabled={pagina === 1} onClick={() => onCambiar(pagina - 1)}>
            Anterior
          </button>
          {numeros.map((numero) => (
            <button
              key={numero}
              type="button"
              className={numero === pagina ? 'pagina-actual' : ''}
              onClick={() => onCambiar(numero)}
            >
              {numero}
            </button>
          ))}
          <button type="button" disabled={pagina === totalPaginas} onClick={() => onCambiar(pagina + 1)}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default Paginacion
