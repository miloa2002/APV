import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import veterinariosRoutes from "./routes/veterinariosRoutes.js"
import pacientesRoutes from "./routes/pacientesRoutes.js"

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//routing
app.use("/api/veterinarios", veterinariosRoutes);
app.use("/api/pacientes", pacientesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`servidor corriendo en el puerto: ${PORT}`);
})