import { Link } from 'react-router-dom'

export default function AvisoPerfilIncompleto({ porcentaje, rutaCompletar, onCompletar, onPostularAsi }) {
  return (
    <div className="hu5-alert-incompleto" role="status">
      <div>
        <p>Tu perfil está completo al <strong>{porcentaje} %</strong>. Puedes completarlo ahora o continuar con la información disponible.</p>
        <div className="hu5-acciones-flex">
          <Link to={rutaCompletar} className="hu5-btn-outline" onClick={onCompletar}>Completar mi perfil</Link>
          <button type="button" className="hu5-btn-accent" onClick={onPostularAsi}>Postular así</button>
        </div>
      </div>
    </div>
  )
}