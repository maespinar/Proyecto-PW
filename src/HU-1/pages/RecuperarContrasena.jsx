import { useEffect, useRef, useState } from 'react'
import FormularioRecuperacion from '../components/FormularioRecuperacion'
import ConfirmacionRecuperacion from '../components/ConfirmacionRecuperacion'
import FormularioNuevaClave from '../components/FormularioNuevaClave'
import '../styles/Registro.css'
import '../styles/EstadosRegistro.css'
import '../styles/RecuperarContrasena.css'

export default function RecuperarContrasena() {
  const [paso, setPaso] = useState(1)
  const [correo, setCorreo] = useState('')
  const contenido = useRef(null)

  useEffect(() => {
    if (paso > 1) contenido.current?.querySelector('h1')?.focus({ preventScroll: true })
    if (paso !== 2) return
    const temporizador = setTimeout(() => setPaso(3), 10_000)
    return () => clearTimeout(temporizador)
  }, [paso])

  function confirmarSolicitud(correoSolicitado) {
    setCorreo(correoSolicitado)
    setPaso(2)
  }

  return (
    <section className="recuperacion" aria-labelledby="recuperacion-titulo">
      <div className="recuperacion-contenido" ref={contenido}>
        <div className="recuperacion-progreso" role="progressbar" aria-label="Recuperación de contraseña" aria-valuemin={1} aria-valuemax={3} aria-valuenow={paso} aria-valuetext={`Paso ${paso} de 3`}>
          {[1, 2, 3].map(numero => <span key={numero} className={`recuperacion-tramo${numero <= paso ? ' recuperacion-tramo--activo' : ''}`} />)}
          <span className="recuperacion-paso">Paso {paso} de 3</span>
        </div>
        {paso === 1 && <FormularioRecuperacion onSolicitar={confirmarSolicitud} />}
        {paso === 2 && <ConfirmacionRecuperacion correo={correo} />}
        {paso === 3 && <FormularioNuevaClave />}
      </div>
    </section>
  )
}
