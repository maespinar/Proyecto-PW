import TarjetaConvocatoria from './TarjetaConvocatoria'

function ConvocatoriasDestacadas({ convocatorias }) {
  return (
    <div className="convos">
      {convocatorias.map((convocatoria) => (
        <TarjetaConvocatoria key={convocatoria.puesto} convocatoria={convocatoria} />
      ))}
      {convocatorias.length === 0 && (
        <p className="convos-vacio">No se encontraron convocatorias destacadas con esos filtros.</p>
      )}
    </div>
  )
}

export default ConvocatoriasDestacadas
