import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseStudentSchema = new Schema(
  {
    course: { type: mongoose.Types.ObjectId, ref: `Course` },
    student: { type: mongoose.Types.ObjectId, ref: `Student` },
  },
  { timestamps: true, collection: "course_student" }
);

const CourseStudent = mongoose.model(`Course_Student`, courseStudentSchema);
export default CourseStudent;
