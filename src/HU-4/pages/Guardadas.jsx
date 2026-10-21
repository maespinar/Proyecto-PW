import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import convocatorias from '../data/convocatorias'
import { diasParaCierre, estaVigente, formatearFecha } from '../utils/catalogoUtils'
import { useGuardadas } from '../context/GuardadasContext'
import MenuGuardada from '../components/MenuGuardada'
import Notificacion from '../components/Notificacion'
import TarjetaConvocatoria from '../components/TarjetaConvocatoria'
import '../styles/Comun.css'
import '../styles/Guardadas.css'

function Guardadas({ usuario }) {
  const { guardadas, quitar } = useGuardadas()
  const [porQuitar, setPorQuitar] = useState(null)
  const [notificacion, setNotificacion] = useState(null)

  if (!usuario) {
    return <Navigate to="/iniciar-sesion" />
  }

  const lista = []
  guardadas.forEach((guardada) => {
    const convocatoria = convocatorias.find((c) => c.id === guardada.convocatoriaId)
    if (convocatoria) {
      lista.push({ ...convocatoria, fechaGuardado: guardada.fechaGuardado })
    }
  })

  const proximas = lista
    .filter((c) => estaVigente(c) && diasParaCierre(c) <= 7)
    .sort((a, b) => diasParaCierre(a) - diasParaCierre(b))

  let resumen = `${lista.length} ${lista.length === 1 ? 'convocatoria guardada' : 'convocatorias guardadas'}`
  if (proximas.length > 0) {
    resumen = `${resumen} · ${proximas.length} ${proximas.length === 1 ? 'cierra' : 'cierran'} esta semana`
  }

  const notificar = (nueva) => {
    setNotificacion(nueva)
    setTimeout(() => setNotificacion((actual) => (actual === nueva ? null : actual)), 4000)
  }

  const confirmarQuitar = () => {
    quitar(porQuitar.id)
    notificar({ titulo: 'Convocatoria quitada de guardadas', detalle: `«${porQuitar.puesto}»` })
    setPorQuitar(null)
  }

  return (
    <div className="guardadas">
      <p className="migas">
        <Link to="/">Inicio</Link> · <strong>Convocatorias guardadas</strong>
      </p>

      <div className="guardadas-encabezado">
        <h1>Convocatorias guardadas</h1>
        {lista.length > 0 && <p className="guardadas-resumen">{resumen}</p>}
      </div>

      {lista.length === 0 ? (
        <div className="guardadas-vacio">
          <span className="guardadas-vacio-icono">☆</span>
          <h2>No has guardado convocatorias</h2>
          <p>Guarda las que te interesen desde el catálogo y compáralas antes de postular.</p>
          <Link to="/convocatorias" className="boton boton-primario">
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <>
          {proximas.map((c) => (
            <p key={c.id} className="guardadas-aviso">
              <strong>!</strong>«{c.puesto}» cierra el {formatearFecha(c.fechaCierre)}. Postula antes de esa fecha.
            </p>
          ))}

          <ul className="guardadas-lista">
            {lista.map((c) => (
              <li key={c.id}>
                <TarjetaConvocatoria convocatoria={c} mostrarVigente extra={`Guardada el ${formatearFecha(c.fechaGuardado)}`}>
                  <MenuGuardada onQuitar={() => setPorQuitar(c)} />
                </TarjetaConvocatoria>
              </li>
            ))}
          </ul>
        </>
      )}

      {porQuitar && (
        <div className="guardadas-modal-fondo" onClick={() => setPorQuitar(null)}>
          <div className="guardadas-modal" onClick={(e) => e.stopPropagation()}>
            <h2>¿Quitar de guardadas?</h2>
            <p>
              «{porQuitar.puesto}» dejará de aparecer en tu lista. Podrás volver a guardarla desde el detalle de la
              convocatoria.
            </p>
            <div className="guardadas-modal-acciones">
              <button type="button" className="boton boton-neutro" onClick={() => setPorQuitar(null)}>
                Cancelar
              </button>
              <button type="button" className="boton boton-destructivo" onClick={confirmarQuitar}>
                Quitar de guardadas
              </button>
            </div>
          </div>
        </div>
      )}

      <Notificacion notificacion={notificacion} onCerrar={() => setNotificacion(null)} />
    </div>
  )
}

export default Guardadas
