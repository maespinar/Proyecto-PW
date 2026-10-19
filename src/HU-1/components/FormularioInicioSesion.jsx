import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import perfilPrueba from '../../HU-2/data/perfil.seed.json'

export default function FormularioInicioSesion() {
  const navigate = useNavigate()
  const [mostrarClave, setMostrarClave] = useState(false)
  const [error, setError] = useState('')

  function ingresar(evento) {
    evento.preventDefault()
    const datos = new FormData(evento.currentTarget)
    const correo = datos.get('correo').trim().toLowerCase()

    // Acceso temporal al perfil de prueba, sin autenticación ni sesión persistente.
    if (correo !== perfilPrueba.correo || datos.get('clave') !== 'ulima123') {
      setError('El correo o la contraseña son incorrectos.')
      return
    }
    navigate('/perfil')
  }

  return (
    <form className="inicio-sesion-formulario" onSubmit={ingresar} onChange={() => setError('')} aria-labelledby="formulario-sesion-titulo">
      <h2 id="formulario-sesion-titulo">Inicia sesión</h2>
      <p className="inicio-sesion-ayuda">Usa tu correo institucional o el correo de tu empresa.</p>

      <label className="inicio-sesion-etiqueta" htmlFor="sesion-correo">Correo</label>
      <input id="sesion-correo" name="correo" type="email" autoComplete="username" defaultValue={perfilPrueba.correo} required aria-invalid={!!error} aria-describedby={error ? 'sesion-error' : undefined} />

      <label className="inicio-sesion-etiqueta" htmlFor="sesion-clave">Contraseña</label>
      <div className="inicio-sesion-clave">
        <input id="sesion-clave" name="clave" type={mostrarClave ? 'text' : 'password'} autoComplete="current-password" required aria-invalid={!!error} aria-describedby={error ? 'sesion-error' : undefined} />
        <button type="button" onClick={() => setMostrarClave(!mostrarClave)} aria-controls="sesion-clave" aria-pressed={mostrarClave}>
          {mostrarClave ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      <div className="inicio-sesion-opciones">
        <label title="Disponible próximamente"><input type="checkbox" disabled /> Recordarme</label>
        <button type="button" disabled title="Disponible próximamente">¿Olvidaste tu contraseña?</button>
      </div>
      {error && <p id="sesion-error" className="inicio-sesion-error" role="alert">{error}</p>}
      <button type="submit" className="inicio-sesion-ingresar">Ingresar</button>

      <div className="inicio-sesion-registro">
        <p className="inicio-sesion-ayuda">¿Aún no tienes cuenta?</p>
        <div>
          <Link to="/registro?tipo=estudiante">Registrarme como estudiante</Link>
          <Link to="/registro?tipo=empresa">Registrar mi empresa</Link>
        </div>
      </div>
    </form>
  )
}
