import { useState, useEffect } from 'react';
import semilla from '../data/empresa.seed.json';
import { EmpresaContext } from './empresaContexto';

const CLAVE = 'hu3_empresa';

function leerInicial() {
  try {
    const guardado = localStorage.getItem(CLAVE);
    return guardado ? JSON.parse(guardado) : semilla;
  } catch {
    return semilla;
  }
}

export default function EmpresaProvider({ children }) {
  const [empresa, setEmpresa] = useState(leerInicial);

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(empresa));
  }, [empresa]);

  const guardarEmpresa = (datos) => {
    setEmpresa((actual) => ({ ...actual, ...datos }));
  };

  return (
    <EmpresaContext.Provider value={{ empresa, guardarEmpresa }}>
      {children}
    </EmpresaContext.Provider>
  );
}