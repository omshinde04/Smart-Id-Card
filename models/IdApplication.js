import mongoose from "mongoose";

const IdApplicationSchema = new mongoose.Schema(
  {
    studentEmail: { type: String, required: true, unique: true },

    name: String,
    mobile: String,
    dob: String,
    blood: String,
    address: String,
    year: { type: String, default: "TY" },
    photo: String,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    enrollment: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.IdApplication ||
  mongoose.model("IdApplication", IdApplicationSchema);
