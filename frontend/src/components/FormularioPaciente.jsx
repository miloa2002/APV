import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import usePacientes from "../hooks/usePacientes"
import Alerta from "./Alerta"

const FormularioPaciente = () => {

  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState("")
  const [sintomas, setSintomas] = useState("")
  const [fechaIngreso, setFechaIngreso] = useState("")

  const params = useParams()

  const { mostrarAlerta, alerta, submitPaciente, paciente } = usePacientes()

  useEffect(()=>{
    if(params.id){
      setId(paciente._id)
      setNombre(paciente.nombre)
      setSintomas(paciente.sintomas)
      setFechaIngreso(paciente.fechaIngreso?.split('T')[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params])

  const handleSubmit = async e => {
    e.preventDefault()

    if([nombre, sintomas, fechaIngreso].includes("")){
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })

      return
    }

    //datos al provider
    await submitPaciente({id, nombre, sintomas, fechaIngreso})

    setId(null)
    setNombre("")
    setSintomas("")
    setFechaIngreso("")
  }

  const { msg } = alerta

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >

      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label 
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >Nombre del paciente</label>

        <input 
          id="nombre"
          type="text" 
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
          placeholder="Nombre del paciente"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />

      </div>

      <div className="mb-5">
        <label
          htmlFor="sintomas"
          className="text-gray-700 uppercase font-bold text-sm"
        >Síntomas</label>

        <textarea
          id="sintomas"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
          placeholder="Síntomas del paciente"
          value={sintomas}
          onChange={e => setSintomas(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="fecha-ingreso"
          className="text-gray-700 uppercase font-bold text-sm"
        >Fecha de ingreso del paciente</label>

        <input
          id="nombre"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
          value={fechaIngreso}
          onChange={e => setFechaIngreso(e.target.value)}
        />
      </div>

      <input 
        type="submit" 
        value={id ? "Actualizar paciente" : "Crear paciente"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors" 
      />

    </form>
  )
}

export default FormularioPaciente