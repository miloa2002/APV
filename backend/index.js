import express from "express";
import adminRoutes from "./routes/adminRoutes.js"
import conectarDB from "./config/db.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//routing
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`servidor corriendo en el puerto: ${PORT}`);
})