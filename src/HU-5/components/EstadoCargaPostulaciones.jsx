export default function EstadoCargaPostulaciones({ cargando, error, onReintentar }) {
  if (cargando) return <p className="hu5-card" role="status">Cargando postulaciones…</p>
  if (error) return (
    <div className="hu5-card" role="alert">
      <p>{error}</p>
      <button type="button" className="hu5-btn-primary" onClick={onReintentar}>Reintentar</button>
    </div>
  )
  return null
}
