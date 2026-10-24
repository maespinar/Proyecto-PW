import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePostulaciones } from '../context/usePostulaciones'
import { obtenerPerfil } from '../../HU-2/services/perfilService'
import { calcularCompletitud } from '../../HU-2/utils/completitud'
import { formatearFecha } from '../../HU-4/utils/catalogoUtils'
import { resumirConvocatoria, resumirPerfil, validarMensaje } from '../utils/postulacionesUtils'
import { formatearMoneda } from '../utils/formateadores'
import AvisoPerfilIncompleto from './AvisoPerfilIncompleto'
import DialogoPostulacion from './DialogoPostulacion'
import '../styles/hu5.css'

function ContenidoConfirmacion({ convocatoria, onCerrar }) {
  const navigate = useNavigate()
  const { postular, postulaciones } = usePostulaciones()
  const [perfil, setPerfil] = useState(null)
  const [errorPerfil, setErrorPerfil] = useState('')
  const [intento, setIntento] = useState(0)
  const [mensaje, setMensaje] = useState('')
  const [errorMensaje, setErrorMensaje] = useState('')
  const [errorEnvio, setErrorEnvio] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [aceptaIncompleto, setAceptaIncompleto] = useState(false)
  const solicitud = useRef(null)
  const campoMensaje = useRef(null)

  useEffect(() => {
    let activo = true
    obtenerPerfil().then((datos) => { if (activo) setPerfil(datos) })
      .catch(() => { if (activo) setErrorPerfil('No se pudo cargar tu perfil. Reintenta antes de postular.') })
    return () => { activo = false }
  }, [intento])

  useEffect(() => () => solicitud.current?.abort(), [])

  const empresa = resumirConvocatoria(convocatoria)
  const resumen = perfil ? resumirPerfil(perfil) : null
  const completitud = perfil ? calcularCompletitud(perfil) : null
  const yaPostulo = postulaciones.some((post) => post.convocatoriaId === convocatoria.id)
  const mostrarAviso = completitud && !completitud.completo && !aceptaIncompleto

  const enviar = async (evento) => {
    evento.preventDefault()
    if (solicitud.current || !perfil || yaPostulo) return
    const error = validarMensaje(mensaje)
    setErrorMensaje(error)
    if (error) {
      campoMensaje.current.focus()
      return
    }
    const controlador = new AbortController()
    solicitud.current = controlador
    setEnviando(true)
    setErrorEnvio('')
    try {
      const nueva = await postular({ convocatoriaId: convocatoria.id, mensaje }, controlador.signal)
      onCerrar()
      navigate(`/postulaciones/confirmacion?id=${encodeURIComponent(nueva.id)}`)
    } catch (fallo) {
      if (!controlador.signal.aborted) setErrorEnvio(fallo.message || 'No se pudo completar la simulación. Reintenta.')
    } finally {
      solicitud.current = null
      if (!controlador.signal.aborted) setEnviando(false)
    }
  }

  return (
    <DialogoPostulacion titulo="Confirmar postulación" idTitulo="hu5-confirmar-titulo" ocupado={enviando} onCerrar={onCerrar}>
      <form onSubmit={enviar}>
        <div className="hu5-modal-body">
          {!perfil && !errorPerfil && <p role="status">Cargando tu perfil…</p>}
          {errorPerfil && <div role="alert"><p>{errorPerfil}</p><button type="button" className="hu5-btn-outline" onClick={() => { setErrorPerfil(''); setIntento((anterior) => anterior + 1) }}>Reintentar</button></div>}
          {mostrarAviso && (
            <AvisoPerfilIncompleto
              porcentaje={completitud.porcentaje}
              rutaCompletar={completitud.rutaSiguiente}
              onCompletar={onCerrar}
              onPostularAsi={() => { setAceptaIncompleto(true); campoMensaje.current?.focus() }}
            />
          )}
          {yaPostulo && <p role="alert">Ya tienes una postulación a esta convocatoria, incluso si está retirada.</p>}
          {errorEnvio && <p className="alert alert-danger" role="alert">{errorEnvio}</p>}
          <div className="hu5-resumen-modal">
            <strong>{convocatoria.puesto}</strong>
            <p>{empresa.empresa} · {convocatoria.modalidad} · {convocatoria.distrito}</p>
            <p>{formatearMoneda(convocatoria.subvencion)} · Cierra {formatearFecha(convocatoria.fechaCierre)}</p>
          </div>
          {resumen && (
            <section className="hu5-resumen-modal" aria-label="Perfil que se registrará">
              <h3>Perfil que se registrará</h3>
              <strong>{resumen.estudiante}</strong>
              <p>{resumen.carrera} · {resumen.ciclo}</p>
              <p>{resumen.habilidadesCount} habilidades · {resumen.experienciasCount} experiencias · {resumen.enlacesCount} enlaces</p>
              {!enviando && <Link to="/perfil" onClick={onCerrar}>Revisar o completar mi perfil</Link>}
            </section>
          )}
          <label htmlFor="hu5-mensaje" className="form-label">Mensaje al reclutador · Opcional</label>
          <textarea
            ref={campoMensaje}
            id="hu5-mensaje"
            className="form-control"
            rows="4"
            value={mensaje}
            maxLength={500}
            disabled={enviando}
            aria-invalid={Boolean(errorMensaje)}
            aria-describedby={errorMensaje ? 'hu5-mensaje-ayuda hu5-mensaje-error' : 'hu5-mensaje-ayuda'}
            onBlur={() => setErrorMensaje(validarMensaje(mensaje))}
            onChange={(evento) => { setMensaje(evento.target.value); setErrorMensaje(validarMensaje(evento.target.value)) }}
            placeholder="Cuenta por qué te interesa el puesto."
          />
          <p id="hu5-mensaje-ayuda" className="hu5-help-note">Máximo 500 caracteres · {mensaje.length} / 500</p>
          {errorMensaje && <p id="hu5-mensaje-error" className="text-danger">{errorMensaje}</p>}
        </div>
        <div className="hu5-modal-footer">
          <button data-foco-inicial type="button" className="hu5-btn-outline" onClick={onCerrar} disabled={enviando}>Cancelar</button>
          <button type="submit" className="hu5-btn-accent" disabled={enviando || !perfil || yaPostulo || mostrarAviso}>
            {enviando ? 'Registrando…' : 'Enviar postulación'}
          </button>
        </div>
        {enviando && <p className="hu5-modal-body" role="status">Registrando tu postulación localmente…</p>}
      </form>
    </DialogoPostulacion>
  )
}

export default function ModalConfirmarPostulacion({ convocatoria, onCerrar }) {
  return convocatoria ? <ContenidoConfirmacion key={convocatoria.id} convocatoria={convocatoria} onCerrar={onCerrar} /> : null
}
