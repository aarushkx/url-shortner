import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
    {
        url: { type: String, required: true },
        slug: { type: String, unique: true },
        history: [{ type: Date }],
    },
    { timestamps: true },
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
