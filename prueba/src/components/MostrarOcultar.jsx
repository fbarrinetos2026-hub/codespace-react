import { useState } from 'react'

export default function MostrarOcultar() {
  const [mostrar, setMostrar] = useState(false)

  return (
    <>
      <button onClick={()=>setMostrar(!mostrar)}>{mostrar?"Ocultar":"Mostrar"}</button>

      {mostrar && (<p>React es una biblioteca para crear interfaces de usuario</p>)}
    </>
  )
}