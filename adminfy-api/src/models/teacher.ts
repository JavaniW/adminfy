import mongoose from "mongoose";
import CourseSubject from "../CourseSubject";
import GradeLevel from "../GradeLevel";
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    image: {type: String, required: false},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    subject: {type: String, enum: Object.values(CourseSubject), required: true},
    grade: {type: String, enum: Object.values(GradeLevel), required: true}
}, {timestamps: true })

const Teacher = mongoose.model(`Teacher`, teacherSchema);
export default Teacher;