import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './HU-1/components/Header'
import RutaEstudiante from './HU-1/components/RutaEstudiante'
import AccesoDenegado from './HU-1/pages/AccesoDenegado'
import PaginaNoEncontrada from './HU-1/pages/PaginaNoEncontrada'
import ConfiguracionCuenta from './HU-1/pages/ConfiguracionCuenta'
import LandingPublica from './HU-1/pages/LandingPublica'
import InicioDeSesion from './HU-1/pages/InicioDeSesion'
import RecuperarContrasena from './HU-1/pages/RecuperarContrasena'
import RegistroEstudiante from './HU-1/pages/RegistroEstudiante'
import RegistroEmpresa from './HU-1/pages/RegistroEmpresa'
import RutasPerfil from './HU-2/RutasPerfil'
import RutasEmpresa from './HU-3/RutasEmpresa'
import Empresas from './HU-3/pages/Empresas'
import FichaEmpresa from './HU-3/pages/FichaEmpresa'
import Footer from './HU-1/components/Footer'
import EnConstruccion from './HU-2/components/EnConstruccion'
import perfil from './HU-2/data/perfil.seed.json'
import { GuardadasProvider } from './HU-4/context/GuardadasContext'
import Catalogo from './HU-4/pages/Catalogo'
import DetalleConvocatoria from './HU-4/pages/DetalleConvocatoria'
import Guardadas from './HU-4/pages/Guardadas'

function App() {
  const [sesionIniciada, setSesionIniciada] = useState(false)
  const { pathname, hash, search } = useLocation()
  const usuario = sesionIniciada ? perfil : null

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash, search])

  return (
    <GuardadasProvider>
      <Header usuario={usuario} onCerrarSesion={() => setSesionIniciada(false)} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPublica />} />
          <Route path="/iniciar-sesion" element={<InicioDeSesion onIniciarSesion={() => setSesionIniciada(true)} />} />
          <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
          <Route path="/registro" element={new URLSearchParams(search).get('tipo') === 'empresa' ? <RegistroEmpresa /> : <RegistroEstudiante />} />
          <Route element={<RutaEstudiante usuario={usuario} />}>
            <Route path="/empresa/postulantes" element={<AccesoDenegado />} />
            <Route path="/perfil/configuracion/contrasena" element={<ConfiguracionCuenta usuario={usuario} />} />
            <Route path="/perfil/configuracion" element={<Navigate to="/perfil/configuracion/contrasena" replace />} />
            <Route path="/perfil/configuracion/notificaciones" element={<EnConstruccion titulo="Notificaciones" />} />
            <Route path="/postulaciones" element={<EnConstruccion titulo="Mis postulaciones" />} />
          </Route>
          <Route path="/cambiar-contrasena" element={<Navigate to="/perfil/configuracion/contrasena" replace />} />
          <Route path="/perfil/*" element={<RutasPerfil />} />
          <Route path="/empresa/*" element={<RutasEmpresa />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/empresas/:id" element={<FichaEmpresa key={pathname} />} />
          <Route path="/publicar" element={<Navigate to="/empresa/convocatorias/nueva" replace />} />
          <Route path="/convocatorias" element={<Catalogo key={search} usuario={usuario} />} />
          <Route path="/convocatorias/:id" element={<DetalleConvocatoria usuario={usuario} />} />
          <Route path="/guardadas" element={<Guardadas usuario={usuario} />} />
          {[
            ['preguntas-frecuentes', 'Preguntas frecuentes'],
            ['terminos', 'Términos del servicio'],
            ['privacidad', 'Privacidad de datos'],
          ].map(([ruta, titulo]) => (
            <Route key={ruta} path={ruta} element={<EnConstruccion titulo={titulo} />} />
          ))}
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </GuardadasProvider>
  )
}

export default App
