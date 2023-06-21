import { useEffect } from "react"
import { useParams } from "react-router-dom"
import usePacientes from "../hooks/usePacientes"
import FormularioPaciente from "../components/FormularioPaciente"

const EditarPaciente = () => {
    const params = useParams()
    const { obtenerPaciente, paciente, cargando } = usePacientes()

    const { nombre } = paciente;

    useEffect(() => {
        obtenerPaciente(params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(cargando) return "Cargando..."

  return (
      <>
        <h1 className="font-black text-4xl">EditarPaciente: {nombre}</h1>

          <div className="mt-10 flex justify-center">
            <FormularioPaciente />
          </div>
      </>
  )
}

export default EditarPaciente