import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"

const PacientesContext = createContext()

// eslint-disable-next-line react/prop-types
const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [alerta, setAlerta] = useState([])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(()=> {
            setAlerta({})
        }, 5000)
    }

    const submitPaciente = async paciente => {
        console.log(paciente);
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                mostrarAlerta,
                alerta,
                submitPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {PacientesProvider}

export default PacientesContext