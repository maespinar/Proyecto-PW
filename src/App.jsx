import { Route, Routes } from 'react-router-dom'
import Header from './HU-1/components/Header'
import LandingPublica from './HU-1/pages/LandingPublica'
import RutasPerfil from './HU-2/RutasPerfil'
import RutasPostulaciones from './HU-5/RutasPostulaciones'
import Footer from './HU-1/components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPublica />} />
          <Route path="/perfil/*" element={<RutasPerfil />} />
          <Route path="/postulaciones/*" element={<RutasPostulaciones />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
