import { contarEstados } from '../utils/bandejaUtils'

export default function ResumenBandeja({ postulantes }) {
  const conteos = contarEstados(postulantes)
  const cifras = [
    ['total', 'Total de postulantes', postulantes.length],
    ['recibida', 'Recibidas', conteos.recibida],
    ['en_revision', 'En revisión', conteos.en_revision],
    ['aceptada', 'Aceptadas', conteos.aceptada],
    ['descartada', 'Descartadas', conteos.descartada],
  ]
  return (
    <dl className="bp-resumen" aria-label="Resumen de postulantes">
      {cifras.map(([estado, nombre, cantidad]) => (
        <div key={estado} className={`bp-cifra bp-cifra-${estado}`}>
          <dt>{nombre}</dt><dd>{cantidad}</dd>
        </div>
      ))}
    </dl>
  )
}