import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/HeaderAutenticado.css'

export default function BuscadorConvocatorias({ destino = '/convocatorias', placeholder = 'Buscar convocatorias', etiqueta = 'Buscar puesto o empresa en convocatorias' }) {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [busqueda, setBusqueda] = useState(() => pathname === destino ? new URLSearchParams(search).get('q') || '' : '')

  function buscar(evento) {
    evento.preventDefault()
    const texto = busqueda.trim()
    navigate(texto ? `${destino}?q=${encodeURIComponent(texto)}` : destino)
  }

  return (
    <form className="header-autenticado-busqueda" role="search" aria-label={etiqueta} onSubmit={buscar}>
      <button type="submit" aria-label={etiqueta}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
      </button>
      <input type="search" aria-label={etiqueta} placeholder={placeholder} value={busqueda} onChange={evento => setBusqueda(evento.target.value)} />
    </form>
  )
}
