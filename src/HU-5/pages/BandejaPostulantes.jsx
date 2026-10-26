import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useBandejaPostulantes from '../hooks/useBandejaPostulantes'
import ResumenBandeja from '../components/ResumenBandeja'
import TablaPostulantes from '../components/TablaPostulantes'
import DialogosBandeja from '../components/DialogosBandeja'
import EstadoCargaPostulaciones from '../components/EstadoCargaPostulaciones'
import { convocatoriasDeEmpresa, ESTADOS_BANDEJA, filtrosDesdeParametros, filtrarPostulantes, POR_PAGINA_BANDEJA } from '../utils/bandejaUtils'
import { formatearFecha } from '../../HU-4/utils/catalogoUtils'
import '../styles/hu5.css'
import '../styles/BandejaPostulantes.css'

function ContenidoBandeja({ empresaId, convocatoriaId, convocatorias }) {
  const navigate = useNavigate()
  const [parametros, setParametros] = useSearchParams()
  const recurso = useBandejaPostulantes(empresaId, convocatoriaId)
  const [seleccion, setSeleccion] = useState({ clave: '', ids: [] })
  const [accion, setAccion] = useState(null)
  const { texto, estado, ciclo, orden } = filtrosDesdeParametros(parametros)
  const clave = JSON.stringify([texto, estado, ciclo, orden])

  const cambiarFiltro = (campo, valor) => {
    setParametros((anteriores) => {
      const nuevos = new URLSearchParams(anteriores)
      if (valor) nuevos.set(campo, valor)
      else nuevos.delete(campo)
      if (campo !== 'pagina') nuevos.delete('pagina')
      return nuevos
    }, { replace: campo === 'q' })
  }

  if (recurso.cargando || recurso.error) return (
    <div className="bp">
      <EstadoCargaPostulaciones cargando={recurso.cargando} error={recurso.error} onReintentar={recurso.reintentar} />
      {recurso.error && <Link to="/empresa/postulantes">Volver a la bandeja de mi empresa</Link>}
    </div>
  )

  const { convocatoria, postulantes } = recurso.datos
  const filtrados = filtrarPostulantes(postulantes, { texto, estado, ciclo, orden })
  const paginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA_BANDEJA))
  const pagina = Math.min(paginas, Math.max(1, parseInt(parametros.get('pagina'), 10) || 1))
  const visibles = filtrados.slice((pagina - 1) * POR_PAGINA_BANDEJA, pagina * POR_PAGINA_BANDEJA)
  const seleccionDisponible = (actual) => actual.clave === clave
    ? actual.ids.filter((id) => filtrados.some((item) => item.id === id && item.estado !== 'retirada')) : []
  const seleccionados = seleccionDisponible(seleccion)

  const seleccionar = (id) => setSeleccion((anterior) => {
    const ids = seleccionDisponible(anterior)
    return { clave, ids: ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id] }
  })

  const seleccionarPagina = (ids, marcada) => setSeleccion((anterior) => {
    const actuales = seleccionDisponible(anterior)
    return { clave, ids: marcada ? [...new Set([...actuales, ...ids])] : actuales.filter((id) => !ids.includes(id)) }
  })

  const abrirAccion = (nueva) => {
    recurso.limpiarError()
    setAccion(nueva)
  }

  const guardar = async (valor) => {
    let guardado = false
    if (accion.tipo === 'estado') guardado = await recurso.cambiarEstados(accion.ids, accion.estado)
    if (accion.tipo === 'nota') guardado = await recurso.guardarNota(accion.postulante.id, valor)
    if (accion.tipo === 'editar') guardado = await recurso.editarConvocatoria(valor)
    if (accion.tipo === 'cerrar') guardado = await recurso.cerrarConvocatoria()
    if (guardado) {
      setAccion(null)
      if (accion.tipo === 'estado') setSeleccion({ clave, ids: [] })
    }
  }

  return (
    <div className="bp">
      <nav className="bp-migas" aria-label="Ruta de navegación">
        <Link to="/empresa/convocatorias">Convocatorias</Link><span aria-hidden="true"> · </span>
        <Link to="/empresa/convocatorias">Mis convocatorias</Link><span aria-hidden="true"> · </span>
        <span aria-current="page">Bandeja de postulantes</span>
      </nav>
      <header className="bp-encabezado">
        <div>
          <h1>{convocatoria.puesto}</h1>
          <p>Publicada el {formatearFecha(convocatoria.fechaPublicacion)} · cierre el {formatearFecha(convocatoria.fechaCierre)} · {convocatoria.vacantes} {convocatoria.vacantes === 1 ? 'vacante' : 'vacantes'} · {convocatoria.carreras.join(', ')}</p>
          <p className="bp-simulacion">Demostración local · Los cambios se guardan en este navegador · {convocatoria.estado === 'cerrada' ? 'Convocatoria cerrada' : 'Convocatoria publicada'}</p>
        </div>
        <div className="bp-acciones">
          <button type="button" onClick={() => abrirAccion({ tipo: 'editar' })}>Editar convocatoria</button>
          <button type="button" className="bp-peligro" disabled={convocatoria.estado === 'cerrada'} onClick={() => abrirAccion({ tipo: 'cerrar' })}>{convocatoria.estado === 'cerrada' ? 'Convocatoria cerrada' : 'Cerrar convocatoria'}</button>
        </div>
      </header>

      {recurso.aviso && <div className="bp-aviso" role="status"><span>{recurso.aviso}</span><button type="button" aria-label="Cerrar aviso" onClick={recurso.cerrarAviso}>×</button></div>}
      <ResumenBandeja postulantes={postulantes} />

      <div className="bp-seleccion" role="group" aria-label="Acciones para postulantes seleccionados">
        <span aria-live="polite">{seleccionados.length} {seleccionados.length === 1 ? 'postulante seleccionado' : 'postulantes seleccionados'}</span>
        <button type="button" className="bp-primario" disabled={!seleccionados.length} onClick={() => abrirAccion({ tipo: 'estado', ids: seleccionados, estado: 'en_revision' })}>Marcar en revisión</button>
        <button type="button" className="bp-aceptar" disabled={!seleccionados.length} onClick={() => abrirAccion({ tipo: 'estado', ids: seleccionados, estado: 'aceptada' })}>Aceptar</button>
        <button type="button" className="bp-peligro" disabled={!seleccionados.length} onClick={() => abrirAccion({ tipo: 'estado', ids: seleccionados, estado: 'descartada' })}>Descartar</button>
        <button type="button" className="bp-quitar" disabled={!seleccionados.length} onClick={() => setSeleccion({ clave, ids: [] })}>Quitar selección</button>
      </div>

      <div className="bp-filtros">
        <label className="bp-buscar"><span className="visually-hidden">Buscar por nombre</span><input type="search" placeholder="Buscar por nombre" value={texto} onChange={(evento) => cambiarFiltro('q', evento.target.value)} /></label>
        <label><span className="visually-hidden">Filtrar por estado</span><select value={estado} onChange={(evento) => cambiarFiltro('estado', evento.target.value)}><option value="">Todos los estados</option>{Object.entries(ESTADOS_BANDEJA).map(([valor, nombre]) => <option key={valor} value={valor}>{nombre}</option>)}</select></label>
        <label><span className="visually-hidden">Filtrar por ciclo</span><select value={ciclo} onChange={(evento) => cambiarFiltro('ciclo', evento.target.value)}><option value="">Ciclo: todos</option>{[6, 7, 8, 9, 10].map((numero) => <option key={numero} value={numero}>{numero}.º ciclo</option>)}</select></label>
        <label><span className="visually-hidden">Convocatoria de la bandeja</span><select value={convocatoriaId} onChange={(evento) => navigate(`/empresa/postulantes/${evento.target.value}`)}>{convocatorias.map((item) => <option key={item.id} value={item.id}>{item.id === convocatoriaId ? convocatoria.puesto : item.puesto}</option>)}</select></label>
        <label className="bp-orden"><span className="visually-hidden">Ordenar postulantes</span><select value={orden} onChange={(evento) => cambiarFiltro('orden', evento.target.value)}><option value="recientes">Más recientes</option><option value="antiguas">Más antiguos</option><option value="nombre">Por nombre</option></select></label>
      </div>
      <div className="bp-resultados">
        <span>{visibles.length} de {filtrados.length} postulantes{filtrados.length !== postulantes.length ? ` · ${postulantes.length} en total` : ''}</span>
        {(texto || estado || ciclo) && <button type="button" onClick={() => setParametros({})}>Limpiar filtros</button>}
      </div>

      <TablaPostulantes postulantes={visibles} seleccionados={seleccionados} onSeleccionar={seleccionar} onSeleccionarPagina={seleccionarPagina} onAccion={abrirAccion} rutaPerfil={(id) => `/empresa/postulantes/${convocatoriaId}/${id}?${parametros}`} />
      <nav className="bp-paginacion" aria-label="Páginas de postulantes">
        <span>Página {pagina} de {paginas}</span>
        <button type="button" disabled={pagina === 1} onClick={() => cambiarFiltro('pagina', String(pagina - 1))}>Anterior</button>
        <button type="button" disabled={pagina === paginas} onClick={() => cambiarFiltro('pagina', String(pagina + 1))}>Siguiente</button>
      </nav>
      {accion && <DialogosBandeja key={accion.tipo + (accion.postulante?.id || '')} accion={accion} convocatoria={convocatoria} ocupado={recurso.ocupado} error={recurso.errorOperacion} onGuardar={guardar} onCerrar={() => setAccion(null)} />}
    </div>
  )
}

export default function BandejaPostulantes({ usuario }) {
  const { convocatoriaId } = useParams()
  const convocatorias = convocatoriasDeEmpresa(usuario.id)
  const id = convocatoriaId || convocatorias[0]?.id
  if (!id) return <div className="bp"><h1>Bandeja de postulantes</h1><p>No tienes convocatorias publicadas.</p><Link to="/empresa/convocatorias">Ver mis convocatorias</Link></div>
  return <ContenidoBandeja key={id} empresaId={usuario.id} convocatoriaId={id} convocatorias={convocatorias} />
}
