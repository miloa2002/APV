import express from "express";
import { registrar } from "../controllers/registrarAdmin.js";

const router = express.Router();

router.get("/", registrar);

export default router;