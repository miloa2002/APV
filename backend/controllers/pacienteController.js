import Paciente from "../models/Paciente.js";

const obtenerPacientes = async(req, res) => {
    const pacientes = await Paciente.find().where("veterinario").equals(req.usuario);

    res.json(pacientes);
};

const nuevoPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.usuario._id

    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findById(id);

    if(!paciente){
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message });
    }

    if(paciente.veterinario.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida");
        return res.status(401).json({ msg: error.message });
    }

    res.json(paciente);
};

const editarPaciente = async (req, res) => {
        const { id } = req.params;

        const paciente = await Paciente.findById(id);

        if (!paciente) {
          const error = new Error("No encontrado");
          return res.status(404).json({ msg: error.message });
        }

        if (paciente.veterinario.toString() !== req.usuario._id.toString()) {
          const error = new Error("Acción no válida");
          return res.status(401).json({ msg: error.message });
        }

        paciente.nombre = req.body.nombre || paciente.nombre;
        paciente.sintomas = req.body.sintomas || paciente.sintomas;
        paciente.fechaIngreso = req.body.fechaIngreso || paciente.fechaIngreso;

        try {
            const pacienteAlmacenado = await paciente.save();
            res.json(pacienteAlmacenado);
        } catch (error) {
            console.log(error);
        }
};

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findById(id);

    if (!paciente) {
      const error = new Error("No encontrado");
      return res.status(404).json({ msg: error.message });
    }

    if (paciente.veterinario.toString() !== req.usuario._id.toString()) {
      const error = new Error("Acción no válida");
      return res.status(401).json({ msg: error.message });
    }

    try {
        await paciente.deleteOne();
        res.json({msg: "Paciente eliminado"});
    } catch (error) {
        console.log(error);
    }
};

const agregarPropietario = async(req, res) => {};

const eliminarPropietario = async (req, res) => {};

export {
    obtenerPacientes,
    nuevoPaciente,
    obtenerPaciente,
    editarPaciente,
    eliminarPaciente,
    agregarPropietario,
    eliminarPropietario,
}