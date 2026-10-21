export default function EstadoVacio({ icono, titulo, texto, textoBoton, onAccion }) {
  return (
    <div className="tarjeta-hu2 p-4 p-md-5 text-center">
      <div className="icono-vacio mx-auto mb-3" aria-hidden="true">{icono}</div>
      <h2 className="h5 titulo-hu2">{titulo}</h2>
      <p className="text-muted mx-auto" style={{ maxWidth: '28rem' }}>{texto}</p>
      <button type="button" className="btn btn-primary" onClick={onAccion}>{textoBoton}</button>
    </div>
  )
}
