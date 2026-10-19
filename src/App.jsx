import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './HU-1/components/Header'
import LandingPublica from './HU-1/pages/LandingPublica'
import InicioDeSesion from './HU-1/pages/InicioDeSesion'
import RutasPerfil from './HU-2/RutasPerfil'
import Footer from './HU-1/components/Footer'
import EnConstruccion from './HU-2/components/EnConstruccion'

function App() {
  const [sesionIniciada, setSesionIniciada] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <Header sesionIniciada={sesionIniciada} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPublica />} />
          <Route path="/iniciar-sesion" element={<InicioDeSesion onIniciarSesion={() => setSesionIniciada(true)} />} />
          <Route path="/perfil/*" element={<RutasPerfil />} />
          {[
            ['registro', 'Registrarse'],
            ['empresas', 'Empresas'],
            ['publicar', 'Publicar convocatoria'],
            ['preguntas-frecuentes', 'Preguntas frecuentes'],
            ['terminos', 'Términos del servicio'],
            ['privacidad', 'Privacidad de datos'],
          ].map(([ruta, titulo]) => (
            <Route key={ruta} path={ruta} element={<EnConstruccion titulo={titulo} />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
