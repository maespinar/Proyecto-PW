import { useEffect, useState } from 'react'
import { obtenerPerfilPostulante } from '../services/bandejaService'

export default function usePerfilPostulante(postulante) {
  // Hook personalizado para obtener el perfil de un postulante y manejar su estado de carga y errores.
  const [perfil, setPerfil] = useState(null)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  // Carga el perfil del postulante cada vez que cambia el postulante
  useEffect(() => {
    const controlador = new AbortController()
    obtenerPerfilPostulante(postulante, controlador.signal)
      .then((datos) => { if (!controlador.signal.aborted) setPerfil(datos) })
      .catch((fallo) => { if (!controlador.signal.aborted) setError(fallo.message) })
    return () => controlador.abort()
  }, [postulante, intento])

  const reintentar = () => {
    setError('')
    setIntento((anterior) => anterior + 1)
  }

  return { perfil, error, reintentar }
}
