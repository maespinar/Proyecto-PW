import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function ExitoRegistro({ correo, reenviando, onReenviar }) {
  const titulo = useRef(null)

  useEffect(() => {
    titulo.current?.parentElement.scrollIntoView({ block: 'nearest' })
    titulo.current?.focus({ preventScroll: true })
  }, [])

  return (
    <section className="registro-cuenta-creada" aria-labelledby="registro-exito-titulo" aria-busy={reenviando}>
      <span className="registro-exito-icono" aria-hidden="true">✓</span>
      <h2 id="registro-exito-titulo" ref={titulo} tabIndex={-1}>Cuenta creada</h2>
      <p>Enviamos un enlace de verificación a <strong>{correo}</strong>. Es válido por 24 horas.</p>
      {reenviando ? <span className="registro-crear registro-enlace-deshabilitado" role="link" aria-disabled="true">Completar mi perfil</span> : <Link className="registro-crear" to="/perfil">Completar mi perfil</Link>}
      <button className="registro-reenviar" type="button" disabled={reenviando} onClick={onReenviar}>
        {reenviando ? 'Reenviando...' : 'Reenviar correo de verificación'}
      </button>
      <p className="registro-demo">Demostración: la creación de cuenta y el envío de correos son simulados.</p>
    </section>
  )
}
