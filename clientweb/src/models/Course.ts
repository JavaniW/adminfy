import CourseSubject from "../enums/CourseSubject";

export interface Course {
  teacher: string;
  courseNumber: Number;
  subject: CourseSubject;
  enrolled?: number | string;
}
