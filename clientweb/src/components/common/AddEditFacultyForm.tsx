import { ChangeEvent } from "react";
import { Select } from "./Select";
import CourseSubject, { CourseSubjects } from "../../enums/CourseSubject";
import GradeLevel, { GradeLevels } from "../../enums/GradeLevel";
import "../../styles/Modal.css";

interface AddEditFacultyFormProps {
    onSubmit?: (x : any) => any;
    changeHandler: (event : ChangeEvent) => any;
}

export function AddEditFacultyForm(props : AddEditFacultyFormProps) {

    return (
        <form onSubmit={props.onSubmit} id="add-edit-faculty-form" className="add-edit-form course-form">
            <label>
                <p>First Name:</p>
                <input type="text" name="firstName" id="firstName"/>
            </label>
            <label>
                <p>Last Name:</p>
                <input type="text" name="lastName" id="lastName"/>
            </label>
            <Select onChange={props.changeHandler} label={"Subject"} options={CourseSubjects} default={CourseSubject.English}/>
            <Select onChange={props.changeHandler} label={"Grade"} options={GradeLevels} default={GradeLevel.Nine}/>
        </form>
    )
}