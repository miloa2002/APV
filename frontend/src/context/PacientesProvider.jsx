import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"

const PacientesContext = createContext()

// eslint-disable-next-line react/prop-types
const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                setPacientes
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {PacientesProvider}

export default PacientesContext