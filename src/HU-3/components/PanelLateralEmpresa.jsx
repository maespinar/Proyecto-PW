import { NavLink } from 'react-router-dom';

export default function PanelLateralEmpresa() {
  return (
    <aside className="lateral">
      <nav aria-label="Navegación de empresa">
        <p className="grupo">CONVOCATORIAS</p>
        <NavLink to="/empresa/convocatorias" end>
          <span className="cuadro"></span>Mis convocatorias
        </NavLink>
        <NavLink to="/empresa/convocatorias/nueva" end>
          <span className="cuadro"></span>Nueva convocatoria
        </NavLink>
        <NavLink to="/empresa/postulantes"><span className="cuadro"></span>Bandeja de postulantes</NavLink>

        <p className="grupo">EMPRESA</p>
        <NavLink to="/empresa/perfil">
          <span className="cuadro"></span>Perfil de la empresa
        </NavLink>
        <NavLink to="/empresa/resenas"><span className="cuadro"></span>Reseñas recibidas</NavLink>

        <p className="grupo">CUENTA</p>
        <NavLink to="/empresa/cambiar-contrasena"><span className="cuadro"></span>Cambiar contraseña</NavLink>
        <NavLink to="/"><span className="cuadro"></span>Volver al inicio</NavLink>
      </nav>
    </aside>
  );
}