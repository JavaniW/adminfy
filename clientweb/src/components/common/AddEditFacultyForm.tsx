import { ChangeEvent, useState } from "react";
import { Select } from "./Select";
import CourseSubject, { CourseSubjects } from "../../enums/CourseSubject";
import GradeLevel, { GradeLevels } from "../../enums/GradeLevel";
import "../../styles/Modal.css";
import { Faculty } from "../../models/Faculty";
import FacultyApi from "../../api/facultyApi";
import { SyntheticEvent } from "react";
import {toast} from "react-toastify";

interface AddEditFacultyFormProps {
    onAfterSubmit : () => any;
}

export function AddEditFacultyForm(props : AddEditFacultyFormProps) {
    const [faculty, setFaculty] = useState<Faculty>({
        _id: "",
        firstName: "",
        lastName: "",
        subject: "" as CourseSubject,
        grade: "" as GradeLevel
     } as Faculty);

    function handleChange (event : ChangeEvent<any>) {
        setFaculty({...faculty, [event.target.name]: event.target.value});
    };

    function handleSubmit(event : SyntheticEvent) {
        event.preventDefault();
        console.log("Pressed");
        FacultyApi.saveFaculty(faculty)
            .then(x => {
                props.onAfterSubmit();
                toast("successfully added");
            })
            .catch(console.error);

    }

    return (
        <form onSubmit={handleSubmit} id="add-edit-faculty-form" className="add-edit-form course-form">
            <label>
                <p>First Name:</p>
                <input onChange={handleChange} value={faculty.firstName} type="text" name="firstName" id="firstName"/>
            </label>
            <label>
                <p>Last Name:</p>
                <input onChange={handleChange} value={faculty.lastName} type="text" name="lastName" id="lastName"/>
            </label>
            <Select onChange={handleChange} value={faculty.subject} label={"Subject"} options={CourseSubjects} default={CourseSubject.English}/>
            <Select onChange={handleChange} value={faculty.grade} label={"Grade"} options={GradeLevels} default={GradeLevel.Nine}/>
        </form>
    )
}