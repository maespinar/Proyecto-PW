import { Link, useSearchParams } from 'react-router-dom'
import { usePostulaciones } from '../context/usePostulaciones'
import BadgesEstado from '../components/BadgesEstado'
import EstadoCargaPostulaciones from '../components/EstadoCargaPostulaciones'
import EstadoVacio from '../components/EstadoVacio'
import TarjetaConvocatoria from '../../HU-4/components/TarjetaConvocatoria'
import { obtenerRecomendaciones, rutaSimilares } from '../utils/postulacionesUtils'

export default function ConfirmacionEnvio() {
  const [parametros] = useSearchParams()
  const { postulaciones, cargando, error, reintentar } = usePostulaciones()
  const datos = postulaciones.find((item) => item.id === parametros.get('id'))

  if (cargando || error) return (
    <div className="hu5-pagina-contenedor">
      <EstadoCargaPostulaciones cargando={cargando} error={error} onReintentar={reintentar} />
    </div>
  )

  if (!datos) return (
    <div className="hu5-pagina-contenedor">
      <EstadoVacio
        titulo="No hay una postulación para confirmar"
        descripcion="Abre una convocatoria y completa la simulación de postulación. También puedes consultar tus registros existentes."
        botonTexto="Ir a mis postulaciones"
        botonUrl="/postulaciones"
      />
      <p className="text-center"><Link to="/convocatorias">Explorar convocatorias</Link></p>
    </div>
  )

  const recomendaciones = obtenerRecomendaciones(datos, postulaciones)

  return (
    <div className="hu5-pagina-contenedor">
      <div className="hu5-confirmacion-card">
        <div className="hu5-check-circle" aria-hidden="true">✓</div>
        <h1 className="hu5-confirmacion-titulo">Postulación registrada · simulación</h1>
        <p className="hu5-confirmacion-desc" role="status">
          Tu postulación para «{datos.puesto}» en <strong>{datos.empresa}</strong> está registrada en este navegador.
          No se envió tu perfil a la empresa ni se generaron correos.
        </p>
        <div className="hu5-confirmacion-snippet">
          <div>
            <div className="titulo">{datos.puesto}</div>
            <div className="fecha">Registrada el {datos.fechaPostulacion}</div>
          </div>
          <BadgesEstado estado={datos.estado} />
        </div>
        <div className="hu5-confirmacion-botones">
          <Link to={`/postulaciones/${datos.id}`} className="hu5-btn-primary">Ver mi postulación</Link>
          <Link to="/postulaciones" className="hu5-btn-outline">Ir a mis postulaciones</Link>
          <Link to={rutaSimilares(datos)} className="hu5-btn-outline">Seguir buscando</Link>
        </div>
      </div>
      {recomendaciones.length > 0 && (
        <section className="hu5-recomendaciones-seccion" aria-labelledby="hu5-recomendaciones-titulo">
          <h2 id="hu5-recomendaciones-titulo" className="hu5-recomendaciones-titulo">Otras convocatorias de tu carrera</h2>
          <div className="hu5-recomendaciones-lista">
            {recomendaciones.map((convocatoria) => <TarjetaConvocatoria key={convocatoria.id} convocatoria={convocatoria} mostrarVigente />)}
          </div>
        </section>
      )}
    </div>
  )
}