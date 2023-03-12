import mongoose from 'mongoose';

const classifySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
    },
    {
        timestamps:true,
    }
);
const Classify = mongoose.model("Classify", classifySchema);
export default Classify;