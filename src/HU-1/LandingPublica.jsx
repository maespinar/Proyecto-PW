import './LandingPublica.css'

const convocatorias = [
  {
    iniciales: 'AP',
    puesto: 'Practicante de Desarrollo de Software',
    empresa: 'Consultora Andes Perú · Consultoría',
    descripcion: 'Ing. de Sistemas · Híbrido · San Isidro',
    subvencion: 'S/ 1,850.00',
    cierre: '30/09/2026',
  },
  {
    iniciales: 'BM',
    puesto: 'Practicante de Data Analytics',
    empresa: 'Banco Marítimo del Sur · Banca y finanzas',
    descripcion: 'Ing. de Sistemas · Presencial · Miraflores',
    subvencion: 'S/ 2,100.00',
    cierre: '24/09/2026',
  },
  {
    iniciales: 'TR',
    puesto: 'Practicante de Marketing Digital',
    empresa: 'Retail Terravista · Retail',
    descripcion: 'Marketing · Remoto · Surco',
    subvencion: 'S/ 1,400.00',
    cierre: '12/10/2026',
  },
  {
    iniciales: 'MI',
    puesto: 'Practicante de Mejora de Procesos',
    empresa: 'Minera Illariy · Minería',
    descripcion: 'Ing. Industrial · Híbrido · San Borja',
    subvencion: 'S/ 2,300.00',
    cierre: '05/10/2026',
  },
]

const pasos = [
  {
    titulo: 'Crea tu perfil',
    descripcion: 'Carrera, ciclo, habilidades y experiencia en un solo lugar.',
  },
  {
    titulo: 'Postula en un clic',
    descripcion: 'Enviamos tu perfil y un mensaje opcional al reclutador.',
  },
  {
    titulo: 'Sigue el estado',
    descripcion: 'Recibida, en revisión, aceptada o descartada, sin llamadas.',
  },
]

function LandingPublica() {
  return (
    <section id="convocatorias" aria-labelledby="convocatorias-titulo">
      <div className="head">
        <h2 id="convocatorias-titulo">Convocatorias destacadas</h2>
        <a href="#convocatorias">Ver todas las convocatorias →</a>
      </div>

      <div className="convos">
        {convocatorias.map((convocatoria) => (
          <article key={convocatoria.puesto}>
            <span className="avatar" aria-hidden="true">{convocatoria.iniciales}</span>
            <div className="convo-contenido">
              <h3>{convocatoria.puesto}</h3>
              <p className="empresa">{convocatoria.empresa}</p>
              <div className="pie">
                <p className="descripcion">{convocatoria.descripcion}</p>
                <p className="convo-condiciones">
                  <span className="precio">{convocatoria.subvencion}</span>
                  <span className="cierre">Cierra {convocatoria.cierre}</span>
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="pasos" id="como-funciona" aria-label="Cómo funciona">
        {pasos.map((paso, indice) => (
          <article key={paso.titulo}>
            <h3><span className="numero">{indice + 1}</span> {paso.titulo}</h3>
            <p>{paso.descripcion}</p>
          </article>
        ))}
      </div>

      <div className="publicar">
        <div>
          <h3>¿Buscas practicantes de la Universidad de Lima?</h3>
          <p>Publica tu convocatoria y recibe postulaciones filtradas por carrera y ciclo.</p>
        </div>
        <button type="button">Publicar convocatoria</button>
      </div>
    </section>
  )
}

export default LandingPublica
