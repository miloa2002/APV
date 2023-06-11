import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
} from "../controllers/veterinariosControllers.js";

const router = express.Router();

router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);

export default router;  