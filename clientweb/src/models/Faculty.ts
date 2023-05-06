import CourseSubject from "../enums/CourseSubject";
import GradeLevel from "../enums/GradeLevel";

export interface Faculty {
  _id?: string | number;
  image: string;
  firstName: string;
  lastName: string;
  subject: CourseSubject;
  grade: GradeLevel;
}
