// export enum GradeLevel {
//     "Nine" = 9,
//     "Ten" = 10,
//     "Eleven" = 11,
//     "Twelve" = 12,
// }

export enum GradeLevel {
  Nine = "9",
  Ten = "10",
  Eleven = "11",
  Twelve = "12",
}

export const gradeOptions = [
  "All",
  GradeLevel.Nine.toString(),
  GradeLevel.Ten,
  GradeLevel.Eleven,
  GradeLevel.Twelve,
] as const;

export type gradeSelectOptions = (typeof gradeOptions)[number];

export default GradeLevel;
