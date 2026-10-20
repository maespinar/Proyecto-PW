import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import convocatorias from '../data/convocatorias'
import empresas from '../data/empresas'
import postulaciones from '../data/postulaciones'
import { estaVigente, normalizar } from '../utils/catalogoUtils'
import { useGuardadas } from '../context/guardadasContexto'
import Notificacion from '../components/Notificacion'
import PanelPostulacion from '../components/PanelPostulacion'
import '../styles/Comun.css'
import '../styles/Detalle.css'

const ORDINALES = ['primer', 'segundo', 'tercer', 'cuarto', 'quinto', 'sexto', 'séptimo', 'octavo', 'noveno', 'décimo']

const MODALIDAD_EN_FEMENINO = { Híbrido: 'híbrida', Presencial: 'presencial', Remoto: 'remota' }

function DetalleConvocatoria({ usuario }) {
  const { id } = useParams()
  const { estaGuardada, guardar, quitar } = useGuardadas()
  const [notificacion, setNotificacion] = useState(null)

  const convocatoria = convocatorias.find((c) => c.id === id && c.estado !== 'borrador')

  if (!convocatoria) {
    return (
      <div className="detalle-no-encontrada">
        <span className="detalle-no-encontrada-codigo">404</span>
        <h1>No encontramos esta página</h1>
        <p>
          La convocatoria pudo ser retirada por la empresa o el enlace ya caducó. Revisa el catálogo para ver las
          convocatorias vigentes de tu carrera.
        </p>
        <div className="detalle-no-encontrada-acciones">
          <Link to="/convocatorias" className="boton boton-primario">
            Ver convocatorias vigentes
          </Link>
          <Link to="/" className="boton boton-neutro">
            Ir al inicio
          </Link>
        </div>
      </div>
    )
  }

  const empresa = empresas.find((e) => e.id === convocatoria.empresaId)
  const vigente = estaVigente(convocatoria)
  const guardada = estaGuardada(id)
  const postulantes = postulaciones.filter((p) => p.convocatoriaId === id && p.estado !== 'retirada').length
  const postulacion = usuario
    ? postulaciones.find((p) => p.convocatoriaId === id && p.estudianteId === usuario.id)
    : undefined
  const carrera = usuario && convocatoria.carreras.includes(usuario.carrera) ? usuario.carrera : convocatoria.carreras[0]
  const misHabilidades = usuario ? usuario.habilidades.map((h) => normalizar(h.nombre)) : []

  const notificar = (nueva) => {
    setNotificacion(nueva)
    setTimeout(() => setNotificacion((actual) => (actual === nueva ? null : actual)), 4000)
  }

  const alternarGuardado = () => {
    if (guardada) {
      quitar(id)
      notificar({ titulo: 'Convocatoria quitada de guardadas' })
    } else {
      guardar(id)
      notificar({ titulo: 'Convocatoria guardada', detalle: 'La encontrarás en la sección Guardadas.' })
    }
  }

  const panel = (
    <PanelPostulacion
      convocatoria={convocatoria}
      vigente={vigente}
      postulantes={postulantes}
      postulacion={postulacion}
      usuario={usuario}
      guardada={guardada}
      onGuardar={alternarGuardado}
    />
  )

  return (
    <div className="detalle-pagina">
      <p className="migas">
        <Link to="/convocatorias">Convocatorias</Link> · {carrera} · <strong>{convocatoria.puesto}</strong>
      </p>

      <div className="detalle">
        <div className="detalle-principal">
          <section className="detalle-tarjeta detalle-cabecera">
            <span className="detalle-logo">{empresa.iniciales}</span>
            <div>
              <h1>{convocatoria.puesto}</h1>
              <p className="detalle-empresa">
                {empresa.nombreComercial} · {empresa.sector} · {convocatoria.distrito}, Lima
              </p>
              <div className="detalle-etiquetas">
                {vigente ? (
                  <span className="etiqueta etiqueta-vigente">Vigente</span>
                ) : (
                  <span className="etiqueta etiqueta-cerrada">Cerrada</span>
                )}
                {convocatoria.carreras.map((c) => (
                  <span key={c} className="etiqueta etiqueta-suave">
                    {c}
                  </span>
                ))}
                <span className="etiqueta etiqueta-suave">{convocatoria.modalidad}</span>
                <span className="etiqueta etiqueta-suave">{convocatoria.jornada}</span>
                <span className="etiqueta etiqueta-suave">
                  {convocatoria.vacantes} {convocatoria.vacantes === 1 ? 'vacante' : 'vacantes'}
                </span>
              </div>
            </div>
          </section>

          <div className="solo-movil">{panel}</div>

          <section className="detalle-tarjeta detalle-contenido">
            <h2>Descripción de la práctica</h2>
            <p>{convocatoria.descripcion}</p>

            <h2>Funciones</h2>
            <ul>
              {convocatoria.funciones.map((funcion) => (
                <li key={funcion}>{funcion}</li>
              ))}
            </ul>

            <h2>Perfil buscado</h2>
            <ul>
              <li>
                Estudiante de {convocatoria.carreras.join(' o ')} a partir del {ORDINALES[convocatoria.cicloMinimo - 1]}{' '}
                ciclo.
              </li>
              <li>
                Disponibilidad de {convocatoria.horasSemanales} horas semanales en modalidad{' '}
                {MODALIDAD_EN_FEMENINO[convocatoria.modalidad]}.
              </li>
            </ul>

            <h2>Habilidades deseadas</h2>
            <div className="detalle-habilidades">
              {convocatoria.habilidades.map((habilidad) => {
                const laTiene = misHabilidades.includes(normalizar(habilidad))
                return (
                  <span key={habilidad} className={`detalle-habilidad ${laTiene ? 'coincide' : ''}`}>
                    {habilidad}
                    {laTiene && ' · tienes esta habilidad'}
                  </span>
                )
              })}
            </div>
          </section>
        </div>

        <aside className="detalle-lateral">
          <div className="solo-escritorio">{panel}</div>

          <section className="detalle-tarjeta detalle-secundaria">
            <h2>Sobre la empresa</h2>
            <p>{empresa.descripcion}</p>
            <Link to={'/empresas/' + empresa.id} className="detalle-enlace">
              Ver ficha de la empresa →
            </Link>
          </section>

          {convocatoria.beneficios && (
            <section className="detalle-tarjeta detalle-secundaria">
              <h2>Beneficios</h2>
              <p>{convocatoria.beneficios}</p>
            </section>
          )}
        </aside>
      </div>

      <Notificacion notificacion={notificacion} onCerrar={() => setNotificacion(null)} />
    </div>
  )
}

export default DetalleConvocatoria
