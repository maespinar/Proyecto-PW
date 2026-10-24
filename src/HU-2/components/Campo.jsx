// Envoltorio de un campo de formulario: etiqueta, control, error y ayuda.
export default function Campo({ id, etiqueta, error, ayuda, children }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label etiqueta-hu2">{etiqueta}</label>
      {children}
      {error && <div className="invalid-feedback d-block" id={`${id}-error`}>{error}</div>}
      {ayuda && !error && <div className="form-text">{ayuda}</div>}
    </div>
  )
}
