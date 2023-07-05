import { CourseQuery } from "../models/Course";
import { handleError, handleResponse } from "./apiUtils";

const BASE_URL = "http://localhost:8080/api/courses";

export function getCourses() {
  return fetch(BASE_URL).then(handleResponse).catch(handleError);
}

export function getCourseById(id: number) {
  return fetch(BASE_URL + `/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

export function saveCourse(course: CourseQuery) {
  return fetch(BASE_URL + "/" + (course._id || ""), {
    method: course._id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(course),
  })
    .then((res) => {
      console.log(res);
      handleResponse(res).then(console.log);
    })
    .catch(handleError);
}

export function addStudentToCourse(courseId: number, studentId: number) {
  return fetch(`${BASE_URL}/${courseId}/students/${studentId}`, {
    method: "POST",
  })
    .then(handleResponse)
    .catch(handleError);
}

const CourseApi = {
  getCourses,
  getCourseById,
  saveCourse,
};

export default CourseApi;
