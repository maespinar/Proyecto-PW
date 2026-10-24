import { Link } from 'react-router-dom'

export default function PresentacionRegistro() {
  return (
    <div className="registro-presentacion">
      <h1 id="registro-estudiante-titulo">Crea tu cuenta<br />de estudiante</h1>
      <p>Solo estudiantes con correo institucional de la Universidad de Lima pueden postular a las convocatorias.</p>
      <aside className="registro-pasos" aria-labelledby="registro-pasos-titulo">
        <h2 id="registro-pasos-titulo">Después del registro</h2>
        <ol>
          <li>Verifica tu correo institucional.</li>
          <li>Completa tu perfil profesional.</li>
          <li>Postula a las convocatorias de tu carrera.</li>
        </ol>
      </aside>
      <p className="registro-empresa">¿Representas a una empresa? <Link to="/registro?tipo=empresa">Registra tu empresa</Link></p>
    </div>
  )
}
