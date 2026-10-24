export function validarConvocatoria(formulario) {
  const errores = {}

  if (!formulario.titulo.trim()) errores.titulo = 'Ingresa el título del puesto.'

  const subvencion = Number(formulario.subvencion)
  if (!formulario.subvencion || !Number.isFinite(subvencion) || subvencion < 1025 || subvencion > 2500) {
    errores.subvencion = 'Debe estar entre S/ 1,025.00 y S/ 2,500.00'
  }

  if (!formulario.fechaCierre) {
    errores.fechaCierre = 'Ingresa la fecha de cierre.'
  } else if (formulario.fechaPublicacion && formulario.fechaCierre <= formulario.fechaPublicacion) {
    errores.fechaCierre = 'El cierre debe ser posterior a la fecha de publicación.'
  }

  return errores
}
