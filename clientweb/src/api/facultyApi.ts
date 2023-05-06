import { handleError, handleResponse } from "./apiUtils"
import {Faculty} from "../models/Faculty";

const BASE_URL = "localhost:8080/api/faculty";

export function getFaculty() {
    return fetch(BASE_URL)
        .then(handleResponse)
        .catch(handleError);
}

export function getFacultyById(id : number) {
    return fetch(BASE_URL + `/${id}`)
        .then(handleResponse)
        .catch(handleError);
}

export function saveFaculty(faculty : Faculty) {
    return fetch(BASE_URL + (faculty._id || ""), {
        method: faculty._id ? "PUT" : "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({...faculty})
    })
        .then(handleResponse)
        .catch(handleError);
}

const FacultyApi = {
    getFaculty,
    getFacultyById,
    saveFaculty
};

export default FacultyApi;