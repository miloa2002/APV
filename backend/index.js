import express from "express";
import adminRoutes from "./routes/adminRoutes.js"

const app = express();

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`servidor corriendo en el puerto: ${PORT}`);
})