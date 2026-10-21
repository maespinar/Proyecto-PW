import { createContext, useContext, useEffect, useState } from 'react'
import guardadasIniciales from '../data/guardadas'
import { fechaDeHoy } from '../utils/catalogoUtils'

const GuardadasContext = createContext(null)

export const GuardadasProvider = ({ children }) => {
  const [guardadas, setGuardadas] = useState(() => {
    try {
      const memoGuardadas = JSON.parse(localStorage.getItem('guardadas'))
      if (memoGuardadas && Array.isArray(memoGuardadas)) {
        return memoGuardadas
      }
    } catch (e) {
      console.error(e)
    }
    return guardadasIniciales
  })

  useEffect(() => {
    localStorage.setItem('guardadas', JSON.stringify(guardadas))
  }, [guardadas])

  const estaGuardada = (convocatoriaId) => guardadas.find((g) => g.convocatoriaId === convocatoriaId) !== undefined

  const guardar = (convocatoriaId) => {
    setGuardadas((prev) => [{ convocatoriaId, fechaGuardado: fechaDeHoy() }, ...prev])
  }

  const quitar = (convocatoriaId) => {
    setGuardadas((prev) => prev.filter((g) => g.convocatoriaId !== convocatoriaId))
  }

  return (
    <GuardadasContext.Provider value={{ guardadas, estaGuardada, guardar, quitar }}>
      {children}
    </GuardadasContext.Provider>
  )
}

export const useGuardadas = () => useContext(GuardadasContext)
