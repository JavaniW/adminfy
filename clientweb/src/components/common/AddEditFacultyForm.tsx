import { ChangeEvent, useState } from "react";
import { Select } from "./Select";
import CourseSubject, { CourseSubjects } from "../../enums/CourseSubject";
import GradeLevel, { GradeLevels } from "../../enums/GradeLevel";
import { Faculty } from "../../models/Faculty";


export function AddEditFacultyForm() {
    const [faculty, setFaculty] = useState<Faculty>({ } as Faculty);

    function handleSelectChange (event : ChangeEvent<HTMLSelectElement>) {
        setFaculty({...faculty, [event.target.name]: event.target.value});
    };

    return (
        <form className="add-edit-from course-form">
            <label>
                <p>First Name:</p>
                <input type="text" name="firstName" id="firstName"/>
            </label>
            <label>
                <p>Last Name:</p>
                <input type="text" name="lastName" id="lastName"/>
            </label>
            <Select onChange={handleSelectChange} label={"Subject:"} options={CourseSubjects} default={CourseSubject.English}/>
            <Select onChange={handleSelectChange} label={"Grade:"} options={GradeLevels} default={GradeLevel.Nine}/>
        </form>
    )
}