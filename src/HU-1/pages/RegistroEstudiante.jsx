import PresentacionRegistro from '../components/PresentacionRegistro'
import FormularioRegistroEstudiante from '../components/FormularioRegistroEstudiante'
import '../styles/RegistroEstudiante.css'

export default function RegistroEstudiante() {
  return (
    <section className="registro-estudiante" aria-labelledby="registro-estudiante-titulo">
      <PresentacionRegistro />
      <FormularioRegistroEstudiante />
    </section>
  )
}
