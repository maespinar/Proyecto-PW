import '../styles/MisConvocatorias.css';
import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useConvocatorias } from '../context/convocatoriasContexto';
import { buscarConvocatoriaPropia } from '../../HU-5/utils/bandejaUtils';


const filtros = [
  { valor: 'Todas', texto: 'Todas' },
  { valor: 'Vigente', texto: 'Vigentes' },
  { valor: 'Cerrada', texto: 'Cerradas' },
  { valor: 'Borrador', texto: 'Borradores' },
];

export default function MisConvocatorias({ usuario }) {
    const { state } = useLocation();
    const [filtro, setFiltro] = useState('Todas');
    const [parametros, setParametros] = useSearchParams();
    const busqueda = parametros.get('q') || '';

    const setBusqueda = (valor) => {
        setParametros((anteriores) => {
            const nuevos = new URLSearchParams(anteriores);
            if (valor.trim()) nuevos.set('q', valor);
            else nuevos.delete('q');
            return nuevos;
        }, { replace: true });
    };

    const { lista, cerrarConvocatoria, error, reintentar } = useConvocatorias();
    const [errorCierre, setErrorCierre] = useState('');
    const [menuAbierto, setMenuAbierto] = useState(null);
    const [aCerrar, setACerrar] = useState(null);
    const [aviso, setAviso] = useState(state?.aviso || '');

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
        setErrorCierre('');
        setACerrar(c);
        setMenuAbierto(null);
    };

    const confirmarCierre = () => {
        try {
            cerrarConvocatoria(aCerrar.id);
            setAviso('La convocatoria «' + aCerrar.puesto + '» se cerró en la demostración local.');
            setACerrar(null);
        } catch (error) {
            setErrorCierre(error.message);
        }
    };

    const hayFiltros = filtro !== 'Todas' || busqueda.trim() !== '';

    const limpiarTodo = () => {
        setFiltro('Todas');
        setBusqueda('');
    };

    return (
        <>
        {error && <p role='alert'>{error} <button type='button' onClick={reintentar}>Reintentar</button></p>}
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


        {lista.length === 0 ? (
            <section className='mc-vacia'>
                <span className='mc-vacia-icono'>▤</span>
                <h2>Aún no publicas convocatorias</h2>
                <p>
                Publica tu primera convocatoria y aparecerá en el catálogo de los
                estudiantes cuya carrera coincida con el perfil buscado.
                </p>
                <Link
                to='/empresa/convocatorias/nueva'
                className='mc-btn-nueva'
                >
                Crear mi primera convocatoria
                </Link>
            </section>
            ) : (
            <>

        <section className='mc-barra'>
            <div className='mc-busqueda-caja'>
                <span className='mc-busqueda-icono'></span>
                <input
                type='search'
                className='mc-busqueda'
                aria-label='Filtrar mis convocatorias por puesto o carrera'
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
                    {filtradas.map((c) => {
                        const compartida = buscarConvocatoriaPropia(c.puesto, usuario.id);
                        return (
                        <tr key={c.id}>
                            <td className='mc-puesto'>{c.puesto}</td>
                            <td className='mc-gris'>{c.carreras}</td>
                            <td>{c.publicacion}</td>
                            <td>{c.cierre}</td>
                            <td className='mc-der mc-num'>
                                {compartida ? <Link to={'/empresa/postulantes/' + compartida.id} aria-label={'Ver postulantes de ' + c.puesto}>{c.postulantes}</Link> : c.postulantes}
                            </td>
                            <td>
                                <span className={'mc-estado mc-' + c.estado.toLowerCase()}>{c.estado}</span>
                            </td>
                            <td className='mc-der mc-celda-menu'>
                                <button
                                    type='button'
                                    className='mc-menu'
                                    aria-label={'Acciones de ' + c.puesto}
                                    aria-expanded={menuAbierto === c.id}
                                    onClick={() => setMenuAbierto(menuAbierto === c.id ? null : c.id)}
                                >⋯</button>
                              {menuAbierto === c.id && (
                                    <div className='mc-desplegable'>
                                    {compartida && <Link to={'/empresa/postulantes/' + compartida.id}>Ver postulantes</Link>}
                                    {c.estado === 'Vigente'
                                        ? <button type='button' onClick={() => abrirModal(c)}>Cerrar convocatoria</button>
                                        : <span className='mc-sin-acciones'>Sin acciones disponibles</span>}
                                    </div>
                                )}
                            </td>
                        </tr>
                        );
                    })}
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
        )}


    {aviso && (
        <div className='mc-aviso' role='status'>
            <p>{aviso}</p>
            <button type='button' aria-label='Cerrar aviso' onClick={() => setAviso('')}>✕</button>
        </div>
        )}

    {aCerrar && (
        <div className='mc-fondo'>
            <div className='mc-modal' role='dialog' aria-modal='true' aria-labelledby='mc-cierre-titulo'>
            <h2 id='mc-cierre-titulo'>¿Cerrar esta convocatoria?</h2>
            <p>
                «{aCerrar.puesto}» tiene <strong>{aCerrar.postulantes} {aCerrar.postulantes === 1 ? 'postulante' : 'postulantes'}</strong>.
                En la versión final, al cerrarla los estudiantes ya no podrán postular y la convocatoria saldrá del catálogo.
            </p>
            <p className='mc-modal-alerta'>
                Simulación local: el cierre se conserva en este panel al recargar. No modifica el catálogo público ni las postulaciones.
            </p>
            {errorCierre && <p role='alert'>{errorCierre}</p>}
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
