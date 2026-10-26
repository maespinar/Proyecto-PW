import { useState } from 'react';
import { empresaInicial, leerEmpresa, guardarEmpresa as persistirEmpresa } from '../services/persistenciaService';
import { EmpresaContext } from './empresaContexto';

function leerInicial() {
  try {
    return { datos: leerEmpresa(), error: '' };
  } catch (error) {
    return { datos: empresaInicial, error: error.message };
  }
}

export default function EmpresaProvider({ children }) {
  const [estado, setEstado] = useState(leerInicial);
  const empresa = estado.datos;

  const guardarEmpresa = (datos) => {
    const nueva = { ...empresa, ...datos };
    persistirEmpresa(nueva);
    setEstado({ datos: nueva, error: '' });
  };

  return (
    <EmpresaContext.Provider value={{ empresa, guardarEmpresa, error: estado.error, reintentar: () => setEstado(leerInicial()) }}>
      {children}
    </EmpresaContext.Provider>
  );
}
