import CourseSubject from "../enums/CourseSubject";
import { Teacher } from "./Teacher";
import Student from "./Student";

export interface Course {
  _id?: string | number;
  number: string | number;
  name: string;
  teacher: Teacher;
  subject: CourseSubject;
  students: Student[];
}

export type CourseQuery = Omit<Course, "teacher" | "students" | "subject"> & {
  teacher: string;
  students: string[];
  subject: CourseSubject | undefined;
};
