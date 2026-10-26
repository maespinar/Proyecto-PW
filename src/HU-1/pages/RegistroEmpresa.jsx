import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PresentacionRegistroEmpresa from '../components/PresentacionRegistroEmpresa'
import FormularioRegistroEmpresa from '../components/FormularioRegistroEmpresa'
import ExitoRegistro from '../components/ExitoRegistro'
import NotificacionResultado from '../components/NotificacionResultado'
import { registrarEmpresa } from '../services/registroService'
import '../styles/Registro.css'
import '../styles/EstadosRegistro.css'
import '../styles/RegistroEmpresa.css'

export default function RegistroEmpresa() {
  const [empresa, setEmpresa] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [notificacion, setNotificacion] = useState(null)
  const solicitud = useRef(null)

  useEffect(() => () => solicitud.current?.abort(), [])

  async function registrar(datos) {
    if (solicitud.current) return
    const controlador = new AbortController()
    solicitud.current = controlador
    setEnviando(true)
    setNotificacion(null)
    try {
      const resultado = await registrarEmpresa(datos, controlador.signal)
      if (controlador.signal.aborted) return
      setEmpresa(resultado)
      setNotificacion({ tipo: 'exito', titulo: 'Registro simulado completado', detalle: 'Los datos pasaron las validaciones locales. No se creó una cuenta real.' })
    } catch {
      if (!controlador.signal.aborted) setNotificacion({ tipo: 'error', titulo: 'No se pudo completar el registro', detalle: 'Revisa tu conexión e inténtalo otra vez. Conservamos los datos en el formulario.' })
    } finally {
      solicitud.current = null
      if (!controlador.signal.aborted) setEnviando(false)
    }
  }

  return (
    <section className="registro registro-empresa-pagina" aria-labelledby="registro-empresa-titulo">
      <PresentacionRegistroEmpresa />
      <div className="registro-contenido">
        {empresa
          ? <ExitoRegistro tituloExito="Solicitud de empresa recibida · simulación">
              <p>Completaste el registro de demostración de <strong>{empresa.razonSocial}</strong>, con el correo <strong>{empresa.correo}</strong>.</p>
              <p>En la versión final, la revisión del RUC y del correo de contacto tomará hasta 2 días hábiles antes de habilitar la publicación de convocatorias.</p>
              <Link className="registro-crear" to="/">Volver al inicio</Link>
              <p className="registro-demo">No se creó una cuenta, no se envió ningún correo y no se inició sesión. Los datos no se guardan al recargar.</p>
            </ExitoRegistro>
          : <FormularioRegistroEmpresa enviando={enviando} onRegistrar={registrar} />}
        <NotificacionResultado notificacion={notificacion} onCerrar={() => setNotificacion(null)} />
      </div>
    </section>
  )
}
