import GradeLevel from "../GradeLevel";

export interface Student {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gradeLevel: GradeLevel;
}

export default Student;