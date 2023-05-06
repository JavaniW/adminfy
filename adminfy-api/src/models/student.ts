import mongoose from "mongoose";
import GradeLevel from "../GradeLevel";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    gradeLevel: {type: Number, enum: Object.values(GradeLevel), required: true}
}, {timestamps: true})

const Student = mongoose.model(`Student`, studentSchema);

export default Student;