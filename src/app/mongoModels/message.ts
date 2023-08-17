import mongoose from "mongoose";

const { Schema } = require("mongoose");

const messageSchema = new Schema(
    {
        messageId: {
            type: String,
            required: [true, "messageId es requerido"],
            trim: true,
        },
        userId: {
            type: String,
            required: [true, "userId es requerido"],
            trim: true,
        },
        subject: {
            type: String,
            required: [true, "subject es requerido"],
        },
        body: {
            type: String,
            required: [true, "body es requerido"]
        }
    });

const message = mongoose.models.message || mongoose.model("message", messageSchema);

export default message; 