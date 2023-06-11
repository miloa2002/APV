import User from "../models/Veterinario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async(req, res) => {

    const { email } = req.body;
    const existeUsuario = await User.findOne({ email });
    
    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message});
    }

    try {
        const usuario = new User(req.body);
        usuario.token = generarId();
        const usuarioGuardado = await usuario.save();
       res.json(usuarioGuardado);
    } catch (error) {
        console.log(error);
    }
};

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    //existe usuario?
    const usuario = await User.findOne({email});
    if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message});
    }

    //usuario confirmado
    if (!usuario.confirmado) {
      const error = new Error("Tu cuenta no ha sido confirmada");
      return res.status(403).json({ msg: error.message });
    }

    //comprobar password
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            telefono: usuario.telefono,
            token: generarJWT(usuario._id),
        })
    }else{
        const error = new Error("El password es incorrecto");
        return res.status(403).json({ msg: error.message });
    }

};

const confirmar = async (req, res) => {
    
    const { token } = req.params;
    const usuarioConfirmar = await User.findOne({token});
    if(!usuarioConfirmar){
        const error = new Error("Token no válido");
        return res.status(403).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save();
        res.json({msg: "Usuario confirmado correctamente"});
    } catch (error) {
        console.log(error);
    }
}

const olvidePassword = async(req, res) => {
    const { email } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        res.json({msg: "Hemos enviado un email con las instrucciones"});
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken = async(req, res) => {
    const { token } = req.params;

    const tokenValido = await User.findOne({ token });

    if(tokenValido){
        res.json({msg: "Token válido y el usuario existe"})
    }else{
        const error = new Error("Token no válido");
        return res.status(404).json({ msg: error.message });
    }
}

const nuevoPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await User.findOne({ token });

    if (usuario) {
      usuario.password = password;
      usuario.token = "";
      try {
        await usuario.save();
        res.json({ msg: "Password modificado correctamente" });
      } catch (error) {
        console.log(error);
      }
    } else {
      const error = new Error("Token no válido");
      return res.status(404).json({ msg: error.message });
    }
}

const perfil = async(req, res) => {
    const { usuario } = req;
    res.json(usuario)
}

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};