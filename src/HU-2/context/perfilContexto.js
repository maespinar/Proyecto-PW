import { createContext, useContext } from 'react'

export const PerfilContext = createContext(null)

export function usePerfil() {
  const contexto = useContext(PerfilContext)
  if (!contexto) throw new Error('usePerfil debe usarse dentro de PerfilProvider')
  return contexto
}
