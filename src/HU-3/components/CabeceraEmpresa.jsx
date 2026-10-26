import { useEmpresa } from '../context/empresaContexto';

export default function CabeceraEmpresa() {
  const { empresa } = useEmpresa();
  const iniciales = empresa.nombreComercial
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
    
  return (
    <header className="cabecera">
      <div className="cabecera-izq">
        <span className="logo">
          <span className="logo-icono"></span>
          PrácticaLima
        </span>
        <span className="panel-nombre">PANEL DE EMPRESA</span>
      </div>

      <div className="buscador-caja">
        <span className="buscador-icono"></span>
        <input type="search" className="buscador" placeholder="Buscar en mis convocatorias" />
      </div>

      <div className="cuenta">
        <span className="avatar">AP</span>
        <div>
          <p id="nombre">Consultora Andes Perú S.A.C.</p>
          <p id="empresa">Empresa · Cuenta verificada</p>
        </div>
        <span className="flecha">▾</span>
      </div>
    </header>
  );
}