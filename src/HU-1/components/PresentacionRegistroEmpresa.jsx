export default function PresentacionRegistroEmpresa() {
  return (
    <div className="registro-presentacion">
      <h1 id="registro-empresa-titulo">Registra tu empresa</h1>
      <p>Publica convocatorias de prácticas y recibe postulaciones de estudiantes filtradas por carrera y ciclo.</p>
      <aside className="registro-verificacion" aria-labelledby="registro-verificacion-titulo">
        <h2 id="registro-verificacion-titulo">Verificación de la cuenta</h2>
        <p>Antes de habilitar la publicación, se revisarán el RUC y el correo de contacto. El proceso previsto toma hasta 2 días hábiles.</p>
      </aside>
    </div>
  )
}
