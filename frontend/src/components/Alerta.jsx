/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
const Alerta = ({alerta}) => {
  return (
    // eslint-disable-next-line react/prop-types
    <div className={` ${alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600' } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 `}>
        {alerta.msg}
    </div>
  )
}

export default Alerta