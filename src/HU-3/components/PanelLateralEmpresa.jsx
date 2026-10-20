import { NavLink } from 'react-router-dom';

export default function PanelLateralEmpresa() {
  return (
    <aside className="lateral">
      <nav>
        <p className="grupo">CONVOCATORIAS</p>
        <NavLink to="/empresa/convocatorias" end>
          <span className="cuadro"></span>Mis convocatorias
        </NavLink>
        <NavLink to="/empresa/convocatorias/nueva">
          <span className="cuadro"></span>Nueva convocatoria
        </NavLink>
        <a href="#"><span className="cuadro"></span>Bandeja de postulantes</a>

        <p className="grupo">EMPRESA</p>
        <NavLink to="/empresa/perfil">
          <span className="cuadro"></span>Perfil de la empresa
        </NavLink>
        <a href="#"><span className="cuadro"></span>Reseñas recibidas</a>

        <p className="grupo">CUENTA</p>
        <a href="#"><span className="cuadro"></span>Cambiar contraseña</a>
        <a href="#"><span className="cuadro"></span>Cerrar sesión</a>
      </nav>
    </aside>
  );
}