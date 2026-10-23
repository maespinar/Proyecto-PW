import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './HU-1/components/Header'
import RutaPorRol from './HU-1/components/RutaPorRol'
import PaginaNoEncontrada from './HU-1/pages/PaginaNoEncontrada'
import ConfiguracionCuenta from './HU-1/pages/ConfiguracionCuenta'
import LandingPublica from './HU-1/pages/LandingPublica'
import InicioDeSesion from './HU-1/pages/InicioDeSesion'
import RecuperarContrasena from './HU-1/pages/RecuperarContrasena'
import RegistroEstudiante from './HU-1/pages/RegistroEstudiante'
import RegistroEmpresa from './HU-1/pages/RegistroEmpresa'
import RutasPerfil from './HU-2/RutasPerfil'
import RutasPostulaciones from './HU-5/RutasPostulaciones'
import RutasEmpresa from './HU-3/RutasEmpresa'
import Empresas from './HU-3/pages/Empresas'
import FichaEmpresa from './HU-3/pages/FichaEmpresa'
import Footer from './HU-1/components/Footer'
import EnConstruccion from './HU-2/components/EnConstruccion'
import { useSesion } from './HU-1/context/useSesion'
import { obtenerRutaContrasena } from './HU-1/utils/sesionUtils'
import { GuardadasProvider } from './HU-4/context/GuardadasContext'
import Catalogo from './HU-4/pages/Catalogo'
import DetalleConvocatoria from './HU-4/pages/DetalleConvocatoria'
import Guardadas from './HU-4/pages/Guardadas'

function App() {
  const { usuario, iniciarSesion, cerrarSesion } = useSesion()
  const { pathname, hash, search } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash, search])

  return (
    <GuardadasProvider>
      <Header usuario={usuario} onCerrarSesion={cerrarSesion} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPublica />} />
          <Route path="/iniciar-sesion" element={<InicioDeSesion onIniciarSesion={iniciarSesion} />} />
          <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
          <Route path="/registro" element={new URLSearchParams(search).get('tipo') === 'empresa' ? <RegistroEmpresa /> : <RegistroEstudiante />} />
          <Route element={<RutaPorRol usuario={usuario} rol="estudiante" />}>
            <Route path="/perfil/configuracion/contrasena" element={<ConfiguracionCuenta usuario={usuario} />} />
            <Route path="/perfil/configuracion" element={<Navigate to="/perfil/configuracion/contrasena" replace />} />
            <Route path="/perfil/configuracion/notificaciones" element={<EnConstruccion titulo="Notificaciones" />} />
            <Route path="/perfil/*" element={<RutasPerfil />} />
            <Route path="/postulaciones/*" element={<RutasPostulaciones />} />
            <Route path="/guardadas" element={<Guardadas usuario={usuario} />} />
          </Route>
          <Route element={<RutaPorRol usuario={usuario} />}>
            <Route path="/cambiar-contrasena" element={<Navigate to={obtenerRutaContrasena(usuario)} replace />} />
          </Route>
          <Route element={<RutaPorRol usuario={usuario} rol="empresa" />}>
            <Route path="/empresa/*" element={<RutasEmpresa usuario={usuario} />} />
          </Route>
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/empresas/:id" element={<FichaEmpresa key={pathname} />} />
          <Route path="/publicar" element={<Navigate to="/empresa/convocatorias/nueva" replace />} />
          <Route path="/convocatorias" element={<Catalogo key={search} usuario={usuario} />} />
          <Route path="/convocatorias/:id" element={<DetalleConvocatoria usuario={usuario} />} />
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
