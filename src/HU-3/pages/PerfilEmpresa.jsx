import '../styles/PerfilEmpresa.css';
import { useNavigate } from 'react-router-dom';

export default function PerfilEmpresa() {
    const navigate = useNavigate();

  return (
    <div>
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
                <h2>Consultora Andes Perú S.A.C.</h2>
                <p>Andes Perú · Consultoria · De 51 a 200 colaboradores</p>
            </div>
            <span className='verificada'>Cuenta verificada</span>
        </section>
        
        <div className='datos'>
            <section className='informacion'>
                <h2>Datos generales</h2>

                <div className='campos'>
                    <div className='campo'>
                        <span className='etiqueta'>RAZÓN SOCIAL</span>
                        <p>Consultora Andes Perú S.A.C.</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>NOMBRE COMERCIAL</span>
                        <p>Andes Perú</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>RUC</span>
                        <p>20548712936</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>SECTOR</span>
                        <p>Consultoría</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>SITIO WEB</span>
                        <p><a href='https://andesperu.com.pe'>andesperu.com.pe</a></p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>TAMAÑO</span>
                        <p>De 51 a 200 colaboradores</p>
                    </div>
                </div>

                <hr />

                <div className='descripcion'>
                    <span className='etiqueta'>DESCRIPCIÓN</span>
                    <p>Consultora peruana de transformación digital con 14 años en el mercado. Acompañamos a bancos, retailers y operadores de telecomunicaciones en la mejora de sus procesos y en el desarrollo de sus plataformas internas. Nuestro programa de prácticas dura seis meses y cada practicante trabaja con un mentor asignado.</p>
                </div>
            </section>

            <div className='info-der'>
                <section className='direccion'>
                    <h2>Dirección y contacto</h2>

                    <div className='campo'>
                        <span className='etiqueta'>DIRECCIÓN</span>
                        <p>Av. Canaval y Moreyra 480, piso 9 — San Isidro, Lima</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>CORREO DE CONTACTO</span>
                        <p>seleccion@andesperu.com.pe</p>
                    </div>
                    <div className='campo'>
                        <span className='etiqueta'>TELÉFONO</span>
                        <p>(01) 415 8820</p>
                    </div>
                </section>

                <section className='resumen'>
                    <h2>Resumen de actividad</h2>
                    <div className='actividad'>
                        <span className='concepto'>Convocatorias vigentes</span>
                        <p className='num'>4</p>
                    </div>
                    <div className='actividad'>
                        <span className='concepto'>Postulaciones recibidas </span>
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