import CourseSubject from '../enums/CourseSubject';
import { Teacher } from './Teacher';
import Student from './Student';

export interface Course {
  _id?: string | number;
  number: string | number;
  name: string;
  teacher: Teacher;
  subject: CourseSubject;
  enrolled?: number | string;
  students: Student[];
}
