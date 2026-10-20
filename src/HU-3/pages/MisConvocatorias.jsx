import '../styles/MisConvocatorias.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import convocatorias from '../data/convocatorias.seed.json';


const filtros = [
  { valor: 'Todas', texto: 'Todas' },
  { valor: 'Vigente', texto: 'Vigentes' },
  { valor: 'Cerrada', texto: 'Cerradas' },
  { valor: 'Borrador', texto: 'Borradores' },
];

export default function MisConvocatorias() {
    const [filtro, setFiltro] = useState('Todas');
    const [busqueda, setBusqueda] = useState('');

    const contar = (valor) =>
        valor === 'Todas'
        ? convocatorias.length
        : convocatorias.filter((c) => c.estado === valor).length;

    const filtradas = convocatorias.filter((c) => {
        const coincideEstado = filtro === 'Todas' || c.estado === filtro;
        const texto = (c.puesto + ' ' + c.carreras).toLowerCase();
        const coincideBusqueda = texto.includes(busqueda.toLowerCase());
        return coincideEstado && coincideBusqueda;
    });

    return (
        <>
        <section className='mc-titulo'>
            <div>
                <p className='mc-t'>
                    <span>Convocatorias · </span>
                     <span className='mc-actual'>Mis convocatorias</span>
                </p>
                <h1>Mis convocatorias</h1>
            </div>
            <Link to='/empresa/convocatorias/nueva' className='mc-btn-nueva'>+ Nueva convocatoria</Link>
        </section>

        <section className='mc-barra'>
            <div className='mc-busqueda-caja'>
                <span className='mc-busqueda-icono'></span>
                <input
                type='search'
                className='mc-busqueda'
                placeholder='Buscar por puesto o carrera'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            <div className='mc-filtros'>
                {filtros.map((f) => (
                    <button
                    key={f.valor}
                    type='button'
                    className={filtro === f.valor ? 'mc-filtro mc-filtro-activo' : 'mc-filtro'}
                    onClick={() => setFiltro(f.valor)}
                    >   
                        {f.texto} · {contar(f.valor)}   
                    </button>
                ))}
            </div>

            <p className='mc-contador'>{filtradas.length} convocatorias · ordenadas por cierre</p>
        </section>

        <section className='mc-tabla-caja'>
            <table className='mc-tabla'>
                <thead>
                    <tr>
                        <th>PUESTO</th>
                        <th>CARRERAS</th>
                        <th>PUBLICACIÓN</th>
                        <th>CIERRE</th>
                        <th className='mc-der'>POSTULANTES</th>
                        <th>ESTADO</th>
                        <th className='mc-der'>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {filtradas.map((c) => ( 
                        <tr key={c.id}>
                            <td className='mc-puesto'>{c.puesto}</td>
                            <td className='mc-gris'>{c.carreras}</td>
                            <td>{c.publicacion}</td>
                            <td>{c.cierre}</td>
                            <td className='mc-der mc-num'>{c.postulantes}</td>
                            <td>
                                <span className={'mc-estado mc-' + c.estado.toLowerCase()}>{c.estado}</span>    
                            </td>
                            <td className='mc-der'>
                                <button type='button' className='mc-menu'>⋯</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {filtradas.length === 0 && (
                <p className='mc-vacio'>Ninguna convocatoria coincide con tu búsqueda.</p>
            )}
        </section>

        <section className='mc-pie'>
            <p>Mostrando {filtradas.length === 0 ? 0 : 1}–{filtradas.length} de {filtradas.length} convocatorias</p>
            <div className='mc-paginas'>
                <button type='button' className='mc-pag' disabled>Anterior</button>
                <button type='button' className='mc-pag mc-pag-activa'>1</button>
                <button type='button' className='mc-pag' disabled>Siguiente</button>
            </div>
      </section>
        </>
    )
}