import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import usePacientes from "../hooks/usePacientes"

const Paciente = () => {
    const params = useParams()
    const { obtenerPaciente, paciente, cargando } = usePacientes()

    const { nombre, sintomas, fechaIngreso } = paciente;
    console.log(paciente);

    useEffect(() => {
        obtenerPaciente(params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        cargando ? "" : (
            <>
                <div className="flex justify-between">
                    <h1 className="font-black text-4xl">Paciente: {nombre}</h1>

                    <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                        <Link
                            to={`/pacientes/editar/${params.id}`}
                            className="uppercase font-bold"
                        >Editar</Link>
                    </div>
                </div>
                <p className="font-black mt-3">Sintomas: <span className="font-normal">{sintomas}</span></p>
                <p className="font-black mt-3">Fecha de ingreso: <span className="font-normal">{fechaIngreso}</span></p>

                <div className="flex items-center justify-between mt-10 ">
                    <p className="font-bold text-xl">Dueño mascota</p>
                    <Link
                        to={`/pacientes/nuevo-cliente/${paciente._id}`}
                        className="text-gray-400 hover:text-black uppercase font-bold"
                    >Añadir</Link>
                </div>
            </>
        )
    )
}

export default Paciente