import PaginaError from '../components/PaginaError'

export default function AccesoDenegado({ usuario }) {
  const esEmpresa = usuario?.rol === 'empresa'
  return (
    <PaginaError
      codigo="403"
      titulo="No tienes acceso a esta sección"
      icono={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="m5.6 5.6 12.8 12.8" />
        </svg>
      }
      descripcion={
        <>
          Esta sección es exclusiva de las cuentas de {esEmpresa ? 'estudiante' : 'empresa'}.
          <br />
          {esEmpresa ? 'Con tu cuenta de empresa puedes gestionar tu perfil y tus convocatorias.' : 'Con tu cuenta de estudiante puedes revisar el catálogo y el estado de tus postulaciones.'}
        </>
      }
      acciones={[
        { destino: esEmpresa ? '/empresa/perfil' : '/postulaciones', texto: esEmpresa ? 'Ir a mi empresa' : 'Ir a mis postulaciones', principal: true },
        { destino: '/convocatorias', texto: 'Volver al catálogo' },
      ]}
    />
  )
}
