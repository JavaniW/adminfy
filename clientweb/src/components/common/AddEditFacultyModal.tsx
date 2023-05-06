import { ChangeEvent, ReactElement, useState } from "react";
// import { AddEditCourseForm } from "./AddEditCourseForm";
import { AddEditFacultyForm } from "./AddEditFacultyForm";
import React from "react";
import FacultyApi from "../../api/facultyApi";
import { Faculty } from "../../models/Faculty";

interface AddEditDrawerProps {
    trigger: ReactElement | JSX.Element;
}


export function AddEditFacultyDrawer(props: AddEditDrawerProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [faculty, setFaculty] = useState<Faculty>({ } as Faculty);

    function handleChange (event : ChangeEvent<any>) {
        setFaculty({...faculty, [event.target.name]: event.target.value});
    };

    function handleOpen() {
        setOpen(true);
      };

    function handleSubmit(event : SubmitEvent) {
        event.preventDefault();
        FacultyApi.saveFaculty(faculty);
        setOpen(false);
    };

    return (
        <>
            {React.cloneElement(props.trigger, {
                onClick: handleOpen
            })}
            {open && (
                <div className="drawer">
                    <div className="add-edit-drawer add-edit-faculty-drawer">
                        <AddEditFacultyForm changeHandler={handleChange} onSubmit={handleSubmit}/>
                        <button form={`add-edit-faculty-form`} type="submit">Save</button>
                    </div>
                </div>
            )}
        </>
    )
}