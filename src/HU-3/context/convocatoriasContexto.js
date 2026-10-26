import { createContext, useContext } from 'react';

export const ConvocatoriasContext = createContext(null);

export function useConvocatorias() {
  return useContext(ConvocatoriasContext);
}