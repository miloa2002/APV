import mongoose from "mongoose";

mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);

const conectarDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        await mongoose.connect(mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log("Conexión exitosa a MongoDB");
    } catch (error) {
        console.log(error);
    }
}

export default conectarDB;