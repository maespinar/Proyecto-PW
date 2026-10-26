import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NuevaConvocatoria.css';
import { useConvocatorias } from '../context/convocatoriasContexto';


const carrerasDisponibles = [
  'Ingeniería de Sistemas',
  'Ingeniería Industrial',
  'Administración',
  'Contabilidad',
  'Marketing',
  'Psicología',
  'Comunicación',
];

const validar = (f) => {
    const e = {};

    if (!f.titulo.trim()) {
        e.titulo = 'Ingresa el título del puesto.';
    }

    const sub = Number(f.subvencion);
    if (!f.subvencion || sub < 1025 || sub > 2500) {
        e.subvencion = 'Debe estar entre S/ 1,025.00 y S/ 2,500.00';
    }

    if (!f.fechaCierre) {
        e.fechaCierre = 'Ingresa la fecha de cierre.';
    } else if (f.fechaPublicacion && f.fechaCierre <= f.fechaPublicacion) {
        e.fechaCierre = 'El cierre debe ser posterior a la fecha de publicación.';
    }

    return e;
};

const modalidades = ['Presencial', 'Híbrido', 'Remoto'];
const jornadas = ['Medio tiempo', 'Tiempo completo'];
const distritos = ['San Isidro', 'Miraflores', 'Surco', 'San Borja', 'San Miguel', 'La Molina'];
const ciclos = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo'];

const aFecha = (iso) => (iso ? iso.split('-').reverse().join('/') : '—');

export default function NuevaConvocatoria() {
    const [formulario, setFormulario] = useState({
            titulo: '',
            descripcion: '',
            funciones: '',
            cicloMinimo: '',
            modalidad: '',
            jornada: '',
            distrito: '',
            subvencion: '',
            beneficios: '',
            fechaPublicacion: '',
            fechaCierre: '',
            vacantes: '',
            avisarCorreo: true
    });

    const [carreras, setCarreras] = useState([]);
    const [habilidades, setHabilidades] = useState([]);
    const [nuevaHabilidad, setNuevaHabilidad] = useState('');

    const navigate = useNavigate();
    const { agregarConvocatoria } = useConvocatorias();
    const [intento, setIntento] = useState(false);

    const errores = intento ? validar(formulario) : {};
    const cantidad = Object.keys(errores).length;

    const publicar = () => {
    setIntento(true);
        if (Object.keys(validar(formulario)).length === 0) {
            agregarConvocatoria({
            puesto: formulario.titulo.trim(),
            carreras: carreras.join(', ') || '—',
            publicacion: aFecha(formulario.fechaPublicacion),
            cierre: aFecha(formulario.fechaCierre),
            postulantes: 0,
            estado: 'Vigente',
            });
            navigate('/empresa/convocatorias');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormulario({
            ...formulario,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const agregarCarrera = (e) => {
        const valor = e.target.value;
        if (valor && !carreras.includes(valor)) {
            setCarreras([...carreras, valor]);
        }
    };

    const quitarCarrera = (nombre) => {
        setCarreras(carreras.filter((c) => c !== nombre));
    };

    const agregarHabilidad = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const valor = nuevaHabilidad.trim();
            if (valor && !habilidades.includes(valor)) {
                setHabilidades([...habilidades, valor]);
            }
            setNuevaHabilidad('');
        }
    };

    const quitarHabilidad = (nombre) => {
        setHabilidades(habilidades.filter((h) => h !== nombre));
    };

    return(
        <>
        <section className='nc-titulo'>
            <div>
                <p className='nc-t'>
                    <span>Convocatorias · </span>
                    <span className='nc-actual'>Nueva convocatoria</span>
                </p>
                <h1>Nueva Convocatoria</h1>
            </div>
            <div className='nc-botones'>
                <button type='button' className='nc-btn-borrador'>Guardar como borrador</button>
                <button 
                    type='button' 
                    className='nc-btn-publicar'
                    onClick={publicar}
                    disabled={cantidad > 0}
                >
                    Publicar convocatoria
                </button>
            </div>
        </section>
        
        {cantidad > 0 && (
            <p className='nc-banner-error'>
                Revisa {cantidad} {cantidad === 1 ? 'campo' : 'campos'} antes de publicar.
            </p>
        )}

        <div className='nc-columnas'>
            <div className='nc-col'>
                <section className='nc-tarjeta'>
                    <p className='nc-seccion'>1 · PUESTO</p>

                    <div className={errores.titulo ? 'nc-campo nc-con-error' : 'nc-campo'}>
                        <span className='nc-etiqueta'>TÍTULO DEL PUESTO</span>
                        <input
                            type='text'
                            name='titulo'
                            value={formulario.titulo}
                            onChange={handleChange}
                        />
                        {errores.titulo && <span className='nc-error'>{errores.titulo}</span>}
                    </div>

                    <div className='nc-campo'>
                        <span className='nc-etiqueta'>DESCRIPCIÓN DE LA PRÁCTICA</span>
                        <textarea 
                            name='descripcion'
                            value={formulario.descripcion}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='nc-campo'>
                        <span className='nc-etiqueta'>FUNCIONES PRINCIPALES</span>
                        <textarea 
                            name='funciones'
                            value={formulario.funciones}
                            onChange={handleChange}
                        />
                    </div>
                </section>

                <section className='nc-tarjeta'>
                    <p className='nc-seccion'>2 · PERFIL BUSCADO</p>

                    <div className='nc-campo'>
                        <span className='nc-etiqueta'>CARRERAS</span>
                        <div className='nc-scs'>
                            {carreras.map((c) => (
                                <span className='nc-sc' key={c}>
                                    {c}
                                    <button
                                        type='button'
                                        className='nc-sc-x'
                                        onClick={() => quitarCarrera(c)}
                                    >✕</button>
                                </span>
                            ))}
                            <select className='nc-agregar' value='' onChange={agregarCarrera}>
                                <option value=''>+ agregar</option>
                                {carrerasDisponibles
                                    .filter((c) => !carreras.includes(c))
                                    .map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className='nc-fila'>
                        <div className='nc-campo'>
                            <span className='nc-etiqueta'>CICLO MÍNIMO</span>
                            <select
                                name='cicloMinimo'
                                value={formulario.cicloMinimo}
                                onChange={handleChange}
                            >
                                <option value=''>Selecciona</option>
                                {ciclos.map((c) => 
                                    <option key={c} value={c}>{c}</option>
                                )}
                            </select>
                        </div>

                        <div className='nc-campo'>
                             <span className='nc-etiqueta'>HABILIDADES DESEADAS</span>
                             <div className='nc-scs'>
                                {habilidades.map((h) => (
                                    <span className='nc-sc' key={h}>
                                        {h}
                                        <button
                                            type='button'
                                            className='nc-sc-x'
                                            onClick={() => quitarHabilidad(h)}
                                        >✕</button>
                                    </span>
                                ))}
                                <input
                                    type='text'
                                    className='nc-input-sc'
                                    placeholder='Escribe y presiona Enter'
                                    value={nuevaHabilidad}
                                    onChange={(e) => setNuevaHabilidad(e.target.value)}
                                    onKeyDown={agregarHabilidad}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className='nc-col'>
                <section className='nc-tarjeta'>
                    <p className='nc-seccion'>3 · CONDICIONES</p>

                    <div className='nc-fila'>
                        <div className='nc-campo'>
                            <span className='nc-etiqueta'>MODALIDAD</span>
                            <select name='modalidad' value={formulario.modalidad} onChange={handleChange}>
                                <option value=''>Selecciona</option>
                                {modalidades.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                        <div className='nc-campo'>
                            <span className='nc-etiqueta'>JORNADA</span>
                            <select name='jornada' value={formulario.jornada} onChange={handleChange}>
                                <option value=''>Selecciona</option>
                                {jornadas.map((j) => (
                                    <option key={j} value={j}>{j}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='nc-fila'>
                        <div className='nc-campo'>
                            <span className='nc-etiqueta'>DISTRITO</span>
                            <select name='distrito' value={formulario.distrito} onChange={handleChange}>
                                <option value=''>Selecciona</option>
                                {distritos.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        <div className={errores.subvencion ? 'nc-campo nc-con-error' : 'nc-campo'}>
                            <span className='nc-etiqueta'>SUBVENCIÓN MENSUAL</span>
                            <input
                                type='number'
                                name='subvencion'
                                placeholder='S/ 0.00'
                                value={formulario.subvencion}
                                onChange={handleChange}
                            />
                            {errores.subvencion
                                ? <span className='nc-error'>{errores.subvencion}</span>
                                : <span className='nc-ayuda'>Entre S/ 1,025.00 y S/ 2,500.00</span>}
                        </div>
                    </div>

                    <div className='nc-campo'>
                        <span className='nc-etiqueta'>BENEFICIOS</span>
                        <textarea
                            name='beneficios'
                            value={formulario.beneficios}
                            onChange={handleChange}
                        />
                    </div>
                </section>

                <section className='nc-tajerta'>
                    <p className='nc-seccion'>4 · PUBLICACIÓN</p>
                    <div className='nc-fila'>
                        <div className='nc-campo'>
                            <span className='nc-etiqueta'>FECHA DE PUBLICACIÓN</span>
                            <input
                                type='date'
                                name='fechaPublicacion'
                                value={formulario.fechaPublicacion}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={errores.fechaCierre ? 'nc-campo nc-con-error' : 'nc-campo'}>
                            <span className='nc-etiqueta'>FECHA DE CIERRE</span>
                            <input
                                type='date'
                                name='fechaCierre'
                                value={formulario.fechaCierre}
                                onChange={handleChange}
                            />
                            {errores.fechaCierre && <span className='nc-error'>{errores.fechaCierre}</span>}
                        </div>
                    </div>

                    <div className='nc-campo nc-vacantes'>
                        <span className='nc-etiqueta'>VACANTES</span>
                        <input
                            type='number'
                            min='1'
                            name='vacantes'
                            value={formulario.vacantes}
                            onChange={handleChange}
                        />
                    </div>

                    <label className='nc-check'>
                        <input
                            type='checkbox'
                            name='avisarCorreo'
                            checked={formulario.avisarCorreo}
                            onChange={handleChange}
                        />
                        Avisarme por correo cada vez que llegue una postulación
                    </label>
                </section>

                <section className='nc-aviso'>
                    <span className='nc-aviso-icono'>i</span>
                    <p>Al publicar, la convocatoria queda visible para todos los estudiantes cuya carrera coincida. Puedes editarla o cerrarla en cualquier momento desde «Mis convocatorias».</p>
                </section>
            </div>
        </div>
        </>
    )
}