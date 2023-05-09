import { Teacher } from '../models/Teacher';
import { handleError, handleResponse } from './apiUtils';

const BASE_URL = "http://localhost:8080/api/teachers";

export function getTeacher() {
    return fetch(BASE_URL)
        .then(handleResponse)
        .catch(handleError);
}

export function getTeacherById(id : number) {
    return fetch(BASE_URL + `/${id}`)
        .then(handleResponse)
        .catch(handleError);
}

export function saveTeacher(teacher : Teacher) {
    console.log(teacher);
    console.log("String 1");
    console.log(JSON.stringify(teacher));
    console.log("String 2");
    console.log(JSON.stringify({...teacher}));
    console.log(JSON.stringify(teacher) === JSON.stringify({...teacher}));

    return fetch(BASE_URL + (teacher._id || ""), {
        method: teacher._id ? "PUT" : "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(teacher)
    })
        .then(handleResponse)
        .catch(handleError);
}

const TeacherApi = {
    getTeacher,
    getTeacherById,
    saveTeacher
};

export default TeacherApi;