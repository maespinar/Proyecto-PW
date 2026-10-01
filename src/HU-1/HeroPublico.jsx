import './HeroPublico.css'

function HeroPublico({ onSearch }) {
  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    onSearch({
      puesto: String(formData.get('puesto') ?? '').trim(),
      carrera: String(formData.get('carrera') ?? ''),
    })

    document.getElementById('convocatorias')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-publico" aria-labelledby="hero-titulo">
      <div className="hero-inner">
        <div className="hero-content">
          <h1 id="hero-titulo">Tu primera práctica empieza aquí</h1>
          <p>
            Convocatorias de prácticas pre-profesionales publicadas por empresas para estudiantes de la Universidad de Lima. Postula con tu perfil y sigue el estado de cada postulación.
          </p>

          <form className="hero-search" onSubmit={handleSubmit} role="search">
            <div className="hero-field">
              <label htmlFor="hero-puesto">PUESTO</label>
              <input
                id="hero-puesto"
                name="puesto"
                type="search"
                placeholder="Ej. «Practicante de Data Analytics»"
              />
            </div>
            <div className="hero-field">
              <label htmlFor="hero-carrera">CARRERA</label>
              <select id="hero-carrera" name="carrera" defaultValue="">
                <option value="">Todas las carreras</option>
                <option value="Ing. de Sistemas">Ingeniería de Sistemas</option>
                <option value="Marketing">Marketing</option>
                <option value="Ing. Industrial">Ingeniería Industrial</option>
              </select>
            </div>
            <button type="submit">Buscar</button>
          </form>

          <ul className="hero-stats" aria-label="Datos de la plataforma">
            <li>128 convocatorias vigentes</li>
            <li>46 empresas publicando</li>
            <li>10 carreras</li>
          </ul>
        </div>

        <div className="hero-image-placeholder" role="img" aria-label="Espacio para una foto de estudiantes en una oficina">
          foto hero · estudiantes en oficina
        </div>
      </div>
    </section>
  )
}

export default HeroPublico
