import mongoose from "mongoose";

const { Schema } = require("mongoose");

const likeSchema = new Schema(
    {
        likeId: {
            type: String,
            required: [true, "likeId es requerido"],
            trim: true,
        },
        userId: {
            type: String,
            required: [true, "userId es requerido"],
            trim: true,
        },
        projectId: {
            type: String,
            required: [true, "projectId es requerido"],
            trim: true,
        },
        tipo: {
            type: String,
            required: [true, "tipo es requerido"],
            trim: true,
        }
    });

const like = mongoose.models.like || mongoose.model("like", likeSchema);

export default like; 