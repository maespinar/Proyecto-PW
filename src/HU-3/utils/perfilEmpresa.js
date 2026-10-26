export function validarPerfilEmpresa(datos) {
  if (!datos.razonSocial.trim() || !datos.nombreComercial.trim()) return 'Completa la razón social y el nombre comercial.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) return 'Ingresa un correo de contacto válido.'
  if (datos.sitioWeb.trim() && !enlaceEmpresa(datos.sitioWeb)) return 'Ingresa un sitio web con dirección http o https válida.'
  return ''
}

export function enlaceEmpresa(sitioWeb) {
  try {
    const url = new URL(/^https?:\/\//i.test(sitioWeb) ? sitioWeb : `https://${sitioWeb}`)
    return ['http:', 'https:'].includes(url.protocol) && url.hostname.includes('.') ? url.href : null
  } catch {
    return null
  }
}
