import { Student } from '../models/Student';
import { handleError, handleResponse } from './apiUtils';

const BASE_URL = "http://localhost:8080/api/students";

export function getStudents() {
    return fetch(BASE_URL)
        .then(handleResponse)
        .catch(handleError);
}

export function getStudentById(id : number) {
    return fetch(BASE_URL + `/${id}`)
        .then(handleResponse)
        .catch(handleError);
}

export function saveStudent(student : Student) {
    return fetch(BASE_URL + (student._id || ""), {
        method: student._id ? "PUT" : "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(student)
    })
        .then(handleResponse)
        .catch(handleError);
}

const StudentApi = {
    getStudents,
    getStudentById,
    saveStudent
};

export default StudentApi;