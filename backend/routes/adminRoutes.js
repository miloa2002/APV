import express from "express";
import { registrar } from "../controllers/registrarAdmin.js";

const router = express.Router();

router.post("/", registrar);

export default router;  