import { useState } from 'react'
import './HU5.css'
import HeaderEstudiante from './components/HeaderEstudiante'
import HeaderEmpresa from './components/HeaderEmpresa'
import SidebarEmpresa from './components/SidebarEmpresa'
import FooterEmpresa from './components/FooterEmpresa'
import Footer from '../Footer'

import ModalPostulacion from './components/ModalPostulacion'
import ConfirmacionPostulacion from './components/ConfirmacionPostulacion'
import MisPostulaciones from './components/MisPostulaciones'
import DetallePostulacion from './components/DetallePostulacion'
import BandejaPostulantes from './components/BandejaPostulantes'
import PerfilPostulante from './components/PerfilPostulante'

import {
  CANDIDATO_PRINCIPAL,
  CONVOCATORIA_PRINCIPAL,
  POSTULACIONES_ESTUDIANTE_INICIALES,
  POSTULANTES_BANDEJA_INICIALES,
} from './data/mockData'

function HU5() {
  // Estado para la pantalla activa de HU-5
  // Valores: '5.1' | '5.2' | '5.3' | '5.4' | '5.5' | '5.6'
  const [pantallaActiva, setPantallaActiva] = useState('5.3')

  // Datos compartidos y reactivos
  const [postulacionesEstudiante, setPostulacionesEstudiante] = useState(
    POSTULACIONES_ESTUDIANTE_INICIALES
  )
  const [postulantesEmpresa, setPostulantesEmpresa] = useState(
    POSTULANTES_BANDEJA_INICIALES
  )

  const [postulacionSeleccionada, setPostulacionSeleccionada] = useState(
    POSTULACIONES_ESTUDIANTE_INICIALES[0]
  )
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState(
    POSTULANTES_BANDEJA_INICIALES[3] // Mariana Quispe Ramírez
  )

  // Enviar nueva postulación desde 5.1 Modal
  const handleEnviarPostulacion = (datos) => {
    const nuevaPostulacion = {
      id: `post-${Date.now()}`,
      iniciales: datos.convocatoria.iniciales || 'AP',
      puesto: datos.convocatoria.puesto,
      empresa: datos.convocatoria.empresa,
      descripcion: `${datos.convocatoria.modalidad} · ${datos.convocatoria.jornada} · ${datos.convocatoria.distrito || 'San Isidro'} · ${datos.convocatoria.subvencion}`,
      subvencion: datos.convocatoria.subvencion,
      modalidad: datos.convocatoria.modalidad,
      jornada: datos.convocatoria.jornada,
      distrito: datos.convocatoria.distrito || 'San Isidro',
      cierre: datos.convocatoria.fechaCierre || '30/09/2026',
      fechaPostulacion: '07/09/2026',
      detalleFecha: 'Postulaste el 07/09/2026 · Sin cambios desde entonces',
      estado: 'Recibida',
      mensaje: datos.mensaje,
      perfilEnviado: 'Ingeniería de Sistemas · Octavo ciclo · 9 habilidades · 3 experiencias',
      timeline: [
        {
          titulo: 'Recibida',
          fecha: '07/09/2026 · 10:24',
          descripcion: 'la empresa recibió tu perfil y tu mensaje.',
          completado: true,
          tipo: 'info',
        },
        {
          titulo: 'En revisión',
          fecha: 'Pendiente',
          descripcion: 'el equipo de selección está evaluando tu perfil.',
          completado: false,
          tipo: 'pending',
        },
      ],
    }

    setPostulacionesEstudiante([nuevaPostulacion, ...postulacionesEstudiante])
    setPostulacionSeleccionada(nuevaPostulacion)
    setPantallaActiva('5.2')
  }

  // Retirar postulación (desde 5.3 o 5.4)
  const handleRetirarPostulacion = (id) => {
    setPostulacionesEstudiante((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: 'Retirada' } : p))
    )
  }

  // Actualizar estado de postulante (desde 5.5 o 5.6)
  const handleUpdateEstadoPostulante = (id, nuevoEstado) => {
    setPostulantesEmpresa((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    )
  }

  // Ver detalle de postulación (desde 5.3 a 5.4)
  const handleVerDetallePostulacion = (post) => {
    setPostulacionSeleccionada(post)
    setPantallaActiva('5.4')
  }

  // Ver perfil de postulante en la empresa (desde 5.5 a 5.6)
  const handleVerPerfilEmpresa = (postulante) => {
    setCandidatoSeleccionado(postulante)
    setPantallaActiva('5.6')
  }

  const esVistaEmpresa = pantallaActiva === '5.5' || pantallaActiva === '5.6'

  return (
    <div className="hu5-wrapper">
      
      {/* Barra de navegación de prueba / presentación de Historia de Usuario 5 */}
      <nav className="hu5-doc-navigation" aria-label="Navegador de pantallas HU-5">
        <div className="hu5-doc-inner">
          <span className="hu5-doc-tag">HU-5 · POSTULACIONES:</span>
          <div className="hu5-doc-tabs">
            <button
              type="button"
              className={`hu5-tab-btn ${pantallaActiva === '5.1' ? 'active' : ''}`}
              onClick={() => setPantallaActiva('5.1')}
            >
              5.1 Modal de postulación
            </button>
            <button
              type="button"
              className={`hu5-tab-btn ${pantallaActiva === '5.2' ? 'active' : ''}`}
              onClick={() => setPantallaActiva('5.2')}
            >
              5.2 Confirmación
            </button>
            <button
              type="button"
              className={`hu5-tab-btn ${pantallaActiva === '5.3' ? 'active' : ''}`}
              onClick={() => setPantallaActiva('5.3')}
            >
              5.3 Mis postulaciones
            </button>
            <button
              type="button"
              className={`hu5-tab-btn ${pantallaActiva === '5.4' ? 'active' : ''}`}
              onClick={() => setPantallaActiva('5.4')}
            >
              5.4 Detalle de postulación
            </button>
            <button
              type="button"
              className={`hu5-tab-btn empresa-tab ${pantallaActiva === '5.5' ? 'active' : ''}`}
              onClick={() => setPantallaActiva('5.5')}
            >
              5.5 Bandeja (Empresa)
            </button>
            <button
              type="button"
              className={`hu5-tab-btn empresa-tab ${pantallaActiva === '5.6' ? 'active' : ''}`}
              onClick={() => setPantallaActiva('5.6')}
            >
              5.6 Perfil postulante (Empresa)
            </button>
          </div>
        </div>
      </nav>

      {/* ROL ESTUDIANTE: Cabecera */}
      {!esVistaEmpresa && (
        <HeaderEstudiante
          activeTab={
            pantallaActiva === '5.3' || pantallaActiva === '5.4'
              ? 'mis-postulaciones'
              : 'convocatorias'
          }
          onNavigate={(pantalla) => setPantallaActiva(pantalla)}
        />
      )}

      {/* ROL EMPRESA: Cabecera */}
      {esVistaEmpresa && <HeaderEmpresa />}

      {/* CUERPO PRINCIPAL SEGÚN LA PANTALLA ACTIVA */}
      <div className={`hu5-main-layout ${esVistaEmpresa ? 'empresa-layout' : ''}`}>
        
        {/* Si es vista de empresa, incluimos la barra lateral fija de 280px */}
        {esVistaEmpresa && (
          <SidebarEmpresa
            activeItem="bandeja"
            onSelect={(item) => {
              if (item === 'bandeja') setPantallaActiva('5.5')
              if (item === 'logout') setPantallaActiva('5.3')
            }}
          />
        )}

        <div className="hu5-content-area">
          
          {/* 5.1: Modal de postulación */}
          {pantallaActiva === '5.1' && (
            <div className="preview-backdrop-51">
              <div className="preview-convo-fondo">
                <h2>Practicante de Desarrollo de Software</h2>
                <p>Consultora Andes Perú · Consultoría · San Isidro, Lima</p>
                <button
                  type="button"
                  className="btn-abrir-modal-51"
                  onClick={() => {}}
                >
                  Postular ahora
                </button>
              </div>

              <ModalPostulacion
                convocatoria={CONVOCATORIA_PRINCIPAL}
                candidato={CANDIDATO_PRINCIPAL}
                isOpen={true}
                onClose={() => setPantallaActiva('5.3')}
                onSubmit={handleEnviarPostulacion}
                onEditProfile={() => setPantallaActiva('5.6')}
              />
            </div>
          )}

          {/* 5.2: Confirmación de postulación */}
          {pantallaActiva === '5.2' && (
            <ConfirmacionPostulacion
              convocatoriaNombre={postulacionSeleccionada?.puesto || 'Practicante de Desarrollo de Software'}
              empresaNombre={postulacionSeleccionada?.empresa || 'Consultora Andes Perú'}
              fechaEnvio="07/09/2026 · 10:24"
              onGoToMisPostulaciones={() => setPantallaActiva('5.3')}
              onSeguirBuscando={() => setPantallaActiva('5.1')}
            />
          )}

          {/* 5.3: Mis postulaciones */}
          {pantallaActiva === '5.3' && (
            <MisPostulaciones
              postulaciones={postulacionesEstudiante}
              onVerDetalle={handleVerDetallePostulacion}
              onVerConvocatorias={() => setPantallaActiva('5.1')}
              onRetirarPostulacion={handleRetirarPostulacion}
            />
          )}

          {/* 5.4: Detalle de postulación */}
          {pantallaActiva === '5.4' && (
            <DetallePostulacion
              postulacion={postulacionSeleccionada}
              onBack={() => setPantallaActiva('5.3')}
              onVerConvocatoria={() => setPantallaActiva('5.1')}
              onRetirarPostulacion={handleRetirarPostulacion}
            />
          )}

          {/* 5.5: Bandeja de postulantes (Empresa) */}
          {pantallaActiva === '5.5' && (
            <BandejaPostulantes
              postulantes={postulantesEmpresa}
              onVerPerfil={handleVerPerfilEmpresa}
              onUpdateEstado={handleUpdateEstadoPostulante}
            />
          )}

          {/* 5.6: Perfil del postulante (Empresa) */}
          {pantallaActiva === '5.6' && (
            <PerfilPostulante
              candidatoInicial={candidatoSeleccionado}
              listaPostulantes={postulantesEmpresa}
              onBackToBandeja={() => setPantallaActiva('5.5')}
              onUpdateEstado={handleUpdateEstadoPostulante}
            />
          )}

        </div>
      </div>

      {/* PIE DE PÁGINA SEGÚN EL ROL */}
      {!esVistaEmpresa ? <Footer /> : <FooterEmpresa />}

    </div>
  )
}

export default HU5
