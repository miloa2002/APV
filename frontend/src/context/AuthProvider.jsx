import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    // // const navigate = useNavigate()

    useEffect(()=> {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')

            if(!token){
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('veterinarios/perfil', config)
                setAuth(data)
                // navigate('/pacientes')
            } catch (error) {
                setAuth({})
            }finally{
                setCargando(false)
            }

        }
        autenticarUsuario()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const cerrarSesionAuth = () => {
        setAuth({})
    }

  return (
    <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cargando ,
            cerrarSesionAuth
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export {
    AuthProvider
}

export default AuthContext