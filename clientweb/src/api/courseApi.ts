import { CourseDto } from '../components/layout/AddEditCourseForm';
import { handleError, handleResponse } from './apiUtils';

const BASE_URL = "http://localhost:8080/api/courses";

export function getCourses() {
    return fetch(BASE_URL)
        .then(handleResponse)
        .catch(handleError);
}

export function getCourseById(id : number) {
    return fetch(BASE_URL + `/${id}`)
        .then(handleResponse)
        .catch(handleError);
}

export function saveCourse(course : CourseDto) {
    return fetch(BASE_URL + (course._id || ""), {
        method: course._id ? "PUT" : "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(course)
    })
        .then(handleResponse)
        .catch(handleError);
}

const CourseApi = {
    getCourses,
    getCourseById,
    saveCourse
};

export default CourseApi;