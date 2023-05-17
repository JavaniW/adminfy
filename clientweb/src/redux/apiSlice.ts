// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Student from "../models/Student";
import { Teacher } from "../models/Teacher";
import { Course, CourseQuery } from "../models/Course";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      query: () => `/courses`,
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `/courses/${id}`,
    }),
    saveCourse: builder.mutation<Course, CourseQuery>({
      query: (course: CourseQuery) => ({
        url: `/courses/${course._id}`,
        method: course._id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(course),
      }),
    }),
    getStudents: builder.query<Student[], void>({
      query: () => `/students`,
    }),
    getStudent: builder.query<Student, string>({
      query: (id: string) => `/students/${id}`,
    }),
    saveStudent: builder.mutation<Student, Student>({
      query: (student: Student) => ({
        url: `/students/${student._id}`,
        method: student._id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(student),
      }),
    }),
    getTeachers: builder.query<Teacher[], void>({
      query: () => `/teachers`,
    }),
    getTeacher: builder.query<Teacher, string>({
      query: (id: string) => `/teachers/${id}`,
    }),
    saveTeacher: builder.mutation<Teacher, Teacher>({
      query: (teacher: Teacher) => ({
        url: `/teachers/${teacher._id}`,
        method: teacher._id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(teacher),
      }),
    }),
    getCourseStudents: builder.query<Student[], string>({
      query: (courseId) => `/courses/${courseId}/students`,
    }),
    getCourseStudent: builder.query<
      Student,
      { courseId: string; studentId: string }
    >({
      query: (params) =>
        `/courses/${params.courseId}/students/${params.studentId}`,
    }),
    saveCourseStudent: builder.mutation<Student, { courseId: string; studentId: string }>({
      query: (params) => ({
        url: `/courses/${params.courseId}/students/${params.studentId}`,
        method: "POST"
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetCoursesQuery,
  useSaveCourseMutation,
  useGetTeachersQuery,
  useSaveTeacherMutation,
  useGetStudentsQuery,
  useSaveStudentMutation,
} = apiSlice;
