import mongoose from "mongoose";
import CourseSubject from "../CourseSubject";
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    teacher: { type: mongoose.Types.ObjectId, ref: "Teacher", required: true },
    subject: {
      type: String,
      enum: Object.values(CourseSubject),
      required: true,
    },
    students: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model(`Course`, courseSchema);
export default Course;
