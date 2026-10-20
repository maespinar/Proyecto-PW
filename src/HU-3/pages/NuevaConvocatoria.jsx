import '../styles/NuevaConvocatoria.css';

export default function NuevaConvocatoria() {
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
                <button type='button' className='nc-btn-publicar'>Publicar convocatoria</button>
            </div>
        </section>
        </>
    )
}