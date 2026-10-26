import { useEffect, useState } from 'react'
import { obtenerPerfilPostulante } from '../services/bandejaService'

export default function usePerfilPostulante(postulante) {
  const [perfil, setPerfil] = useState(null)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

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
