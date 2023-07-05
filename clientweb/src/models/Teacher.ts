import CourseSubject from "../enums/CourseSubject";
import GradeLevel from "../enums/GradeLevel";

export interface Teacher {
  _id?: string | number;
  image: string;
  firstName: string;
  lastName: string;
  subject: CourseSubject;
  grade: GradeLevel;
}

export type TeacherOption = {
  label: string;
  value: string;
};
