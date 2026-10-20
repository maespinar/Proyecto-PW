import { useState } from 'react'

function MenuGuardada({ onQuitar }) {
  const [abierto, setAbierto] = useState(false)

  const quitar = () => {
    setAbierto(false)
    onQuitar()
  }

  return (
    <div className="menu-guardada">
      <button
        type="button"
        className={`menu-guardada-boton ${abierto ? 'abierto' : ''}`}
        aria-label="Opciones"
        onClick={() => setAbierto(!abierto)}
      >
        ⋯
      </button>

      {abierto && (
        <>
          <div className="menu-guardada-fondo" onClick={() => setAbierto(false)} />
          <div className="menu-guardada-lista">
            <button type="button" className="peligro" onClick={quitar}>
              Quitar de guardadas
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default MenuGuardada
