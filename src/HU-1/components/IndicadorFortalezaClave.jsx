import { obtenerFortalezaClave } from '../utils/validarRegistroEstudiante'

export default function IndicadorFortalezaClave({ valor }) {
  const { nivel, texto } = obtenerFortalezaClave(valor)

  return (
    <div className={`registro-fortaleza registro-fortaleza--${nivel}`}>
      <div className="registro-fortaleza-barras" aria-hidden="true">
        {[1, 2, 3, 4].map(segmento => <span key={segmento} className={segmento <= nivel ? 'registro-fortaleza-activa' : ''} />)}
      </div>
      <p id="registro-clave-fortaleza" role="status">Fortaleza: {texto}</p>
    </div>
  )
}
