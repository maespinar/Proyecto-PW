export default function BadgesEstado({ estado, textoPersonalizado }) {
  const mapeo = {
    recibida: { clase: 'hu5-badge-recibida', texto: 'Recibida' },
    en_revision: { clase: 'hu5-badge-en_revision', texto: 'En revisión' },
    aceptada: { clase: 'hu5-badge-aceptada', texto: 'Aceptada' },
    descartada: { clase: 'hu5-badge-descartada', texto: 'Descartada' },
    retirada: { clase: 'hu5-badge-retirada', texto: 'Retirada' },
  }

  const config = mapeo[estado] || {
    clase: 'hu5-badge-retirada',
    texto: estado || 'Sin estado',
  }

  return (
    <span className={`hu5-badge ${config.clase}`}>
      {textoPersonalizado || config.texto}
    </span>
  )
}
