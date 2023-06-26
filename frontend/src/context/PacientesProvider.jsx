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
    const [cliente, setCliente] = useState({})

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
        
        if(paciente.id){
            await editarPaciente(paciente)
        }else{
            await nuevoPaciente(paciente)
        }
    }

    const editarPaciente = async paciente => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)

            setPacientes(pacientesActualizados)

            setAlerta({
                msg: 'Paciente actualizado correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate("/pacientes")
            }, 3000)

        } catch (error) {
            console.log(error);
        }
    }

    const nuevoPaciente = async paciente => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/pacientes', paciente, config)
            setPacientes([...pacientes, data])

            setAlerta({
                msg: 'Paciente creado correctamente',
                error: false
            })

            setTimeout(() => {
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
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }finally{
            setCargando(false)
        }
    }

    const eliminarPaciente = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)

            //sincronizar el state
            const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id)
            setPacientes(pacientesActualizados)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate("/pacientes")
            }, 3000)
            
        } catch (error) {
            console.log(error);
        }
    }

    const submitCliente = async email => {

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

            const {data} = await clienteAxios.post("/pacientes/clientes", {email}, config)

            setCliente(data)
            setAlerta({})
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }finally {
            setCargando(false)
        }
    }

    const agreagarCliente = async email => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            setAlerta({
                msg: data.msg,
                error: false
            })
            setCliente({})
            setAlerta({})

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/pacientes/clientes/${cliente._id}`, email, config)

            console.log(data);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const cerrarSesionPacientes = () =>{
        setPacientes([])
        setPaciente({})
        setAlerta({})
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
                cargando,
                eliminarPaciente,
                submitCliente,
                cliente,
                agreagarCliente,
                cerrarSesionPacientes
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {PacientesProvider}

export default PacientesContext