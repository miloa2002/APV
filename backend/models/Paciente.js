import mongoose from "moongose";

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
      type: mongoose.Schema.types.ObjectId,
      ref: "User",
    },
    clientes: [
      {
        type: mongoose.Schema.types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Paciente = mongoose.model('Paciente', pacientesSchema);
export default Paciente;