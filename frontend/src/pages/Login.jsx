import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/UseAuth"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alerta, setAlerta] = useState({})

  const { setAuth } = useAuth();

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();

    if([email, password].includes("")){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return;
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/login', {
        email, password
      })
      setAlerta({

      })
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate("/pacientes")
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">Inicia sesión y administra tus <span className="text-slate-700">pacientes</span></h1>

      {msg && <Alerta alerta={alerta} />}

      <form 
        action=""
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input 
            id="email"
            type="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          value="Iniciar sessión"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" 
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="registrar"
        >¿No tienes una cuenta? Registrate</Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="olvide-password"
        >Olvidé mi password</Link>
      </nav>
    </>
  )
}

export default Login