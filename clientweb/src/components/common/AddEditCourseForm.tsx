import { ChangeEvent, ReactElement, ReactNode, useState } from "react";
import { Select } from "./Select";
import CourseSubject, { CourseSubjectType, CourseSubjects } from "../../enums/CourseSubject";

interface AddEditFormProps<T> {
    model: T;
    children: (ReactNode | ReactElement | JSX.Element)[];
}

export function AddEditCourseForm<T>(props: AddEditFormProps<T>) {
    const [subject, setSubject] = useState<CourseSubjectType>();
    const [teacherName, setTeacherName] = useState<string>();

    function handleSubjectSelectChange (event : ChangeEvent<HTMLSelectElement>) {
        setSubject(event.target.value as CourseSubject);
    };


    return (
        <form className="add-edit-from course-form">
            <Select onChange={handleSubjectSelectChange} label={"Subject:"} options={CourseSubjects} default={CourseSubject.English}/>
            <label>
                <p>Teacher:</p>
                <input type="text" />
            </label>
        </form>
    )
}