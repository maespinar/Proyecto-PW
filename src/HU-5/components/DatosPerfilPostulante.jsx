import BadgesEstado from './BadgesEstado'
import FotoPerfil from '../../HU-2/components/FotoPerfil'
import { calcularCompletitud } from '../../HU-2/utils/completitud'
import { ordenarExperiencias, textoPeriodo } from '../../HU-2/utils/experiencia'
import { formatearFecha } from '../../HU-4/utils/catalogoUtils'

export function IdentidadPostulante({ perfil, postulante }) {
  const nombre = `${perfil.nombres} ${perfil.apellidos}`
  return (
    <header className="pp-identidad pp-tarjeta">
      <FotoPerfil foto={perfil.foto} nombres={nombre} tamano={64} />
      <div className="pp-datos">
        <h1>{nombre}</h1>
        <p>{perfil.carrera} · {perfil.ciclo} ciclo{perfil.distrito && ` · ${perfil.distrito}`}</p>
        <p className="pp-secundario">{[perfil.correo, perfil.telefono, `postuló el ${formatearFecha(postulante.fechaPostulacion)}`].filter(Boolean).join(' · ')}</p>
      </div>
      <div className="pp-estado">
        <BadgesEstado estado={postulante.estado} />
        <p>Perfil completo al {calcularCompletitud(perfil).porcentaje} %</p>
      </div>
    </header>
  )
}

export function TrayectoriaPostulante({ perfil, mensaje }) {
  const experiencias = ordenarExperiencias(perfil.experiencias || [])
  return (
    <div className="pp-trayectoria">
      <section className="pp-tarjeta" aria-labelledby="pp-mensaje">
        <h2 id="pp-mensaje">Mensaje de la postulación</h2>
        <p className="pp-texto">{mensaje || 'No se adjuntó un mensaje a esta postulación.'}</p>
      </section>
      <section className="pp-tarjeta" aria-labelledby="pp-resumen">
        <h2 id="pp-resumen">Resumen profesional</h2>
        <p className="pp-texto">{perfil.resumen || 'No se ha registrado un resumen profesional.'}</p>
      </section>
      <section className="pp-tarjeta pp-experiencia" aria-labelledby="pp-experiencia">
        <h2 id="pp-experiencia">Experiencia</h2>
        {experiencias.length ? <ul>{experiencias.map((item) => (
          <li key={item.id}>
            <h3>{item.cargo}</h3>
            <p className="pp-secundario">{item.organizacion} · {textoPeriodo(item)}</p>
          </li>
        ))}</ul> : <p className="pp-secundario">No hay experiencias registradas.</p>}
      </section>
    </div>
  )
}

export function HabilidadesPostulante({ habilidades = [] }) {
  return (
    <section className="pp-tarjeta" aria-labelledby="pp-habilidades">
      <h2 id="pp-habilidades" className="pp-etiqueta">Habilidades declaradas</h2>
      {habilidades.length ? <ul className="pp-habilidades">{habilidades.map((item) => <li key={item.id}>{item.nombre}<span className="visually-hidden"> · {item.nivel}</span></li>)}</ul> : <p className="pp-secundario">No hay habilidades registradas.</p>}
    </section>
  )
}
