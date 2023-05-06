export enum GradeLevel {
    Nine = "9",
    Ten = "10",
    Eleven = "11",
    Twelve = "12",
  }
  
  export const _gradeLevel = [
    GradeLevel.Nine,
    GradeLevel.Ten,
    GradeLevel.Eleven,
    GradeLevel.Twelve,
  ] as const;
  
  export type Grade = (typeof _gradeLevel)[number];
  
  export default GradeLevel;