import { Outlet } from 'react-router-dom'
import PanelLateralEmpresa from '../components/PanelLateralEmpresa'
import '../styles/EmpresaLayout.css'

export default function EmpresaLayout() {
  return (
    <div className="empresa-layout">
      <div className="cuerpo">
        <PanelLateralEmpresa />
        <section className="contenido" aria-label="Panel de empresa">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
