import { Link } from 'react-router-dom'
import { ESTADOS_POSTULACION } from '../data/catalogos'
import { diasParaCierre, formatearFecha, formatearSoles, textoCierre } from '../utils/catalogoUtils'

function PanelPostulacion({
  convocatoria,
  vigente,
  postulantes,
  postulacion,
  usuario,
  guardada,
  onGuardar,
}) {
  let variante = 'disponible'
  if (!usuario) variante = 'visitante'
  if (!vigente) variante = 'cerrada'
  if (postulacion) variante = 'postulado'
  if (usuario?.rol === 'empresa') variante = 'empresa'

  const puedeRetirar = vigente && postulacion && ['recibida', 'en_revision'].includes(postulacion.estado)

  return (
    <section className="detalle-tarjeta detalle-panel">
      <p className="detalle-etiqueta-campo">Subvención mensual</p>
      <p className={`detalle-monto ${variante === 'cerrada' ? 'apagado' : ''}`}>
        {formatearSoles(convocatoria.subvencion)}
      </p>

      {variante === 'disponible' && (
        <>
          <div className="detalle-aviso aviso-naranja">
            <strong>{textoCierre(diasParaCierre(convocatoria))}</strong>
            Postulaciones hasta el {formatearFecha(convocatoria.fechaCierre)}
          </div>
          <button type="button" className="boton boton-acento boton-grande boton-bloque">
            Postular ahora
          </button>
          <button
            type="button"
            className={`boton boton-secundario boton-bloque detalle-guardar ${guardada ? 'guardada' : ''}`}
            onClick={onGuardar}
          >
            <span className="detalle-casilla">{guardada ? '✓' : ''}</span>
            {guardada ? 'Convocatoria guardada' : 'Guardar convocatoria'}
          </button>
        </>
      )}

      {variante === 'visitante' && (
        <>
          <div className="detalle-aviso aviso-azul">
            <span>
              <strong>i</strong> Necesitas una cuenta de estudiante con correo institucional para postular.
            </span>
          </div>
          <Link to="/iniciar-sesion" className="boton boton-primario boton-grande boton-bloque">
            Iniciar sesión para postular
          </Link>
          <button type="button" className="boton boton-secundario boton-bloque">
            Crear cuenta de estudiante
          </button>
          <p className="detalle-nota">El botón «Guardar» también pide iniciar sesión.</p>
        </>
      )}

      {variante === 'empresa' && (
        <div className="detalle-aviso aviso-azul">
          Las postulaciones y las convocatorias guardadas son exclusivas de estudiantes.
          <Link to="/empresa/convocatorias">Ir a mis convocatorias</Link>
        </div>
      )}

      {variante === 'postulado' && (
        <>
          <div className="detalle-aviso aviso-celeste">
            <strong>Ya postulaste a esta convocatoria</strong>
            Enviada el {formatearFecha(postulacion.fechaPostulacion)} · estado:{' '}
            {ESTADOS_POSTULACION[postulacion.estado].toLowerCase()}
          </div>
          <button type="button" className="boton boton-grande boton-bloque" disabled>
            Ya postulaste
          </button>
          <button type="button" className="boton boton-secundario boton-bloque">
            Ver mi postulación
          </button>
          {puedeRetirar && (
            <button type="button" className="boton boton-peligro boton-bloque">
              Retirar postulación
            </button>
          )}
        </>
      )}

      {variante === 'cerrada' && (
        <>
          <div className="detalle-aviso aviso-gris">
            <strong>Convocatoria cerrada</strong>
            Cerró el {formatearFecha(convocatoria.fechaCierre)} con {postulantes}{' '}
            {postulantes === 1 ? 'postulante' : 'postulantes'}.
          </div>
          <button type="button" className="boton boton-grande boton-bloque" disabled>
            Postulaciones cerradas
          </button>
          <Link to="/convocatorias" className="boton boton-primario boton-bloque">
            Ver convocatorias similares
          </Link>
          <p className="detalle-nota">La convocatoria sigue visible, pero sin acción de postular.</p>
        </>
      )}

      <div className="detalle-datos">
        <p>
          <span>Modalidad</span> {convocatoria.modalidad}
        </p>
        <p>
          <span>Jornada</span> {convocatoria.jornada} · {convocatoria.horasSemanales} h
        </p>
        <p>
          <span>Distrito</span> {convocatoria.distrito}
        </p>
        <p>
          <span>Publicada</span> {formatearFecha(convocatoria.fechaPublicacion)}
        </p>
        <p>
          <span>Postulantes</span> {postulantes}
        </p>
      </div>
    </section>
  )
}

export default PanelPostulacion
