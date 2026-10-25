import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BadgesEstado from './BadgesEstado'
import { formatearFecha } from '../../HU-4/utils/catalogoUtils'

export default function TablaPostulantes({ postulantes, seleccionados, onSeleccionar, onSeleccionarPagina, onAccion, rutaPerfil }) {
  const tabla = useRef(null)
  const casillaTodos = useRef(null)
  const disponibles = postulantes.filter((item) => item.estado !== 'retirada')
  const todos = disponibles.length > 0 && disponibles.every((item) => seleccionados.includes(item.id))
  const algunos = disponibles.some((item) => seleccionados.includes(item.id))

  useEffect(() => {
    casillaTodos.current.indeterminate = algunos && !todos
  }, [algunos, todos])

  useEffect(() => {
    const cerrar = (evento) => {
      tabla.current?.querySelectorAll('details[open]').forEach((menu) => {
        if (!menu.contains(evento.target)) menu.removeAttribute('open')
      })
    }
    document.addEventListener('pointerdown', cerrar)
    document.addEventListener('focusin', cerrar)
    return () => {
      document.removeEventListener('pointerdown', cerrar)
      document.removeEventListener('focusin', cerrar)
    }
  }, [])

  const accionar = (evento, accion) => {
    const menu = evento.currentTarget.closest('details')
    menu.removeAttribute('open')
    menu.querySelector('summary').focus()
    onAccion(accion)
  }

  return (
    <div className="bp-tabla-contenedor" ref={tabla}>
      <table className="bp-tabla">
        <caption className="visually-hidden">Postulantes de la convocatoria</caption>
        <thead><tr>
          <th><input ref={casillaTodos} type="checkbox" aria-label="Seleccionar postulantes de esta página" checked={todos} disabled={!disponibles.length} onChange={() => onSeleccionarPagina(disponibles.map((item) => item.id), !todos)} /></th>
          <th scope="col">Postulante</th><th scope="col">Carrera</th><th scope="col">Ciclo</th><th scope="col">Postuló</th><th scope="col">Estado</th><th scope="col">Acciones</th>
        </tr></thead>
        <tbody>
          {postulantes.map((item) => (
            <tr key={item.id} className={seleccionados.includes(item.id) ? 'bp-seleccionado' : ''}>
              <td><input type="checkbox" aria-label={`Seleccionar a ${item.nombre}`} checked={seleccionados.includes(item.id)} disabled={item.estado === 'retirada'} onChange={() => onSeleccionar(item.id)} /></td>
              <td><div className="bp-identidad"><span className="bp-avatar" aria-hidden="true" /><Link className="bp-nombre" to={rutaPerfil(item.id)}>{item.nombre}</Link></div></td>
              <td className="bp-carrera">{item.carrera}</td><td>{item.ciclo}.º</td><td>{formatearFecha(item.fechaPostulacion)}</td>
              <td><BadgesEstado estado={item.estado} /></td>
              <td>
                <details className="bp-menu" onKeyDown={(evento) => {
                  if (evento.key === 'Escape') { evento.currentTarget.removeAttribute('open'); evento.currentTarget.querySelector('summary').focus() }
                }} onToggle={(evento) => {
                  if (evento.currentTarget.open) tabla.current?.querySelectorAll('details[open]').forEach((menu) => { if (menu !== evento.currentTarget) menu.removeAttribute('open') })
                }}>
                  <summary aria-label={`Acciones de ${item.nombre}`}>···</summary>
                  <div className="bp-menu-opciones">
                    <Link to={rutaPerfil(item.id)}>Ver perfil</Link>
                    <button type="button" onClick={(evento) => accionar(evento, { tipo: 'nota', postulante: item })}>{item.nota ? 'Editar nota interna' : 'Agregar nota interna'}</button>
                    {item.estado !== 'retirada' && [['en_revision', 'Marcar en revisión'], ['aceptada', 'Aceptar'], ['descartada', 'Descartar']].map(([estado, texto]) => (
                      <button key={estado} type="button" disabled={item.estado === estado} onClick={(evento) => accionar(evento, { tipo: 'estado', ids: [item.id], estado })}>{texto}</button>
                    ))}
                  </div>
                </details>
              </td>
            </tr>
          ))}
          {postulantes.length === 0 && <tr><td colSpan="7" className="bp-vacio">No hay postulantes que coincidan con los filtros.</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
