import { Link, useLocation } from 'react-router-dom'

export default function MenuPerfil({ className = 'list-group menu-perfil', incluirNotificaciones = false }) {
  const { pathname } = useLocation()

  const opciones = [
    { texto: 'Datos personales', to: '/perfil', activa: pathname === '/perfil' || pathname === '/perfil/editar' },
    { texto: 'Habilidades', to: '/perfil/habilidades', activa: pathname === '/perfil/habilidades' },
    { texto: 'Experiencia', to: '/perfil/experiencia', activa: pathname === '/perfil/experiencia' },
    // La pantalla de contraseña pertenece a HU-1; aquí solo se enlaza.
    { texto: 'Contraseña', to: '/perfil/configuracion/contrasena', activa: pathname === '/perfil/configuracion/contrasena' },
    ...(incluirNotificaciones ? [{ texto: 'Notificaciones', to: '/perfil/configuracion/notificaciones', activa: pathname === '/perfil/configuracion/notificaciones' }] : []),
  ]

  return (
    <nav className={className} aria-label="Secciones del perfil">
      {opciones.map((opcion) => (
        <Link
          key={opcion.to}
          to={opcion.to}
          className={`list-group-item list-group-item-action ${opcion.activa ? 'active' : ''}`}
          aria-current={opcion.activa ? 'page' : undefined}
        >
          {opcion.texto}
        </Link>
      ))}
    </nav>
  )
}
