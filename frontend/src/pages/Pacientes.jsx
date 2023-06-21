import usePacientes from "../hooks/usePacientes"

const Pacientes = () => {

  const { pacientes } = usePacientes()

  return (
    <>
      <h1 className="text-4xl font-black">Pacientes</h1>

      <div className="bg-white shadow mt-10 rounded-lg ">
        {pacientes.length ? <p>Si hay proyectos</p> : <p>No hay proyectos aún</p>}
      </div>
    </>
  )
}

export default Pacientes