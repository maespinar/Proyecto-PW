import { useState, useEffect } from 'react';
import semilla from '../data/convocatorias.seed.json';
import { ConvocatoriasContext } from './convocatoriasContexto';

const CLAVE = 'hu3_convocatorias';

function leerInicial() {
  try {
    const guardado = localStorage.getItem(CLAVE);
    return guardado ? JSON.parse(guardado) : semilla;
  } catch {
    return semilla;
  }
}

export default function ConvocatoriasProvider({ children }) {
  const [lista, setLista] = useState(leerInicial);

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
  }, [lista]);

  const cerrarConvocatoria = (id) => {
    setLista((actual) =>
      actual.map((c) => (c.id === id ? { ...c, estado: 'Cerrada' } : c))
    );
  };

  const agregarConvocatoria = (nueva) => {
    setLista((actual) => {
      const id = Math.max(0, ...actual.map((c) => c.id)) + 1;
      return [{ ...nueva, id }, ...actual];
    });
  };

  return (
    <ConvocatoriasContext.Provider
      value={{ lista, cerrarConvocatoria, agregarConvocatoria }}
    >
      {children}
    </ConvocatoriasContext.Provider>
  );
}