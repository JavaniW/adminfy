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
  CourseSubject.Science,
] as const;

export type CourseSubjectType = (typeof CourseSubjects)[number];

export default CourseSubject;

// export type CourseSubject = "Math" | "History" | "Social Studies" | "English" | "Science";
export const CourseSubjects1 = [
  CourseSubject[CourseSubject.Math],
  CourseSubject.History.toString(),
  CourseSubject.SocialStudies.toString(),
  CourseSubject.English.toString(),
  CourseSubject.Science.toString(),
];

export type CourseSubject1 = `${CourseSubject}`;

// let nameOfMath = CourseSubjects
