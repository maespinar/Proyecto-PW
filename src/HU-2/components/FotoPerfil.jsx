export default function FotoPerfil({ foto, nombres, tamano = 120 }) {
  const estilo = { width: tamano, height: tamano }

  if (foto) {
    return <img src={foto} alt={`Foto de perfil de ${nombres}`} className="foto-perfil" style={estilo} />
  }
  return (
    <div className="foto-perfil foto-perfil-vacia" style={estilo} role="img" aria-label="Sin foto de perfil">
      foto de perfil
    </div>
  )
}
