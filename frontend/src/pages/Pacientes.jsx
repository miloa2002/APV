import usePacientes from "../hooks/usePacientes"

const Pacientes = () => {

  const { pacientes } = usePacientes()
  console.log(pacientes);

  return (
    <>
      <h1 className="text-4xl font-black">Pacientes</h1>

      <div>
        
      </div>
    </>
  )
}

export default Pacientes