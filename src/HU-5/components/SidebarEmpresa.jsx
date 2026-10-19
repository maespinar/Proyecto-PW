import './SidebarEmpresa.css'

function SidebarEmpresa({ activeItem = 'bandeja', onSelect }) {
  return (
    <aside className="sidebar-empresa">
      <div className="sidebar-group">
        <h4 className="sidebar-group-title">CONVOCATORIAS</h4>
        <ul className="sidebar-list">
          <li>
            <button
              type="button"
              className={`sidebar-link ${activeItem === 'mis-convocatorias' ? 'active' : ''}`}
              onClick={() => onSelect && onSelect('mis-convocatorias')}
            >
              <span className="bullet"></span>
              Mis convocatorias
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`sidebar-link ${activeItem === 'nueva' ? 'active' : ''}`}
              onClick={() => onSelect && onSelect('nueva')}
            >
              <span className="bullet"></span>
              Nueva convocatoria
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`sidebar-link ${activeItem === 'bandeja' ? 'active' : ''}`}
              onClick={() => onSelect && onSelect('bandeja')}
            >
              <span className="bullet"></span>
              Bandeja de postulantes
            </button>
          </li>
        </ul>
      </div>

      <div className="sidebar-group">
        <h4 className="sidebar-group-title">EMPRESA</h4>
        <ul className="sidebar-list">
          <li>
            <button
              type="button"
              className={`sidebar-link ${activeItem === 'perfil-empresa' ? 'active' : ''}`}
              onClick={() => onSelect && onSelect('perfil-empresa')}
            >
              <span className="bullet"></span>
              Perfil de la empresa
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`sidebar-link ${activeItem === 'reseñas' ? 'active' : ''}`}
              onClick={() => onSelect && onSelect('reseñas')}
            >
              <span className="bullet"></span>
              Reseñas recibidas
            </button>
          </li>
        </ul>
      </div>

      <div className="sidebar-group">
        <h4 className="sidebar-group-title">CUENTA</h4>
        <ul className="sidebar-list">
          <li>
            <button
              type="button"
              className={`sidebar-link ${activeItem === 'password' ? 'active' : ''}`}
              onClick={() => onSelect && onSelect('password')}
            >
              <span className="bullet"></span>
              Cambiar contraseña
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`sidebar-link ${activeItem === 'logout' ? 'active' : ''}`}
              onClick={() => onSelect && onSelect('logout')}
            >
              <span className="bullet"></span>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default SidebarEmpresa
