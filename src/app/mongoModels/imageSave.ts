import mongoose from "mongoose";
const {Schema} = require("mongoose");


const imageSchema = new Schema({
    image: {
        type: Buffer,
        required: [true, "ImageSave es requerida"],
        trim: false
    },
    imageId: {
        type: String,
        required: [true, "id es requerido"],
        trim: false
    },
    type: {
        type: String,
        required: [true, "imageType es requerido"],
        trim: false
    }
});

const imageSave = mongoose.models.imageSave || mongoose.model("imageSave", imageSchema);

export default imageSave;