import express from "express";
import {
  obtenerPacientes,
  nuevoPaciente,
  obtenerPaciente,
  editarPaciente,
  eliminarPaciente,
  agregarPropietario,
  eliminarPropietario,
} from "../controllers/pacienteController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/")
  .get(checkAuth, obtenerPacientes)
  .post(checkAuth, nuevoPaciente);

router.route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, editarPaciente)
    .delete(checkAuth, eliminarPaciente)

router.post("/agregar-cliente/:id", checkAuth, agregarPropietario);
router.post("/eliminar-cliente/:id", checkAuth, eliminarPropietario);

export default router;