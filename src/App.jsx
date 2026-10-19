import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Header'
import LandingPublica from './HU-1/LandingPublica'
import RutasPerfil from './HU-2/RutasPerfil'
import Footer from './Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPublica />} />
          <Route path="/perfil/*" element={<RutasPerfil />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
