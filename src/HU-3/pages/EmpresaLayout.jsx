import { Outlet } from 'react-router-dom';
import CabeceraEmpresa from '../components/CabeceraEmpresa.jsx';
import PanelLateralEmpresa from '../components/PanelLateralEmpresa.jsx';
import PieEmpresa from '../components/PieEmpresa.jsx';
import '../styles/EmpresaLayout.css';

export default function EmpresaLayout() {
  return (
    <div>
      <CabeceraEmpresa />

      <div className="cuerpo">
        <PanelLateralEmpresa />
        <main className="contenido">
          <Outlet />
        </main>
      </div>

      <PieEmpresa />
    </div>
  );
}