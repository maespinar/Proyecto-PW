export function obtenerRutaPrincipal(usuario) {
  return usuario.rol === 'empresa' ? '/empresa/perfil' : '/perfil'
}

export function obtenerRutaContrasena(usuario) {
  return usuario?.rol === 'empresa' ? '/empresa/cambiar-contrasena' : '/perfil/configuracion/contrasena'
}
