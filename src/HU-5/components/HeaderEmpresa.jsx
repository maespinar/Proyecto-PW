import './HeaderEmpresa.css'

function HeaderEmpresa({ onSearchChange, searchValue = '' }) {
  return (
    <header className="header-empresa">
      <div className="header-emp-inner">
        <div className="header-emp-brand">
          <div className="header-emp-logo">
            <span className="logo-box-emp"></span>
            <span className="logo-title-emp">PrácticaLima</span>
          </div>
          <span className="badge-panel-emp">PANEL DE EMPRESA</span>
        </div>

        <div className="header-emp-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Buscar postulantes"
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        </div>

        <div className="header-emp-account">
          <span className="emp-avatar">AP</span>
          <div className="emp-info">
            <span className="emp-name">Consultora Andes Perú S.A.C.</span>
            <span className="emp-status">Empresa · Cuenta verificada ▾</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderEmpresa
