import './HeaderEstudiante.css'

function HeaderEstudiante({ activeTab = 'mis-postulaciones', onNavigate }) {
  return (
    <header className="header-estudiante">
      <div className="header-est-inner">
        <div className="header-est-left">
          <div className="header-est-logo" onClick={() => onNavigate && onNavigate('5.3')}>
            <span className="logo-box"></span>
            <span className="logo-title">PrácticaLima</span>
          </div>

          <nav className="header-est-nav" aria-label="Navegación principal">
            <ul>
              <li>
                <button
                  type="button"
                  className={activeTab === 'convocatorias' ? 'active' : ''}
                  onClick={() => onNavigate && onNavigate('5.1')}
                >
                  Convocatorias
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activeTab === 'mis-postulaciones' ? 'active' : ''}
                  onClick={() => onNavigate && onNavigate('5.3')}
                >
                  Mis postulaciones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activeTab === 'guardadas' ? 'active' : ''}
                  onClick={() => onNavigate && onNavigate('5.1-empty-guardadas')}
                >
                  Guardadas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activeTab === 'empresas' ? 'active' : ''}
                  onClick={() => onNavigate && onNavigate('5.5')}
                  title="Cambiar a panel de empresa"
                >
                  Empresas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activeTab === 'mi-perfil' ? 'active' : ''}
                  onClick={() => onNavigate && onNavigate('5.6')}
                >
                  Mi perfil
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header-est-right">
          <div className="header-est-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Buscar convocatorias" />
          </div>

          <div className="header-est-user">
            <span className="user-avatar-tag">MQ</span>
            <span className="user-name">Mariana Quispe</span>
            <span className="caret-down">▾</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderEstudiante
