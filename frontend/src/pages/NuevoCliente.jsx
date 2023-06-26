import { useEffect } from "react"
import FormularioCliente from "../components/FormularioCliente"
import usePacientes from "../hooks/usePacientes"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"

const NuevoCliente = () => {

    const {obtenerPaciente, paciente, cargando, cliente, agreagarCliente, alerta} = usePacientes()
    const params = useParams()

    useEffect(()=> {
        obtenerPaciente(params.id)
    }, [])

    if(!paciente?._id) return <Alerta alerta={alerta} /> 


  return (
    <>
        <h1 className="text-4xl font-black">Añadir cliente(a) al paciente: {paciente.nombre}</h1>

        <div className="mt-10 flex justify-center">
            <FormularioCliente />
        </div>

          {cargando ? <p className="text-center">Cargando...</p> : cliente?._id && (
            <div className="flex justify-center mt-10">
                <div className="bg-white py-10 px-5 md:w/2 rounded-lg shadow">
                    <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>

                    <div className="flex justify-between items-center gap-7">
                        <p>{paciente.nombre}</p>

                        <button
                            onClick={()=> agreagarCliente({
                                email: cliente.email
                            })}
                            type="button"
                            className="bg-slate-500 px-5 rounded-lg uppercase text-white font-bold text-sm"
                        >
                            Agregar como le dueño del paciente
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default NuevoCliente