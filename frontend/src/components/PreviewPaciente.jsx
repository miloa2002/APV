/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const PreviewPaciente = ({paciente}) => {

    // eslint-disable-next-line react/prop-types, no-unused-vars
    const { nombre, _id, fechaIngreso } = paciente
    

  return (
    <div className="border-b p-5 flex">
        
        <p className="flex-1">
            {nombre}
            <span className="text-sm text-gray-500 uppercase">{" "} {fechaIngreso.split('T')[0]}</span>
        </p>

        <Link
            to={`${_id}`}
            className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        >Ver paciente</Link>
    </div>
  )
}

export default PreviewPaciente