import { useState } from 'react';
import { convocatoriasIniciales, leerConvocatorias, guardarConvocatorias } from '../services/persistenciaService';
import { ConvocatoriasContext } from './convocatoriasContexto';

function leerInicial() {
  try {
    return { datos: leerConvocatorias(), error: '' };
  } catch (error) {
    return { datos: convocatoriasIniciales, error: error.message };
  }
}

export default function ConvocatoriasProvider({ children }) {
  const [estado, setEstado] = useState(leerInicial);
  const lista = estado.datos;

  const actualizar = (nueva) => {
    guardarConvocatorias(nueva);
    setEstado({ datos: nueva, error: '' });
  };

  const cerrarConvocatoria = (id) => {
    actualizar(lista.map((c) => (c.id === id ? { ...c, estado: 'Cerrada' } : c)));
  };

  const agregarConvocatoria = (nueva) => {
    const id = Math.max(0, ...lista.map((c) => c.id)) + 1;
    actualizar([{ ...nueva, id }, ...lista]);
  };

  return (
    <ConvocatoriasContext.Provider
      value={{ lista, cerrarConvocatoria, agregarConvocatoria, error: estado.error, reintentar: () => setEstado(leerInicial()) }}
    >
      {children}
    </ConvocatoriasContext.Provider>
  );
}
