import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  enrollment: String,
  name: String,
  status: {
    type: String,
    enum: ["present", "absent"],
    default: "absent",
  },
});

const AttendanceSchema = new mongoose.Schema({
  date: { type: String, unique: true }, // YYYY-MM-DD
  records: [RecordSchema],
});

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", AttendanceSchema);
