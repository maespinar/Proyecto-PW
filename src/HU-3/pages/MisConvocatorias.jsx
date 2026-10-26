import '../styles/MisConvocatorias.css';
import { useState } from 'react';
import convocatorias from '../data/convocatorias.seed.json';
import { useNavigate } from 'react-router-dom';
import { useConvocatorias } from '../context/convocatoriasContexto';


const filtros = [
  { valor: 'Todas', texto: 'Todas' },
  { valor: 'Vigente', texto: 'Vigentes' },
  { valor: 'Cerrada', texto: 'Cerradas' },
  { valor: 'Borrador', texto: 'Borradores' },
];

export default function MisConvocatorias() {
    const navigate = useNavigate();
    const [filtro, setFiltro] = useState('Todas');
    const [busqueda, setBusqueda] = useState('');

    const { lista, cerrarConvocatoria } = useConvocatorias();
    const [menuAbierto, setMenuAbierto] = useState(null);
    const [aCerrar, setACerrar] = useState(null);
    const [aviso, setAviso] = useState('');

    const contar = (valor) =>
        valor === 'Todas'
            ? lista.length
            : lista.filter((c) => c.estado === valor).length;

    const filtradas = lista.filter((c) => {
        const coincideEstado = filtro === 'Todas' || c.estado === filtro;
        const texto = (c.puesto + ' ' + c.carreras).toLowerCase();
        const coincideBusqueda = texto.includes(busqueda.toLowerCase());
        return coincideEstado && coincideBusqueda;
    });

    const abrirModal = (c) => {
        setACerrar(c);
        setMenuAbierto(null);
    };

    const confirmarCierre = () => {
    cerrarConvocatoria(aCerrar.id);
    setAviso('La convocatoria «' + aCerrar.puesto + '» se cerró correctamente.');
    setACerrar(null);
    };

    const hayFiltros = filtro !== 'Todas' || busqueda.trim() !== '';

    const limpiarTodo = () => {
        setFiltro('Todas');
        setBusqueda('');
    };

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
            <button type='button' className='mc-btn-nueva' onClick={() => navigate('/empresa/convocatorias/nueva')}>+ Nueva convocatoria</button>
        </section>

        
        {lista.length === 0 ? (
            <section className='mc-vacia'>
                <span className='mc-vacia-icono'>▤</span>
                <h2>Aún no publicas convocatorias</h2>
                <p>
                Publica tu primera convocatoria y aparecerá en el catálogo de los
                estudiantes cuya carrera coincida con el perfil buscado.
                </p>
                <button
                type='button'
                className='mc-btn-nueva'
                onClick={() => navigate('/empresa/convocatorias/nueva')}
                >
                Crear mi primera convocatoria
                </button>
            </section>
            ) : (
            <>
                
        <section className='mc-barra'>
            <div className='mc-busqueda-caja'>
                <span className='mc-busqueda-icono'></span>
                <input
                type='search'
                className='mc-busqueda'
                placeholder='Buscar por puesto o carrera'
                valor={busqueda}
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
        
        {hayFiltros && (
            <section className='mc-scs-activos'>
                {filtro !== 'Todas' && (
                <span className='mc-sc'>
                    {filtros.find((f) => f.valor === filtro).texto}
                    <button type='button' onClick={() => setFiltro('Todas')}>✕</button>
                </span>
                )}
                {busqueda.trim() !== '' && (
                <span className='mc-sc'>
                    «{busqueda}»
                    <button type='button' onClick={() => setBusqueda('')}>✕</button>
                </span>
                )}
                <button type='button' className='mc-limpiar' onClick={limpiarTodo}>
                Limpiar todo
                </button>
            </section>
        )}

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
                            <td className='mc-der mc-celda-menu'>
                                <button 
                                    type='button' 
                                    className='mc-menu'
                                    onClick={() => setMenuAbierto(menuAbierto === c.id ? null : c.id)}
                                >⋯</button>
                              {menuAbierto === c.id && (
                                    <div className='mc-desplegable'>
                                    {c.estado === 'Vigente'
                                        ? <button type='button' onClick={() => abrirModal(c)}>Cerrar convocatoria</button>
                                        : <span className='mc-sin-acciones'>Sin acciones disponibles</span>}
                                    </div>
                                )}
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
            <p>Mostrando 1–{filtradas.length} de {filtradas.length} convocatorias</p>
            <div className='mc-paginas'>
                <button type='button' className='mc-pag' disabled>Anterior</button>
                <button type='button' className='mc-pag mc-pag-activa'>1</button>
                <button type='button' className='mc-pag' disabled>Siguiente</button>
            </div>
      </section>
                
            </>
        )}


    {aviso && (
        <div className='mc-aviso'>
            <p>{aviso}</p>
            <button type='button' onClick={() => setAviso('')}>✕</button>
        </div>
        )}

    {aCerrar && (
        <div className='mc-fondo'>
            <div className='mc-modal' role='dialog' aria-modal='true'>
            <h2>¿Cerrar esta convocatoria?</h2>
            <p>
                «{aCerrar.puesto}» tiene <strong>{aCerrar.postulantes} {aCerrar.postulantes === 1 ? 'postulante' : 'postulantes'}</strong>.
                Al cerrarla, los estudiantes ya no podrán postular y la convocatoria saldrá del catálogo.
            </p>
            <p className='mc-modal-alerta'>
                Esta acción no se puede deshacer. Las postulaciones recibidas se conservan en tu bandeja.
            </p>
            <div className='mc-modal-botones'>
                <button type='button' className='mc-btn-mantener' onClick={() => setACerrar(null)}>
                Mantener abierta
                </button>
                <button type='button' className='mc-btn-cerrar' onClick={confirmarCierre}>
                Cerrar convocatoria
                </button>
            </div>
            </div>
        </div>
        )}
        </>
    )
}