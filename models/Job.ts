import mongoose, { Schema, models } from "mongoose";

const JobSchema = new Schema(
  {
    userId: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    jobUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Saved", "Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    appliedDate: { type: Date, default: Date.now },
    resumeUsed: { type: String, default: "" },
    notes: { type: String, default: "" },
    salary: { type: String, default: "" },
    location: { type: String, default: "" },
  },
  { timestamps: true }
);

const Job = models.Job || mongoose.model("Job", JobSchema);
export default Job;