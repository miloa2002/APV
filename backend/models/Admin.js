import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  token: {
    type: String,
  },
  confirmado: {
    Boolean: false,
    default: false,
  },
  esAdmin: {
    Boolean: true,
    default: false,
  }
},{
    timestamps: true,
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;