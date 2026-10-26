import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CARRERAS } from '../data/catalogos'
import convocatorias from '../data/convocatorias'
import empresas from '../data/empresas'
import { diasParaCierre, estaVigente, formatearSoles, normalizar } from '../utils/catalogoUtils'
import Paginacion from '../components/Paginacion'
import PanelFiltros from '../components/PanelFiltros'
import TarjetaConvocatoria from '../components/TarjetaConvocatoria'
import '../styles/Comun.css'
import '../styles/Catalogo.css'

const POR_PAGINA = 8

const FILTROS_VACIOS = {
  texto: '',
  carreras: [],
  modalidades: [],
  jornadas: [],
  distritos: [],
  subvencionMin: 0,
  soloVigentes: true,
}

const publicadas = convocatorias.filter((c) => c.estado !== 'borrador')

const filtrar = (lista, filtros) => {
  const texto = normalizar(filtros.texto.trim())

  return lista.filter((c) => {
    const empresa = empresas.find((e) => e.id === c.empresaId)

    if (filtros.soloVigentes && !estaVigente(c)) return false
    if (!normalizar(c.puesto).includes(texto) && !normalizar(empresa.nombreComercial).includes(texto)) return false
    if (filtros.carreras.length > 0 && c.carreras.filter((carrera) => filtros.carreras.includes(carrera)).length === 0) {
      return false
    }
    if (filtros.modalidades.length > 0 && !filtros.modalidades.includes(c.modalidad)) return false
    if (filtros.jornadas.length > 0 && !filtros.jornadas.includes(c.jornada)) return false
    if (filtros.distritos.length > 0 && !filtros.distritos.includes(c.distrito)) return false
    return c.subvencion >= filtros.subvencionMin
  })
}

const ordenar = (lista, orden) => {
  const copia = [...lista]
  if (orden === 'cierre') copia.sort((a, b) => diasParaCierre(a) - diasParaCierre(b))
  if (orden === 'publicacion') copia.sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion))
  if (orden === 'subvencion') copia.sort((a, b) => b.subvencion - a.subvencion)
  return copia
}

function Catalogo({ usuario }) {
  const carreraUsuario = usuario ? usuario.carrera : ''
  const [parametros] = useSearchParams()
  const carreraInicial = CARRERAS.includes(parametros.get('carrera')) ? parametros.get('carrera') : carreraUsuario

  const [cargando, setCargando] = useState(true)
  const [filtros, setFiltros] = useState({ ...FILTROS_VACIOS, texto: parametros.get('q') || '', carreras: carreraInicial ? [carreraInicial] : [] })
  const [orden, setOrden] = useState('cierre')
  const [pagina, setPagina] = useState(1)

  useEffect(() => {
    setTimeout(() => setCargando(false), 400)
  }, [])

  const cambiarFiltro = (clave, valor) => {
    setFiltros((prev) => ({ ...prev, [clave]: valor }))
    setPagina(1)
  }

  const alternarValor = (clave, valor) => {
    const lista = filtros[clave]
    cambiarFiltro(clave, lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor])
  }

  const limpiarFiltros = () => {
    setFiltros(FILTROS_VACIOS)
    setPagina(1)
  }

  const cambiarPagina = (numero) => {
    setPagina(numero)
    window.scrollTo(0, 0)
  }

  const resultados = ordenar(filtrar(publicadas, filtros), orden)
  const visibles = resultados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  const sinFiltroDeCarrera = filtrar(publicadas, { ...filtros, carreras: [] })
  const conteo = {}
  CARRERAS.forEach((carrera) => {
    conteo[carrera] = sinFiltroDeCarrera.filter((c) => c.carreras.includes(carrera)).length
  })

  let subtitulo = 'en todas las carreras'
  if (filtros.carreras.length === 1) subtitulo = `para ${filtros.carreras[0]}`
  if (filtros.carreras.length > 1) subtitulo = `para ${filtros.carreras.length} carreras`

  const chips = []
  if (filtros.texto.trim() !== '') {
    chips.push({ texto: `«${filtros.texto.trim()}»`, quitar: () => cambiarFiltro('texto', '') })
  }
  const listas = ['carreras', 'modalidades', 'jornadas']
  listas.forEach((clave) => {
    filtros[clave].forEach((valor) => {
      chips.push({ texto: valor, quitar: () => alternarValor(clave, valor) })
    })
  })
  if (filtros.distritos.length > 0) {
    chips.push({ texto: filtros.distritos.join(', '), quitar: () => cambiarFiltro('distritos', []) })
  }
  if (filtros.subvencionMin > 0) {
    chips.push({ texto: `Desde ${formatearSoles(filtros.subvencionMin)}`, quitar: () => cambiarFiltro('subvencionMin', 0) })
  }

  return (
    <div className="catalogo">
      <PanelFiltros
        filtros={filtros}
        conteo={conteo}
        carreraUsuario={carreraUsuario}
        onCambiar={cambiarFiltro}
        onAlternar={alternarValor}
        onLimpiar={limpiarFiltros}
      />

      <section className="catalogo-resultados">
        <div className="catalogo-encabezado">
          <div>
            <h1>Convocatorias vigentes</h1>
            {!cargando && (
              <p className="catalogo-total">
                {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'} {subtitulo}
              </p>
            )}
          </div>

          <label className="catalogo-orden">
            Ordenar por
            <select value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="cierre">Cierre más próximo</option>
              <option value="publicacion">Más recientes</option>
              <option value="subvencion">Mayor subvención</option>
            </select>
          </label>
        </div>

        {chips.length > 0 && (
          <div className="catalogo-chips">
            {chips.map((chip) => (
              <button key={chip.texto} type="button" className="catalogo-chip" onClick={chip.quitar}>
                {chip.texto} ×
              </button>
            ))}
            <button type="button" className="boton-enlace" onClick={limpiarFiltros}>
              Limpiar todo
            </button>
          </div>
        )}

        {cargando && (
          <div className="catalogo-esqueletos">
            {[1, 2, 3, 4].map((numero) => (
              <div key={numero} className="esqueleto-tarjeta">
                <div className="esqueleto esqueleto-logo" />
                <div className="esqueleto-lineas">
                  <div className="esqueleto" style={{ width: '60%', height: '12px' }} />
                  <div className="esqueleto" style={{ width: '35%', height: '8px' }} />
                  <div className="esqueleto" style={{ width: '45%', height: '14px' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!cargando && resultados.length === 0 && (
          <div className="catalogo-vacio">
            <span className="catalogo-vacio-icono">?</span>
            <h2>Ninguna convocatoria coincide con tus filtros</h2>
            <p>Prueba con otro término, baja la subvención mínima o agrega más carreras y modalidades.</p>
            <div className="catalogo-vacio-acciones">
              <button type="button" className="boton boton-primario" onClick={limpiarFiltros}>
                Quitar todos los filtros
              </button>
              <button
                type="button"
                className="boton boton-neutro"
                onClick={() => {
                  limpiarFiltros()
                  setOrden('cierre')
                }}
              >
                Ver todas las convocatorias
              </button>
            </div>
          </div>
        )}

        {!cargando && resultados.length > 0 && (
          <>
            <div className="catalogo-grilla">
              {visibles.map((convocatoria) => (
                <TarjetaConvocatoria key={convocatoria.id} convocatoria={convocatoria} />
              ))}
            </div>
            <Paginacion pagina={pagina} total={resultados.length} porPagina={POR_PAGINA} onCambiar={cambiarPagina} />
          </>
        )}
      </section>
    </div>
  )
}

export default Catalogo
