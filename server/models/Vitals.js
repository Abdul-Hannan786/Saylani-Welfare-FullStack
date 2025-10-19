import mongoose from "mongoose";

const vitalsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bp: {
      type: String, // e.g. "120/80"
    },
    sugar: {
      type: String, // e.g. "95"
    },
    weight: {   
      type: String, // e.g. "70kg"
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Vitals = mongoose.model("Vitals", vitalsSchema);
export default Vitals;
