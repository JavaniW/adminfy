import mongoose from "mongoose";
import CourseSubject from "../CourseSubject";
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseNumber: {type: Number, required: true, unique: true},
    teacher: { type: mongoose.Types.ObjectId, ref: "Teacher", required: true},
    subject: { type: String, enum: Object.values(CourseSubject), required: true},
}, {timestamps: true})

const Course = mongoose.model(`Course`, courseSchema);
export default Course;