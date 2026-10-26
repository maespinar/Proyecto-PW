import { useNavigate } from 'react-router-dom';
import { useEmpresa } from '../context/empresaContexto';
import { useConvocatorias } from '../context/convocatoriasContexto';
import { enlaceEmpresa } from '../utils/perfilEmpresa';
import '../styles/PerfilEmpresa.css';

export default function PerfilEmpresa() {
  const navigate = useNavigate();
  const { empresa, error, reintentar } = useEmpresa();
  const { lista } = useConvocatorias();

  return (
    <div>
        {error && <p role='alert'>{error} <button type='button' onClick={reintentar}>Reintentar</button></p>}
        <section className='perfil'>
            <div className='pEmp'>
                <p>
                    <span>Empresa · </span>
                    <span className='actual'>Perfil de la empresa</span>
                </p>
                <h1>Perfil de la empresa</h1>
            </div>
            <div className='botones'>
                <button className='bt1' onClick={() => navigate('/empresas/andes-peru')}>Ver ficha pública</button>
                <button className='bt2' onClick={() => navigate('/empresa/perfil/editar')}>Editar perfil</button>
            </div>
        </section>

        <section className='cuentaV'>
            <span className='logotipo'>logotipo</span>
            <div className='emp'>
                <h2>{empresa.razonSocial}</h2>
                <p>{empresa.nombreComercial} · {empresa.sector} · {empresa.tamano}</p>
            </div>
            <span className='verificada'>Cuenta verificada</span>
        </section>

        <div className='datos'>
            <section className='informacion'>
                <h2>Datos generales</h2>

                <div className='campos'>
                    <div className='campo'>
                        <span className='etiqueta'>RAZÓN SOCIAL</span>
                        <p>{empresa.razonSocial}</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>NOMBRE COMERCIAL</span>
                        <p>{empresa.nombreComercial}</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>RUC</span>
                        <p>{empresa.ruc}</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>SECTOR</span>
                        <p>{empresa.sector}</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>SITIO WEB</span>
                        <p>{enlaceEmpresa(empresa.sitioWeb) ? <a href={enlaceEmpresa(empresa.sitioWeb)}>{empresa.sitioWeb}</a> : empresa.sitioWeb || 'Sin sitio web'}</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>TAMAÑO</span>
                        <p>{empresa.tamano}</p>
                    </div>
                </div>

                <hr />

                <div className='descripcion'>
                    <span className='etiqueta'>DESCRIPCIÓN</span>
                    <p>{empresa.descripcion}</p>
                </div>
            </section>

            <div className='info-der'>
                <section className='direccion'>
                    <h2>Dirección y contacto</h2>

                    <div className='campo'>
                        <span className='etiqueta'>DIRECCIÓN</span>
                        <p>{empresa.direccion} — {empresa.distrito}, Lima</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>CORREO DE CONTACTO</span>
                        <p>{empresa.correo}</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>TELÉFONO</span>
                        <p>{empresa.telefono}</p>
                    </div>
                </section>

                <section className='resumen'>
                    <h2>Resumen de actividad</h2>
                    <div className='actividad'>
                        <span className='concepto'>Convocatorias vigentes</span>
                        <p className='num'>{lista.filter(convocatoria => convocatoria.estado === 'Vigente').length}</p>
                    </div>
                    <div className='actividad'>
                        <span className='concepto'>Postulaciones recibidas</span>
                        <p className='num'>86</p>
                    </div>
                    <div className='actividad'>
                        <span className='concepto'>Calificación promedio</span>
                        <p className='num'>4.3 / 5.0</p>
                    </div>
                </section>
            </div>
        </div>
    </div>
  );
}
