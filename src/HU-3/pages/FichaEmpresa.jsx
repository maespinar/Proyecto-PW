import '../styles/FichaEmpresa.css';
import { useState } from 'react';
import PerfilEmpresa from './PerfilEmpresa';

const convocatorias = [
  {
    id: 1,
    puesto: 'Practicante de Desarrollo de Software',
    dsrcp: 'Ingeniería de Sistemas · Híbrido · Medio tiempo · San Isidro · Publicada 18/08/2026',
    precio: 'S/ 1,850.00',
    cierre: 'Cierra 30/09/2026',
  },
  {
    id: 2,
    puesto: 'Practicante de Mejora de Procesos',
    dsrcp: 'Ingeniería Industrial · Presencial · Tiempo completo · San Isidro · Publicada 12/08/2026',
    precio: 'S/ 1,600.00',
    cierre: 'Cierra 26/09/2026',
  },
  {
    id: 3,
    puesto: 'Practicante de Gestión Humana',
    dsrcp: 'Psicología y Administración · Híbrido · Medio tiempo · San Isidro · Publicada 05/08/2026',
    precio: 'S/ 1,300.00',
    cierre: 'Cierra 20/09/2026',
  },
  {
    id: 4,
    puesto: 'Practicante de Soporte TI',
    dsrcp: 'Ingeniería de Sistemas · Presencial · Medio tiempo · San Isidro · Publicada 02/08/2026',
    precio: 'S/ 1,150.00',
    cierre: 'Cierra 18/09/2026',
  },
];

const descripcionEmpresa =
  'Consultora peruana de transformación digital con 14 años en el mercado. Acompañamos a bancos, retailers y operadores de telecomunicaciones en la mejora de sus procesos y en el desarrollo de sus plataformas internas. Nuestro programa de prácticas dura seis meses y cada practicante trabaja con un mentor asignado.';

export default function FichaEmpresa(){

    const [pestana, setPestana] = useState('vigentes');

    return(
        <div className='fe'>
            <p className='fe-emp'>
                <span>Empresas · </span>
                <span className='fe-actual'>Consultora Andes Perú</span>
            </p>

            <section className='fe-cabecera'>
                <div className='fe-logo'>logotipo</div>

                <div className='fe-datos'>
                    <h1>Consultora Andes Perú</h1>
                    <p className='fe-sub'>Consultoría · De 51 a 200 colaboradores · San Isidro, Lima</p>
                    <a className='fe-web' href='#'>andesperu.com.pe</a>
                </div>

                <div className='fe-nota'>
                    <p className='fe-puntaje'>
                        <span className='fe-num'>4.3</span> / 5.0
                    </p>
                    <p className='fe-estrellas'>★★★★☆</p>
                    <p className='fe-resenas'>28 reseñas de practicantes</p>
                </div>
            </section>

            <div className='fe-pestanas'>
                <button
                type='button'
                className={pestana === 'vigentes' ? 'fe-pestana fe-activa' : 'fe-pestana'}
                onClick={() => setPestana('vigentes')}
                >
                    Convocatorias vigentes (4)
                </button>
                <button
                type='button'
                className={pestana === 'resenas' ? 'fe-pestana fe-activa' : 'fe-pestana'}
                onClick={() => setPestana('resenas')}
                >
                    Reseñas (28)
                </button>
                <button
                type='button'
                className={pestana === 'sobre' ? 'fe-pestana fe-activa' : 'fe-pestana'}
                onClick={() => setPestana('sobre')}
                >
                    Sobre la empresa
                </button>
            </div>

            <div className='fe-cuerpo'>
                <div className='fe-principal'>
                    {pestana == 'vigentes' && (
                        <section className='fe-lista'>
                            {convocatorias.map((conv) => (
                                <article className='fe-conv' key={conv.id}>
                                    <span className='fe-avatar'>AP</span>
                                    <div className='fe-conv-cuerpo'>
                                        <div className='fe-conv-titulo'>
                                            <h3>{conv.puesto}</h3>
                                            <span className='fe-estado'>Vigente</span>
                                        </div>
                                        <p className='fe-conv-empresa'>Consultora Andes Perú · Consultoría</p>
                                        <div className='fe-conv-pie'>
                                            <p className='fe-conv-dsrcp'>{conv.dsrcp}</p>
                                            <p className='fe-conv-oferta'>
                                            <span className='fe-precio'>{conv.precio}</span>
                                            <span className='fe-cierre'>{conv.cierre}</span>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </section>

                    )}

                    {pestana === 'resenas' && <p>Aquí van las reseñas</p>}
                    {pestana === 'sobre' && (
                        <section className='fe-tarjeta'>
                            <h2>Sobre la empresa</h2>
                            <p>{descripcionEmpresa}</p>
                        </section>
                    )}
                </div>
                
                <aisde className='fe-lateral'>
                    <section className='fe-tarjeta'>
                        <h2>Sobre la empresa</h2>
                        <p>Consultora peruana de transformación digital con 14 años en el mercado. El programa de prácticas dura seis meses con un mentor asignado.</p>
                    </section>

                    <section className='fe-tarjeta'>
                        <h2>Aspectos mejor calificados</h2>
                        <div className='fe-aspecto'>
                            <span className='fe-aspecto-nombre'>Aprendizaje</span>
                            <p className='fe-aspecto-nota'>4.6</p>
                        </div>
                        <div className='fe-aspecto'>
                            <span className='fe-aspecto-nombre'>Ambiente</span>
                            <p className='fe-aspecto-nota'>4.4</p>
                        </div>
                        <div className='fe-aspecto'>
                            <span className='fe-aspecto-nombre'>Carga horaria</span>
                            <p className='fe-aspecto-nota'>3.9</p>
                        </div>
                    </section>

                    <section className='fe-tarjeta'>
                        <h3>¿Practicaste aquí?</h3>
                        <p className='fe-ayuda'>Tu reseña ayuda a otros estudiantes a decidir.</p>
                        <button type='button' className='fe-btn-resena'>Escribir una reseña</button>
                    </section>
                </aisde>

            </div>
        </div>
    )
}