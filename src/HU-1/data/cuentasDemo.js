import perfil from '../../HU-2/data/perfil.seed.json'
import empresas from '../../HU-4/data/empresas'

// Identidades ficticias de la entrega frontend, sin contraseñas ni tokens.
export const CUENTAS_DEMO = [
  {
    id: 'estudiante-demo',
    usuario: { ...perfil, rol: 'estudiante' },
  },
  {
    id: 'empresa-demo',
    usuario: {
      ...empresas.find(empresa => empresa.id === 'e01'),
      correo: 'empresa@andesperu.example',
      rol: 'empresa',
    },
  },
]
