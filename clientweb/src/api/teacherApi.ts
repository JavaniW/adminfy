import { Teacher } from "../models/Teacher";
import { handleError, handleResponse } from "./apiUtils";

const BASE_URL = "http://localhost:8080/api/teachers";

export function getTeachers() {
  return fetch(BASE_URL).then(handleResponse).catch(handleError);
}

export function getTeacherById(id: number) {
  return fetch(BASE_URL + `/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

export function saveTeacher(teacher: Teacher) {
  return fetch(BASE_URL + "/" + (teacher._id || ""), {
    method: teacher._id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(teacher),
  })
    .then(handleResponse)
    .catch(handleError);
}

const TeacherApi = {
  getTeachers,
  getTeacherById,
  saveTeacher,
};

export default TeacherApi;
