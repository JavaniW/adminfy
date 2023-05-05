import CourseSubject from "../enums/CourseSubject";
import GradeLevel from "../enums/GradeLevel";

export interface Faculty {
  image: string;
  firstName: string;
  lastName: string;
  subject: CourseSubject;
  grade: GradeLevel;
}
