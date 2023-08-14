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
    });

const project = mongoose.models.project || mongoose.model("Project", projectSchema);

export default project; 