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

export const CourseSubjectOptions = Object.entries(CourseSubject).map(
  ([_key, value]) => ({
    label: value,
    value,
  })
);

export type CourseSubjectOption = { label: string; value: CourseSubject };

export type CourseSubjectType = (typeof CourseSubjects)[number];

export default CourseSubject;

export type CourseSubject1 = `${CourseSubject}`;

// let nameOfMath = CourseSubjects
