import CourseSubject from "../enums/CourseSubject";

export interface Course {
  _id?: string | number;
  teacher: string;
  courseNumber: Number;
  subject: CourseSubject;
  enrolled?: number | string;
}
