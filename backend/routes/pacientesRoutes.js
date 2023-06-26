import express from "express";
import {
  obtenerPacientes,
  nuevoPaciente,
  obtenerPaciente,
  editarPaciente,
  eliminarPaciente,
  buscarPropietario,
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


router.post("/clientes", checkAuth, buscarPropietario)
router.post("/clientes/:id", checkAuth, agregarPropietario);
router.delete("/clientes/:id", checkAuth, eliminarPropietario);

export default router;