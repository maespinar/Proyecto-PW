export function obtenerRutaPrincipal(usuario) {
  return usuario.rol === 'empresa' ? '/empresa/perfil' : '/perfil'
}
