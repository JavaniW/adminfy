import GradeLevel from '../enums/GradeLevel';

export interface Student {
    _id?: string | number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gradeLevel: GradeLevel;
}

export default Student;