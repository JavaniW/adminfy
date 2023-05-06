export enum CourseSubject {
  Math = "Math",
  History = "History",
  SocialStudies = "Social Studies",
  English = "English",
  Science = "Science",
}

export const CourseSubjects = [
  CourseSubject.Math,
  CourseSubject.History,
  CourseSubject.SocialStudies,
  CourseSubject.English,
  CourseSubject.Science
] as const;

export type CourseSubjectType = (typeof CourseSubjects)[number];

export default CourseSubject;