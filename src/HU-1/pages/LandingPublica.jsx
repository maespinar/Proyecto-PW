import { useState } from 'react'
import HeroPublico from '../components/HeroPublico'
import ConvocatoriasDestacadas from '../components/ConvocatoriasDestacadas'
import ComoFunciona from '../components/ComoFunciona'
import { convocatorias, pasos } from '../data/landing'
import '../styles/LandingPublica.css'

function LandingPublica() {
  const [filtros, setFiltros] = useState({ puesto: '', carrera: '' })
  const convocatoriasVisibles = convocatorias.filter((convocatoria) => {
    const coincidePuesto = convocatoria.puesto
      .toLocaleLowerCase('es')
      .includes(filtros.puesto.toLocaleLowerCase('es'))
    const coincideCarrera = !filtros.carrera || convocatoria.carrera === filtros.carrera

    return coincidePuesto && coincideCarrera
  })

  return (
    <>
      <HeroPublico onSearch={setFiltros} />
      <section id="convocatorias" aria-labelledby="convocatorias-titulo">
        <div className="head">
          <h2 id="convocatorias-titulo">Convocatorias destacadas</h2>
          <a href="#convocatorias">Ver todas las convocatorias →</a>
        </div>

        <ConvocatoriasDestacadas convocatorias={convocatoriasVisibles} />
        <ComoFunciona pasos={pasos} />

        <div className="publicar">
          <div>
            <h3>¿Buscas practicantes de la Universidad de Lima?</h3>
            <p>Publica tu convocatoria y recibe postulaciones filtradas por carrera y ciclo.</p>
          </div>
          <button type="button">Publicar convocatoria</button>
        </div>
      </section>
    </>
  )
}

export default LandingPublica
