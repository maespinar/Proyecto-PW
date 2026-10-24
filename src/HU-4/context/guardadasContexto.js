import { createContext, useContext } from 'react'

export const GuardadasContext = createContext(null)

export const useGuardadas = () => useContext(GuardadasContext)
