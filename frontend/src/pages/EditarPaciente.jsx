import { useEffect } from "react"
import { useParams } from "react-router-dom"
import usePacientes from "../hooks/usePacientes"
import FormularioPaciente from "../components/FormularioPaciente"

const EditarPaciente = () => {
  const params = useParams()
  const { obtenerPaciente, paciente, cargando, eliminarPaciente } = usePacientes()

  const { nombre } = paciente;

  useEffect(() => {
    obtenerPaciente(params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick= () => {
    if(confirm("¿Deseas eliminar este paciente?")){
      eliminarPaciente(params.id)
    }
  }

  if (cargando) return "Cargando..."

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">Editar Paciente: {nombre}</h1>

        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <button
            className="uppercase font-bold"
            onClick={handleClick}
          >Eliminar Paciente</button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <FormularioPaciente />
      </div>
    </>
  )
}

export default EditarPaciente