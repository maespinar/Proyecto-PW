import '../styles/EditarPerfilEmpresa.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function EditarPerfilEmpresa() {
    const navigate = useNavigate();

    const [formulario, setFormulario] = useState({
        razonSocial: "Consultora Andes Perú S.A.C.",
        nombreComercial: "Andes Perú",
        ruc: "20548712936",
        sector: "Consultoría",
        tamano: "TAct",
        sitioWeb: "andeperu.com.pe",
        descripcion: "Consultora peruana de transformación digital con 14 años en el mercado. Acompañamos a bancos, retailers y operadores de telecomunicaciones en la mejora de sus procesos y en el desarrollo de sus plataformas internas. Nuestro programa de prácticas dura seis meses y cada practicante trabaja con un mentor asignado.",
        direccion: "Av. Canaval y Moreyra 480, piso 9",
        distrito: "San Isidro",
        correo: "seleccion@andesperu.com.pe",
        telefono: "(01) 415 8820"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    return(
        <>
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
                <button className='bt1-ep' onClick={() => navigate('/empresa/perfil')}>Cancelar</button>
                <button className='bt2-ep' onClick={() => navigate('/empresa/perfil')}>Guardar cambios</button>
            </div>
        </section>

        <div className='datos-ep'>
            <section className='informacion-ep'>
                <p className='titulo-ep'>DATOS GENERALES</p>
                <div className='campos-ep'>
                    <div className='campo-ep'>
                        <span className='etiqueta-ep'>RAZÓN SOCIAL</span>
                        <input 
                            type='text' 
                            name='razonSocial'
                            value={formulario.razonSocial} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className='campo-ep'>
                        <span className='etiqueta-ep'>NOMBRE COMERCIAL</span>
                        <input 
                            type='text' 
                            name='nombreComercial'
                            value={formulario.nombreComercial} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className='campo-ep'>
                        <span className='etiqueta-ep'>RUC</span>
                        <input 
                            type='text'
                            name='ruc'
                            value={formulario.ruc} 
                            onChange={handleChange}
                            disabled
                        />     
                        <span className='txtRuc'>El RUC no se puede editar. Escribe a soporte si necesitas
                        corregirlo.</span>               
                    </div>
                    <div className='campo-ep'>
                        <span className='etiqueta-ep'>SECTOR</span>
                        <select 
                            name='sector' 
                            id='sector' 
                            value={formulario.sector}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="Consultoría">Consultoría</option>
                            <option value="ByF">Bancas y Finanzas</option>
                            <option value="Retail">Retail</option>
                            <option value="Minería">Minería</option>
                        </select>
                    </div>
                    <div className='campo-ep'>
                        <span className='etiqueta-ep'>TAMAÑO</span>
                        <select 
                            name='tamano' 
                            id='tamano' 
                            value={formulario.tamano}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="1-10">De 1 a 10 colaboradores</option>
                            <option value="11-50">De 11 a 50 colaboradores</option>
                            <option value="TAct">De 51 a 200 colaboradores</option>
                            <option value="+200">Más de 200 colaboradores</option>
                        </select>
                    </div>
                    <div className='campo-ep'>
                        <span className='etiqueta-ep'>SITIO WEB</span>
                        <input 
                            type='text'
                            name='sitioWeb'
                            value={formulario.sitioWeb}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='descripcion-ep'>
                    <span className='etiqueta-ep'>DESCRIPCIÓN</span>
                    <textarea
                        name='descripcion'
                        value={formulario.descripcion}
                        onChange={handleChange}
                        rows='5'
                    />
                    <p className='pie-descripcion'>
                        <span>Aparece en tu ficha pública.</span>
                        <span>178 / 800</span>
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
                                <button className='bt1-logo'>Subir logotipo</button>
                                <button className='bt2-logo'>Quitar</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='direccion-ep'>
                    <p className='titulo-direc'>DIRECCIÓN Y CONTACTO</p>
                    <div className='campos-direc-ep'>
                        <div className='campo-ep'>
                            <span className='etiqueta-ep'>DIRECCIÓN</span>
                            <input
                                type='text'
                                name='direccion'
                                value={formulario.direccion}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='campo-ep'>
                            <span className='etiqueta-ep'>DISTRITO</span>
                            <select
                                name='distrito'
                                id='distrito'
                                value={formulario.distrito}
                                onChange={handleChange}
                            >
                                <option value="distrito">San Isidro</option>
                                <option value="Miraflores">Miraflores</option>
                                <option value="Surco">Surco</option>
                                <option value="San Borja">San Borja</option>
                            </select>
                        </div>
                        <div className='campo-ep'>
                            <span className='etiqueta-ep'>CORREO DE CONTACTO</span>
                            <input
                                type='text'
                                name='correo'
                                value={formulario.correo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='campo-ep'>
                            <span className='etiqueta-ep'>TELÉFONO</span>
                            <input
                                type='text'
                                name='telefono'
                                value={formulario.telefono}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>      
        </>
    );
}