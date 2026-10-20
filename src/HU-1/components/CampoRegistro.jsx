export default function CampoRegistro({ nombre, etiqueta, ayuda, error, children }) {
  return (
    <div className="registro-campo">
      <label className="registro-etiqueta" htmlFor={`registro-${nombre}`}>{etiqueta}</label>
      {children}
      {ayuda && <p className="registro-ayuda" id={`registro-${nombre}-ayuda`}>{ayuda}</p>}
      {error && <p className="registro-error" id={`registro-${nombre}-error`}>{error}</p>}
    </div>
  )
}
