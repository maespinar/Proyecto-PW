import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmpresa } from '../context/empresaContexto';
import { validarPerfilEmpresa } from '../utils/perfilEmpresa';
import { SECTORES_EMPRESA, TAMANOS_EMPRESA } from '../../HU-1/data/catalogosEmpresa';
import '../styles/EditarPerfilEmpresa.css';

const distritos = ['San Isidro', 'Miraflores', 'Surco', 'San Borja', 'San Miguel', 'La Molina'];

export default function EditarPerfilEmpresa() {
    const navigate = useNavigate();
    const { empresa, guardarEmpresa, error: errorCarga, reintentar } = useEmpresa();
    const [formulario, setFormulario] = useState(empresa);
    const [guardado, setGuardado] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
        setGuardado(false);
    };

    const guardar = () => {
        try {
            const mensaje = validarPerfilEmpresa(formulario);
            if (mensaje) throw new Error(mensaje);
            guardarEmpresa(formulario);
            setError('');
            setGuardado(true);
        } catch (error) {
            setGuardado(false);
            setError(error.message);
        }
    };

    return (
        <>
        {errorCarga && <p role='alert'>{errorCarga} <button type='button' onClick={reintentar}>Reintentar lectura</button></p>}
        {error && <p role='alert'>{error}</p>}
        {guardado && (
            <div className='aviso-ep' role='status'>
                <p>Tus datos se guardaron en esta demostración local.</p>
                <button type='button' aria-label='Cerrar aviso' onClick={() => setGuardado(false)}>✕</button>
            </div>
        )}

        <section className='editarPerfil'>
            <div className='ePemp'>
                <p>
                    <span>Empresa · </span>
                    <span>Perfil de la empresa · </span>
                    <span className='actual'>Editar</span>
                </p>
                <h1>Editar perfil de la empresa</h1>
            </div>
            <div className='bts-ep'>
                <button type='button' className='bt1-ep' onClick={() => navigate('/empresa/perfil')}>Cancelar</button>
                <button type='button' className='bt2-ep' onClick={guardar}>Guardar cambios</button>
            </div>
        </section>

        <div className='datos-ep'>
            <section className='informacion-ep'>
                <p className='titulo-ep'>DATOS GENERALES</p>
                <div className='campos-ep'>
                    <div className='campo-ep'>
                        <label className='etiqueta-ep' htmlFor='ep-razonSocial'>RAZÓN SOCIAL</label>
                        <input type='text' id='ep-razonSocial' name='razonSocial' value={formulario.razonSocial} onChange={handleChange} />
                    </div>
                    <div className='campo-ep'>
                        <label className='etiqueta-ep' htmlFor='ep-nombreComercial'>NOMBRE COMERCIAL</label>
                        <input type='text' id='ep-nombreComercial' name='nombreComercial' value={formulario.nombreComercial} onChange={handleChange} />
                    </div>
                    <div className='campo-ep'>
                        <label className='etiqueta-ep' htmlFor='ep-ruc'>RUC</label>
                        <input type='text' id='ep-ruc' name='ruc' value={formulario.ruc} onChange={handleChange} disabled />
                        <span className='txtRuc'>El RUC no se puede editar. Escribe a soporte si necesitas corregirlo.</span>
                    </div>
                    <div className='campo-ep'>
                        <label className='etiqueta-ep' htmlFor='ep-sector'>SECTOR</label>
                        <select id='ep-sector' name='sector' value={formulario.sector} onChange={handleChange}>
                            {SECTORES_EMPRESA.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div className='campo-ep'>
                        <label className='etiqueta-ep' htmlFor='ep-tamano'>TAMAÑO</label>
                        <select id='ep-tamano' name='tamano' value={formulario.tamano} onChange={handleChange}>
                            {TAMANOS_EMPRESA.map((t) => (
                                <option key={t.valor} value={t.valor}>{t.etiqueta}</option>
                            ))}
                        </select>
                    </div>
                    <div className='campo-ep'>
                        <label className='etiqueta-ep' htmlFor='ep-sitioWeb'>SITIO WEB</label>
                        <input type='text' id='ep-sitioWeb' name='sitioWeb' value={formulario.sitioWeb} onChange={handleChange} />
                    </div>
                </div>

                <div className='descripcion-ep'>
                    <label className='etiqueta-ep' htmlFor='ep-descripcion'>DESCRIPCIÓN</label>
                    <textarea
                        id='ep-descripcion' name='descripcion'
                        value={formulario.descripcion}
                        onChange={handleChange}
                        maxLength={800}
                    />
                    <p className='pie-descripcion'>
                        <span>Aparece en tu ficha pública.</span>
                        <span>{formulario.descripcion.length} / 800</span>
                    </p>
                </div>
            </section>

            <div className='info-der-ep'>
                <section className='logotipo-ep'>
                    <p className='titulo-logo'>LOGOTIPO</p>
                    <div className='fila-logo'>
                        <div className='logo-ep'>
                            <span className='img-logo-ep'>logo</span>
                        </div>
                        <div className='acc-logo'>
                            <p className='info-logo'>PNG o SVG, fondo transparente, mínimo 240 × 240 px.</p>
                            <div className='bts-logo'>
                                <button type='button' className='bt1-logo'>Subir logotipo</button>
                                <button type='button' className='bt2-logo'>Quitar</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='direccion-ep'>
                    <p className='titulo-direc'>DIRECCIÓN Y CONTACTO</p>
                    <div className='campos-direc-ep'>
                        <div className='campo-ep'>
                            <label className='etiqueta-ep' htmlFor='ep-direccion'>DIRECCIÓN</label>
                            <input type='text' id='ep-direccion' name='direccion' value={formulario.direccion} onChange={handleChange} />
                        </div>
                        <div className='campo-ep'>
                            <label className='etiqueta-ep' htmlFor='ep-distrito'>DISTRITO</label>
                            <select id='ep-distrito' name='distrito' value={formulario.distrito} onChange={handleChange}>
                                {distritos.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                        <div className='campo-ep'>
                            <label className='etiqueta-ep' htmlFor='ep-correo'>CORREO DE CONTACTO</label>
                            <input type='text' id='ep-correo' name='correo' value={formulario.correo} onChange={handleChange} />
                        </div>
                        <div className='campo-ep'>
                            <label className='etiqueta-ep' htmlFor='ep-telefono'>TELÉFONO</label>
                            <input type='text' id='ep-telefono' name='telefono' value={formulario.telefono} onChange={handleChange} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </>
    );
}
