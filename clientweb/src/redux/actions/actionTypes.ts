export enum CourseActionTypes {
    CREATE_COURSE = "CREATE_COURSE",
    UPDATE_COURSE = "UPDATE_COURSE",
    DELETE_COURSE = "DELETE_COURSE"
}
export enum TeacherActionTypes {
    CREATE_TEACHER = "CREATE_TEACHER",
    UPDATE_TEACHER = "UPDATE_TEACHER",
    DELETE_TEACHER = "DELETE_TEACHER"
}
export enum StudentActionTypes {
    CREATE_STUDENT = "CREATE_STUDENT",
    UPDATE_STUDENT = "UPDATE_STUDENT",
    DELETE_STUDENT = "DELETE_STUDENT"
}

const ActionTypes = {
    ...CourseActionTypes,
    ...TeacherActionTypes,
    ...StudentActionTypes
}

export default ActionTypes;