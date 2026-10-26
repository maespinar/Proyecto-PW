import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmpresa } from '../context/empresaContexto';
import '../styles/EditarPerfilEmpresa.css';

const sectores = ['Consultoría', 'Banca y finanzas', 'Retail', 'Minería', 'Tecnología', 'Salud'];
const tamanos = ['De 1 a 10 colaboradores', 'De 11 a 50 colaboradores', 'De 51 a 200 colaboradores', 'Más de 200 colaboradores'];
const distritos = ['San Isidro', 'Miraflores', 'Surco', 'San Borja', 'San Miguel', 'La Molina'];

export default function EditarPerfilEmpresa() {
    const navigate = useNavigate();
    const { empresa, guardarEmpresa } = useEmpresa();
    const [formulario, setFormulario] = useState(empresa);
    const [guardado, setGuardado] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
        setGuardado(false);
    };

    const guardar = () => {
        guardarEmpresa(formulario);
        setGuardado(true);
    };

    return (
        <>
        {guardado && (
            <div className='aviso-ep'>
                <p>Tus datos se guardaron correctamente.</p>
                <button type='button' onClick={() => setGuardado(false)}>✕</button>
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
                        <span className='etiqueta-ep'>RAZÓN SOCIAL</span>
                        <input type='text' name='razonSocial' value={formulario.razonSocial} onChange={handleChange} />
                    </div>
                    <div className='campo-ep'>
                        <span className='etiqueta-ep'>NOMBRE COMERCIAL</span>
                        <input type='text' name='nombreComercial' value={formulario.nombreComercial} onChange={handleChange} />
                    </div>
                    <div className='campo-ep'>
                        <span className='etiqueta-ep'>RUC</span>
                        <input type='text' name='ruc' value={formulario.ruc} onChange={handleChange} disabled />
                        <span className='txtRuc'>El RUC no se puede editar. Escribe a soporte si necesitas corregirlo.</span>
                    </div>
                    <div className='campo-ep'>
                        <span className='etiqueta-ep'>SECTOR</span>
                        <select name='sector' value={formulario.sector} onChange={handleChange}>
                            {sectores.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div className='campo-ep'>
                        <span className='etiqueta-ep'>TAMAÑO</span>
                        <select name='tamano' value={formulario.tamano} onChange={handleChange}>
                            {tamanos.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                    <div className='campo-ep'>
                        <span className='etiqueta-ep'>SITIO WEB</span>
                        <input type='text' name='sitioWeb' value={formulario.sitioWeb} onChange={handleChange} />
                    </div>
                </div>

                <div className='descripcion-ep'>
                    <span className='etiqueta-ep'>DESCRIPCIÓN</span>
                    <textarea
                        name='descripcion'
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
                            <span className='etiqueta-ep'>DIRECCIÓN</span>
                            <input type='text' name='direccion' value={formulario.direccion} onChange={handleChange} />
                        </div>
                        <div className='campo-ep'>
                            <span className='etiqueta-ep'>DISTRITO</span>
                            <select name='distrito' value={formulario.distrito} onChange={handleChange}>
                                {distritos.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                        <div className='campo-ep'>
                            <span className='etiqueta-ep'>CORREO DE CONTACTO</span>
                            <input type='text' name='correo' value={formulario.correo} onChange={handleChange} />
                        </div>
                        <div className='campo-ep'>
                            <span className='etiqueta-ep'>TELÉFONO</span>
                            <input type='text' name='telefono' value={formulario.telefono} onChange={handleChange} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </>
    );
}