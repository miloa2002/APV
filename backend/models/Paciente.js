import mongoose from "mongoose";

const pacientesSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    sintomas: {
      type: String,
      trim: true,
      required: true,
    },
    fechaIngreso: {
      type: Date,
      default: Date.now(),
    },
    veterinario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Paciente = mongoose.model('Paciente', pacientesSchema);
export default Paciente;