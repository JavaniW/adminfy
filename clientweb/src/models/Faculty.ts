import GradeLevel from "../GradeLevel";

export interface Faculty {
  image: string;
  firstName: string;
  lastName: string;
  subject: string;
  grade: GradeLevel;
}
