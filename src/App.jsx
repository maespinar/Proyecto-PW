import { useState } from 'react'
import './App.css'
import Header from './Header'
import LandingPublica from './HU-1/LandingPublica'
import Footer from './Footer'
import HU5 from './HU-5/HU5'

function App() {
  const [historiaActiva, setHistoriaActiva] = useState('HU-5')

  return (
    <>
      <div className="demo-hu-selector">
        <span className="demo-selector-label">Proyecto PrácticaLima · Historias:</span>
        <button
          type="button"
          className={`btn-demo-hu ${historiaActiva === 'HU-1' ? 'active' : ''}`}
          onClick={() => setHistoriaActiva('HU-1')}
        >
          HU-1 (Landing Pública)
        </button>
        <button
          type="button"
          className={`btn-demo-hu ${historiaActiva === 'HU-5' ? 'active' : ''}`}
          onClick={() => setHistoriaActiva('HU-5')}
        >
          HU-5 (Postulaciones · 5.1 a 5.6)
        </button>
      </div>

      {historiaActiva === 'HU-1' ? (
        <>
          <Header />
          <main>
            <LandingPublica />
          </main>
          <Footer />
        </>
      ) : (
        <HU5 />
      )}
    </>
  )
}

export default App
