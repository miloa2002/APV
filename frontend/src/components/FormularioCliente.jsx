import { useState } from "react"
import usePacientes from "../hooks/usePacientes"
import Alerta from "./Alerta"

const FormularioCliente = () => {

    const [email, setEmail] = useState("")

    const { mostrarAlerta, alerta, submitCliente } = usePacientes()

    const handleSubmit = e => {
        e.preventDefault()

        if(email === ""){
            mostrarAlerta({
                msg: "El email es obligatorio",
                error: true
            })
            return
        }

        submitCliente(email)
    }

    const {msg} = alerta

  return (
    <form 
        onSubmit={handleSubmit}
        action=""
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm" 
                    htmlFor="email"
                >Email cliente</label>

                <input 
                    type="email"
                    id="email"
                    placeholder="Email del cliente(a)"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={email}
                  onChange={e => setEmail(e.target.value)} 
                />
            </div>

            <input 
                type="submit" 
                value="Buscar cliente"
                className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors text-sm " 
            />
    </form>
  )
}

export default FormularioCliente