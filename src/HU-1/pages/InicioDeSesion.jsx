import FormularioInicioSesion from '../components/FormularioInicioSesion'
import campusUlima from '../assets/campusulima.jpeg'
import '../styles/InicioDeSesion.css'

export default function InicioDeSesion({ onIniciarSesion }) {
  return (
    <section className="inicio-sesion" aria-labelledby="inicio-sesion-titulo">
      <div className="inicio-sesion-presentacion">
        <h1 id="inicio-sesion-titulo">Vuelve a tu búsqueda<br />de prácticas</h1>
        <p>Retoma tus postulaciones, tus convocatorias guardadas y tu perfil profesional donde los dejaste.</p>
        <img
          className="inicio-sesion-ilustracion"
          src={campusUlima}
          alt="Campus de la Universidad de Lima"
        />
      </div>
      <FormularioInicioSesion onIniciarSesion={onIniciarSesion} />
    </section>
  )
}
