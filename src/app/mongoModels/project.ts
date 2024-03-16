import mongoose from "mongoose";

const { Schema } = require("mongoose");

const projectSchema = new Schema(
    {
        projectId: {
            type: String,
            required: [true, "Id es requerido"],
            trim: true,
        },
        nombre: {
            type: String,
            required: [true, "nombre es requerido"],
            trim: true,
        },
        fecha: {
            type: String,
            required: [true, "Id es requerido"],
            trim: true,
        },
        descripcion: {
            type: String,
            required: [true, "Id es requerido"],
            trim: true,
        },
        stack: {
            type: String,
            required: [true, "Id es requerido"],
            trim: true,
        },
        imagen: {
            data: {
                type: Buffer,
                required: [true, "data de la imagen es requerida"],
                trim: false
            },
            type: {
                type: String,
                required: [true, "type de la imagen es requerido"],
                trim: false
            }
        }
    });

const project = mongoose.models.project || mongoose.model("project", projectSchema);

export default project; 