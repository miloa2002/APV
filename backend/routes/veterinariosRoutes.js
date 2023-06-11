import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
} from "../controllers/veterinariosControllers.js";

const router = express.Router();

router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);

export default router;  