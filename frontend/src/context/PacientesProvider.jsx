import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"
import { useNavigate } from "react-router-dom"

const PacientesContext = createContext()

// eslint-disable-next-line react/prop-types
const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [alerta, setAlerta] = useState({})
    const [paciente, setPaciente] = useState({})
    const [cargando, setCargando] = useState(false)

    const navigate = useNavigate()

    useEffect(()=> {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios("/pacientes", config)
                setPacientes(data)

            } catch (error) {
                console.log(error);
            }
        }
        obtenerProyectos()
    }, [])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(()=> {
            setAlerta({})
        }, 5000)
    }

    const submitPaciente = async paciente => {
        try {
            const token = localStorage.getItem('token')
            if(!token)return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post('/pacientes', paciente, config)
            setPacientes([...pacientes, data])

            setAlerta({
                msg: 'Paciente creado correctamente',
                error: false
            })

            setTimeout(()=> {
                setAlerta({})
                navigate("/pacientes")
            }, 3000)

        } catch (error) {
            console.log(error);
        }
    }

    const obtenerPaciente = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios(`/pacientes/${id}`, config)
            setPaciente(data)
        } catch (error) {
            console.log(error);
        }finally{
            setCargando(false)
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                mostrarAlerta,
                alerta,
                submitPaciente,
                obtenerPaciente,
                paciente,
                cargando
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {PacientesProvider}

export default PacientesContext