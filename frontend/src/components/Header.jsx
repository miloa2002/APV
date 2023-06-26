import { Link } from "react-router-dom"
import usePacientes from "../hooks/usePacientes"
import useAuth from "../hooks/UseAuth"

const Header = () => {

    const { cerrarSesionPacientes } = usePacientes()
    const { cerrarSesionAuth } = useAuth()

    const handleSesion = () => {
        cerrarSesionAuth()
        cerrarSesionPacientes()
        localStorage.removeItem('token')
    }

  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-sky-600 font-black text-center">APV</h2>

            <input 
                type="search" 
                placeholder="Buscar paciente"
                className="rounded-lg lg:w-96 block p-2 border outline-none"
            />

            <div className="flex items-center gap-4">
                <Link
                    to="/pacientes"
                    className="font-bold uppercase"
                >Pacientes</Link>

                <button
                    onClick={handleSesion}
                    type="button"
                    className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                >Cerrar sesión</button>
            </div>
        </div>
    </header>
  )
}

export default Header