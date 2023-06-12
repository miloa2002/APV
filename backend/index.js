import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import veterinariosRoutes from "./routes/veterinariosRoutes.js";
import pacientesRoutes from "./routes/pacientesRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//configurar cors
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error('Error de Cors'));
        }
    }
}

app.use(cors(corsOptions));

//routing
app.use("/api/veterinarios", veterinariosRoutes);
app.use("/api/pacientes", pacientesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`servidor corriendo en el puerto: ${PORT}`);
})