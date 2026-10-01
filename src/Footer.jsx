import './Footer.css'

function Footer() {
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
            <li><a href="#convocatorias">Convocatorias</a></li>
            <li><a href="#">Empresas</a></li>
            <li><a href="#">Publicar convocatoria</a></li>
          </ul>
        </nav>

        <nav className="footer-columna" aria-label="Ayuda">
          <h4>AYUDA</h4>
          <ul>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Términos del servicio</a></li>
            <li><a href="#">Privacidad de datos</a></li>
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
