import { useState } from 'react'

export function useFormularioRegistro(datosIniciales, validar, enviando, onRegistrar) {
  const [datos, setDatos] = useState(datosIniciales)
  const [visitados, setVisitados] = useState({})
  const [intentoEnvio, setIntentoEnvio] = useState(false)
  const validacion = validar(datos)
  const errores = Object.fromEntries(Object.entries(validacion).filter(([campo]) => intentoEnvio || visitados[campo]))

  function cambiar(evento) {
    const { name, value, type, checked } = evento.target
    setDatos(anteriores => ({ ...anteriores, [name]: type === 'checkbox' ? checked : value }))
  }

  function marcarVisitado(evento) {
    const { name } = evento.target
    setVisitados(anteriores => ({ ...anteriores, [name]: true }))
  }

  function registrar(evento) {
    evento.preventDefault()
    if (enviando) return
    setIntentoEnvio(true)
    const primerError = Object.keys(validacion)[0]
    if (primerError) {
      evento.currentTarget.elements[primerError].focus()
      return
    }
    onRegistrar(datos)
  }

  function atributos(nombre, ayuda = false) {
    const descripcion = [ayuda && !errores[nombre] && `registro-${nombre}-ayuda`, errores[nombre] && `registro-${nombre}-error`].filter(Boolean).join(' ')
    return {
      id: `registro-${nombre}`,
      name: nombre,
      value: datos[nombre],
      onChange: cambiar,
      onBlur: marcarVisitado,
      required: true,
      'aria-invalid': Boolean(errores[nombre]),
      'aria-describedby': descripcion || undefined,
    }
  }

  return { datos, errores, cantidadErrores: Object.keys(errores).length, cambiar, marcarVisitado, registrar, atributos }
}
