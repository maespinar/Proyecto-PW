import FormularioInicioSesion from '../components/FormularioInicioSesion'
import '../styles/InicioDeSesion.css'

export default function InicioDeSesion() {
  return (
    <section className="inicio-sesion" aria-labelledby="inicio-sesion-titulo">
      <div className="inicio-sesion-presentacion">
        <h1 id="inicio-sesion-titulo">Vuelve a tu búsqueda<br />de prácticas</h1>
        <p>Retoma tus postulaciones, tus convocatorias guardadas y tu perfil profesional donde los dejaste.</p>
        <div className="inicio-sesion-ilustracion" role="img" aria-label="Espacio para una ilustración del campus Monterrico">
          ilustración · campus Monterrico
        </div>
      </div>
      <FormularioInicioSesion />
    </section>
  )
}
