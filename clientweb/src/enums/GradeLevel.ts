export enum GradeLevel {
  Nine = "9",
  Ten = "10",
  Eleven = "11",
  Twelve = "12",
}

export const GradeLevels = [
  GradeLevel.Nine,
  GradeLevel.Ten,
  GradeLevel.Eleven,
  GradeLevel.Twelve,
] as const;

export type GradeLevelType = (typeof GradeLevels)[number];

export default GradeLevel;
