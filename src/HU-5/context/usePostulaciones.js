import { useContext } from 'react'
import { PostulacionesContext } from './postulacionesContexto'

export function usePostulaciones() {
  const context = useContext(PostulacionesContext)
  if (!context) {
    throw new Error('usePostulaciones debe utilizarse dentro de un PostulacionesProvider')
  }
  return context
}
