import { useEffect, useRef, useState } from 'react'
import PresentacionRegistro from '../components/PresentacionRegistro'
import FormularioRegistroEstudiante from '../components/FormularioRegistroEstudiante'
import ExitoRegistro from '../components/ExitoRegistro'
import NotificacionResultado from '../components/NotificacionResultado'
import { registrarEstudiante, reenviarVerificacion } from '../services/registroService'
import '../styles/Registro.css'
import '../styles/EstadosRegistro.css'

export default function RegistroEstudiante() {
  const [cuenta, setCuenta] = useState(null)
  const [operacion, setOperacion] = useState(null)
  const [notificacion, setNotificacion] = useState(null)
  const solicitud = useRef(null)

  useEffect(() => () => solicitud.current?.abort(), [])

  async function ejecutar(tipo, datos) {
    if (solicitud.current) return
    const controlador = new AbortController()
    solicitud.current = controlador
    setOperacion(tipo)
    setNotificacion(null)
    try {
      if (tipo === 'registro') {
        const resultado = await registrarEstudiante(datos, controlador.signal)
        if (controlador.signal.aborted) return
        setCuenta(resultado)
      } else {
        await reenviarVerificacion(cuenta.correo, controlador.signal)
      }
      if (controlador.signal.aborted) return
      setNotificacion({
        tipo: 'exito',
        titulo: 'Cambios guardados',
        detalle: tipo === 'registro' ? 'Tu cuenta de estudiante se creó correctamente.' : 'Reenviamos el enlace de verificación. Es válido por 24 horas.',
      })
    } catch {
      if (!controlador.signal.aborted) setNotificacion({
        tipo: 'error',
        titulo: 'No se pudo guardar',
        detalle: 'Revisa tu conexión e inténtalo otra vez.',
      })
    } finally {
      solicitud.current = null
      if (!controlador.signal.aborted) setOperacion(null)
    }
  }

  return (
    <section className="registro registro-estudiante" aria-labelledby="registro-estudiante-titulo">
      <PresentacionRegistro />
      <div className="registro-contenido">
        {cuenta
          ? <ExitoRegistro correo={cuenta.correo} reenviando={operacion === 'reenvio'} onReenviar={() => ejecutar('reenvio')} />
          : <FormularioRegistroEstudiante enviando={operacion === 'registro'} onRegistrar={datos => ejecutar('registro', datos)} />}
        <NotificacionResultado notificacion={notificacion} onCerrar={() => setNotificacion(null)} />
      </div>
    </section>
  )
}
