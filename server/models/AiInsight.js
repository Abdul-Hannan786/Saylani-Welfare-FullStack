import mongoose from "mongoose";

const aiInsightSchema = new mongoose.Schema(
    {
        fileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File",
            required: true,
        },
        englishSummary: {
            type: String,
            // required: true,
        },
        urduSummary: {
            type: String,
            default: "",
            // required: true
        },
        doctorQuestions: [String],
    },
    { timestamps: true }
);

const AiInsight = mongoose.model("AiInsight", aiInsightSchema);
export default AiInsight;
