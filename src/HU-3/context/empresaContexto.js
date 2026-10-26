import { createContext, useContext } from 'react';

export const EmpresaContext = createContext(null);

export function useEmpresa() {
  return useContext(EmpresaContext);
}