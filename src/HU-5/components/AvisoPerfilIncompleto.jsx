import { Link } from 'react-router-dom'

export default function AvisoPerfilIncompleto({
  porcentaje = 42,
  onPostularAsi,
}) {
  return (
    <div className="hu5-alert-incompleto" role="alert">
      <div style={{ fontSize: '1.1rem', lineHeight: '1' }}>⚠️</div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: '0 0 0.5rem 0' }}>
          Tu perfil está completo al <strong>{porcentaje} %</strong>. Puedes
          postular igual, pero las empresas priorizan perfiles con habilidades
          y experiencia.
        </p>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <Link
            to="/perfil/editar"
            className="hu5-btn-outline"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          >
            Completar mi perfil
          </Link>
          {onPostularAsi && (
            <button
              type="button"
              className="hu5-btn-accent"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
              onClick={onPostularAsi}
            >
              Postular así
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
