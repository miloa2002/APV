import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
  cambiarEstado,
} from "../controllers/veterinariosControllers.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", comprobarToken);
router.route("/olvide-password/:token")
    .get(comprobarToken)
    .post(nuevoPassword);
router.put("/cambiar-admin", cambiarEstado);

router.get('/perfil', checkAuth, perfil);

export default router;  