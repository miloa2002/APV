import User from "../models/Veterinario.js";

const registrar = async(req, res) => {

    const { email } = req.body;
    const existeUsuario = await User.findOne({ email });
    
    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message});
    }

    try {
        const usuario = new User(req.body);
        const usuarioGuardado = await usuario.save();
       res.json(usuarioGuardado);
    } catch (error) {
        console.log(error);
    }
};

export {registrar};