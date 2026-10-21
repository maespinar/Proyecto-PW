import PaginaError from '../components/PaginaError'

export default function PaginaNoEncontrada() {
  return (
    <PaginaError
      codigo="404"
      titulo="No encontramos esta página"
      descripcion={
        <>
          La convocatoria pudo ser retirada por la empresa o el enlace ya caducó.
          <br />
          Revisa el catálogo para ver las convocatorias vigentes de tu carrera.
        </>
      }
      acciones={[
        { destino: '/convocatorias', texto: 'Ver convocatorias vigentes', principal: true },
        { destino: '/', texto: 'Ir al inicio' },
      ]}
    />
  )
}
