import PreviewPaciente from "../components/PreviewPaciente"
import usePacientes from "../hooks/usePacientes"

const Pacientes = () => {

  const { pacientes } = usePacientes()

  return (
    <>
      <h1 className="text-4xl font-black">Pacientes</h1>

      <div className="bg-white shadow mt-10 rounded-lg ">
        {pacientes.length ? 

          pacientes.map(paciente => (
            <PreviewPaciente 
              key={paciente._id}
              paciente={paciente}
            />
          ))

          : <p className=" text-center text-gray-600 uppercase p-5">No hay pacientes aún</p>}
      </div>
    </>
  )
}

export default Pacientes