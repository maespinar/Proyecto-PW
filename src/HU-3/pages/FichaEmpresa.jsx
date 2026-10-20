import '../styles/FichaEmpresa.css';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import empresas from '../../HU-4/data/empresas';
import convocatorias from '../../HU-4/data/convocatorias';
import TarjetaConvocatoria from '../../HU-4/components/TarjetaConvocatoria';
import { estaVigente } from '../../HU-4/utils/catalogoUtils';

export default function FichaEmpresa(){

    const [pestana, setPestana] = useState('vigentes');
    const { id } = useParams();
    const empresa = empresas.find((item) => item.id === (id === 'andes-peru' ? 'e01' : id));

    if (!empresa) {
        return (
            <section className="fe">
                <h1>Empresa no encontrada</h1>
                <p>La empresa que buscas no está disponible.</p>
                <Link to="/empresas">Volver a empresas</Link>
            </section>
        );
    }

    const esAndes = empresa.id === 'e01';
    const vigentes = convocatorias.filter((convocatoria) => convocatoria.empresaId === empresa.id && estaVigente(convocatoria));

    return(
        <div className='fe'>
            <p className='fe-emp'>
                <span>Empresas · </span>
                <span className='fe-actual'>{empresa.nombreComercial}</span>
            </p>

            <section className='fe-cabecera'>
                <div className='fe-logo'>{empresa.iniciales}</div>

                <div className='fe-datos'>
                    <h1>{empresa.nombreComercial}</h1>
                    <p className='fe-sub'>{empresa.sector} · {empresa.tamano} · {empresa.distrito}, Lima</p>
                    {esAndes && <a className='fe-web' href='https://andesperu.com.pe'>andesperu.com.pe</a>}
                </div>

                {esAndes && <div className='fe-nota'>
                    <p className='fe-puntaje'>
                        <span className='fe-num'>4.3</span> / 5.0
                    </p>
                    <p className='fe-estrellas'>★★★★☆</p>
                    <p className='fe-resenas'>28 reseñas de practicantes</p>
                </div>}
            </section>

            <div className='fe-pestanas'>
                <button
                type='button'
                className={pestana === 'vigentes' ? 'fe-pestana fe-activa' : 'fe-pestana'}
                onClick={() => setPestana('vigentes')}
                >
                    Convocatorias vigentes ({vigentes.length})
                </button>
                <button
                type='button'
                className={pestana === 'resenas' ? 'fe-pestana fe-activa' : 'fe-pestana'}
                onClick={() => setPestana('resenas')}
                >
                    Reseñas{esAndes ? ' (28)' : ''}
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
                            {vigentes.map((convocatoria) => (
                                <TarjetaConvocatoria key={convocatoria.id} convocatoria={convocatoria} mostrarVigente />
                            ))}
                            {vigentes.length === 0 && <p>Esta empresa no tiene convocatorias vigentes.</p>}
                        </section>

                    )}

                    {pestana === 'resenas' && <p>Aquí van las reseñas</p>}
                    {pestana === 'sobre' && (
                        <section className='fe-tarjeta'>
                            <h2>Sobre la empresa</h2>
                            <p>{empresa.descripcion}</p>
                        </section>
                    )}
                </div>
                
                <aside className='fe-lateral'>
                    <section className='fe-tarjeta'>
                        <h2>Sobre la empresa</h2>
                        <p>{empresa.descripcion}</p>
                    </section>

                    {esAndes && <section className='fe-tarjeta'>
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
                    </section>}

                    <section className='fe-tarjeta'>
                        <h3>¿Practicaste aquí?</h3>
                        <p className='fe-ayuda'>Tu reseña ayuda a otros estudiantes a decidir.</p>
                        <button type='button' className='fe-btn-resena'>Escribir una reseña</button>
                    </section>
                </aside>

            </div>
        </div>
    )
}