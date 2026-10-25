import { Link } from 'react-router-dom'
import PieEmpresa from '../../HU-3/components/PieEmpresa'
import '../styles/Footer.css'

function Footer({ panelEmpresa = false }) {
  if (panelEmpresa) return <PieEmpresa />
  return (
    <footer className="footer">
      <div className="footer-interior">
        <div className="footer-marca">
          <p className="footer-nombre">PrácticaLima</p>
          <p className="footer-descripcion">
            Bolsa de prácticas pre-profesionales para estudiantes de la Universidad de Lima.
          </p>
        </div>

        <nav className="footer-columna" aria-label="Plataforma">
          <h4>PLATAFORMA</h4>
          <ul>
            <li><Link to="/#convocatorias">Convocatorias</Link></li>
            <li><Link to="/empresas">Empresas</Link></li>
            <li><Link to="/publicar">Publicar convocatoria</Link></li>
          </ul>
        </nav>

        <nav className="footer-columna" aria-label="Ayuda">
          <h4>AYUDA</h4>
          <ul>
            <li><Link to="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
            <li><Link to="/terminos">Términos del servicio</Link></li>
            <li><Link to="/privacidad">Privacidad de datos</Link></li>
          </ul>
        </nav>

        <div className="footer-columna">
          <h4>CONTACTO</h4>
          <ul>
            <li>practicas@ulima.edu.pe</li>
            <li>Av. Javier Prado Este 4600</li>
            <li>Sede Monterrico, Lima</li>
          </ul>
        </div>

        <p className="footer-copy">© Universidad de Lima</p>
      </div>
    </footer>
  )
}

export default Footer
