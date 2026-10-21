export default function AlertaValidacionRegistro({ cantidad }) {
  if (!cantidad) return null

  return (
    <div className="registro-alerta-validacion" role="alert">
      Revisa {cantidad} {cantidad === 1 ? 'campo' : 'campos'} antes de continuar.
    </div>
  )
}
