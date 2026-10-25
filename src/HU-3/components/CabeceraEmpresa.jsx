import { Link, useLocation, useMatch } from 'react-router-dom'
import BuscadorConvocatorias from '../../HU-1/components/BuscadorConvocatorias'
import MenuCuenta from '../../HU-1/components/MenuCuenta'
import '../styles/EmpresaLayout.css'

export default function CabeceraEmpresa({ usuario, onCerrarSesion }) {
  const { pathname, search } = useLocation()
  const esBandeja = pathname === '/empresa/postulantes' || pathname.startsWith('/empresa/postulantes/')
  const perfilPostulante = useMatch('/empresa/postulantes/:convocatoriaId/:postulanteId')
  const destinoBandeja = perfilPostulante ? `/empresa/postulantes/${perfilPostulante.params.convocatoriaId}` : pathname

  return (
    <header className="cabecera">
      <div className="cabecera-izq">
        <Link to="/empresa/perfil" className="logo" aria-label="PrácticaLima, mi empresa">
          <span className="logo-icono" aria-hidden="true" />
          PrácticaLima
        </Link>
        <span className="panel-nombre">Panel de empresa</span>
      </div>
      <BuscadorConvocatorias
        key={pathname + search}
        destino={esBandeja ? destinoBandeja : '/empresa/convocatorias'}
        placeholder={esBandeja ? 'Buscar postulantes' : 'Buscar en mis convocatorias'}
        etiqueta={esBandeja ? 'Buscar postulantes' : 'Buscar en mis convocatorias'}
      />
      <MenuCuenta usuario={usuario} onCerrarSesion={onCerrarSesion} panelEmpresa />
    </header>
  )
}
