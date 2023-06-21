import FormularioPaciente from "../components/FormularioPaciente"

const NuevoPaciente = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear paciente</h1>

      <div className="mt-10 flex justify-center">
        <FormularioPaciente />
      </div>
    </>
  )
}

export default NuevoPaciente