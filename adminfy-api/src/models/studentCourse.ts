import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentCourseSchema = new Schema({
    student: {type: mongoose.Types.ObjectId, ref: `Student`},
    course: {type: mongoose.Types.ObjectId, ref: `Course`}
}, {timestamps: true})

const StudentCourse = mongoose.model(`Course`, studentCourseSchema);
export default StudentCourse;