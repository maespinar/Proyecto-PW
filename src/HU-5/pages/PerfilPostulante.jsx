import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useBandejaPostulantes from '../hooks/useBandejaPostulantes'
import usePerfilPostulante from '../hooks/usePerfilPostulante'
import EstadoCargaPostulaciones from '../components/EstadoCargaPostulaciones'
import { HabilidadesPostulante, IdentidadPostulante, TrayectoriaPostulante } from '../components/DatosPerfilPostulante'
import NotaInternaPostulante from '../components/NotaInternaPostulante'
import DialogosBandeja from '../components/DialogosBandeja'
import DialogoPostulacion from '../components/DialogoPostulacion'
import { filtrosDesdeParametros, filtrarPostulantes, POR_PAGINA_BANDEJA } from '../utils/bandejaUtils'
import '../styles/hu5.css'
import '../styles/PerfilPostulante.css'

function DetalleCargado({ recurso, inicial, convocatoriaId, parametros }) {
  const navigate = useNavigate()
  const [postulanteInicial] = useState(inicial)
  const { perfil, error, reintentar } = usePerfilPostulante(postulanteInicial)
  const [secuencia] = useState(() => {
    const filtrados = filtrarPostulantes(recurso.datos.postulantes, filtrosDesdeParametros(parametros))
    return (filtrados.some((item) => item.id === inicial.id) ? filtrados : filtrarPostulantes(recurso.datos.postulantes, { texto: '', orden: parametros.get('orden') })).map((item) => item.id)
  })
  const [accion, setAccion] = useState(null)
  const [hayCambios, setHayCambios] = useState(false)
  const [destinoPendiente, setDestinoPendiente] = useState('')
  const titulo = useRef(null)
  const postulante = recurso.datos.postulantes.find((item) => item.id === inicial.id)
  const indice = secuencia.indexOf(postulante.id)
  const parametrosVuelta = new URLSearchParams(parametros)
  parametrosVuelta.set('pagina', String(Math.floor(indice / POR_PAGINA_BANDEJA) + 1))
  const vuelta = `/empresa/postulantes/${convocatoriaId}?${parametrosVuelta}`

  useEffect(() => { if (perfil) titulo.current?.focus() }, [perfil])
  useEffect(() => {
    if (!hayCambios) return undefined
    const advertir = (evento) => { evento.preventDefault(); evento.returnValue = '' }
    window.addEventListener('beforeunload', advertir)
    return () => window.removeEventListener('beforeunload', advertir)
  }, [hayCambios])

  const ir = (destino) => {
    if (hayCambios) setDestinoPendiente(destino)
    else navigate(destino)
  }
  const vecino = (posicion) => `/empresa/postulantes/${convocatoriaId}/${secuencia[posicion]}?${parametros}`
  const cambiarEstado = async () => {
    if (await recurso.cambiarEstados([postulante.id], accion.estado)) setAccion(null)
  }

  return (
    <div className="pp">
      <div className="pp-superior">
        <nav aria-label="Ruta de navegación">
          <Link to={vuelta} onClick={(evento) => { if (evento.button === 0 && !evento.ctrlKey && !evento.metaKey && !evento.shiftKey && !evento.altKey) { evento.preventDefault(); if (!recurso.ocupado) ir(vuelta) } }}>Bandeja de postulantes</Link>
          <span aria-hidden="true"> · </span><strong aria-current="page" ref={titulo} tabIndex={-1}>{postulante.nombre}</strong>
        </nav>
        <nav className="pp-navegacion" aria-label="Navegar entre postulantes">
          <span>Postulante {indice + 1} de {secuencia.length}</span>
          <button type="button" className="pp-boton" disabled={indice === 0 || recurso.ocupado} onClick={() => ir(vecino(indice - 1))}>← Anterior</button>
          <button type="button" className="pp-boton" disabled={indice === secuencia.length - 1 || recurso.ocupado} onClick={() => ir(vecino(indice + 1))}>Siguiente →</button>
        </nav>
      </div>
      <EstadoCargaPostulaciones cargando={!perfil && !error} error={error} onReintentar={reintentar} />
      {perfil && <>
        <IdentidadPostulante perfil={perfil} postulante={postulante} />
        {recurso.aviso && <div className="pp-aviso" role="status"><span>{recurso.aviso}</span><button type="button" aria-label="Cerrar aviso" onClick={recurso.cerrarAviso}>×</button></div>}
        {recurso.errorOperacion && !accion && <p className="pp-error" role="alert">{recurso.errorOperacion}</p>}
        <div className="pp-columnas">
          <TrayectoriaPostulante perfil={perfil} mensaje={postulante.mensaje} />
          <aside className="pp-gestion" aria-label="Gestión de la postulación">
            <section className="pp-tarjeta">
              <h2 className="pp-etiqueta">Cambiar estado</h2>
              <div className="pp-estados">
                {[['en_revision', 'Marcar en revisión'], ['aceptada', 'Aceptar postulante'], ['descartada', 'Descartar postulante']].map(([estado, texto]) => (
                  <button key={estado} type="button" className={`pp-boton pp-${estado}`} disabled={recurso.ocupado || postulante.estado === estado || postulante.estado === 'retirada'} onClick={() => { recurso.limpiarError(); setAccion({ tipo: 'estado', ids: [postulante.id], estado }) }}>{texto}</button>
                ))}
              </div>
              <p className="pp-ayuda">{postulante.estado === 'retirada' ? 'El estudiante retiró esta postulación. No se puede cambiar su estado.' : 'Simulación local: el cambio se refleja en la bandeja y no envía correos.'}</p>
            </section>
            <NotaInternaPostulante notaInicial={postulante.nota || ''} ocupado={recurso.ocupado} onGuardar={(nota) => recurso.guardarNota(postulante.id, nota)} onCambiar={setHayCambios} />
            <HabilidadesPostulante habilidades={perfil.habilidades} />
          </aside>
        </div>
      </>}
      {accion && <DialogosBandeja accion={accion} convocatoria={recurso.datos.convocatoria} ocupado={recurso.ocupado} error={recurso.errorOperacion} onGuardar={cambiarEstado} onCerrar={() => setAccion(null)} />}
      {destinoPendiente && <DialogoPostulacion titulo="¿Salir sin guardar la nota?" idTitulo="pp-salir-titulo" onCerrar={() => setDestinoPendiente('')}>
        <div className="hu5-modal-body"><p>Los cambios de la nota se perderán. Puedes volver y guardarlos antes de continuar.</p></div>
        <div className="hu5-modal-footer">
          <button type="button" data-foco-inicial className="hu5-btn-outline" onClick={() => setDestinoPendiente('')}>Seguir editando</button>
          <button type="button" className="hu5-btn-primary hu5-confirmar-retiro" onClick={() => navigate(destinoPendiente)}>Salir sin guardar</button>
        </div>
      </DialogoPostulacion>}
    </div>
  )
}

function CargarDetalle({ empresaId, convocatoriaId, postulanteId }) {
  const recurso = useBandejaPostulantes(empresaId, convocatoriaId)
  const [parametros] = useSearchParams()
  if (recurso.cargando || recurso.error) return <div className="pp"><EstadoCargaPostulaciones cargando={recurso.cargando} error={recurso.error} onReintentar={recurso.reintentar} /><Link to="/empresa/postulantes">Volver a mi bandeja</Link></div>
  const postulante = recurso.datos.postulantes.find((item) => item.id === postulanteId)
  if (!postulante) return <div className="pp"><h1>Postulante no encontrado</h1><p>Esta postulación no está disponible en la convocatoria.</p><Link to={`/empresa/postulantes/${convocatoriaId}`}>Volver a la bandeja</Link></div>
  return <DetalleCargado recurso={recurso} inicial={postulante} convocatoriaId={convocatoriaId} parametros={parametros} />
}

export default function PerfilPostulante({ usuario }) {
  const { convocatoriaId, postulanteId } = useParams()
  return <CargarDetalle key={`${convocatoriaId}/${postulanteId}`} empresaId={usuario.id} convocatoriaId={convocatoriaId} postulanteId={postulanteId} />
}
