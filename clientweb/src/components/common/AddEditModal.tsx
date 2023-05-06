import { ChangeEvent, useState } from "react";
import ModelType from "../../enums/ModelType";
import React from "react";
import { AddEditFacultyForm } from "./AddEditFacultyForm";
import "../../styles/Modal.css";

interface AddEditDrawerProps<T> {
    model: ModelType;
    onSave: (x: T) => any;
    trigger: JSX.Element;
    form?: JSX.Element | ((x: any) => JSX.Element);
}

export function AddEditDrawer<T>(props : AddEditDrawerProps<T>) {

    const [open, setOpen] = useState<boolean>(false);
    const [model, setModel] = useState<T>({ } as T);

    function handleChange (event : ChangeEvent<any>) {
        setModel({...model, [event.target.name]: event.target.value});
    };

    function handleOpen() {
        setOpen(true);
      };

    function handleSubmit(event : SubmitEvent) {
        event.preventDefault();
        props.onSave(model);
        setOpen(false);
    };

    return (
        <>
            {React.cloneElement(props.trigger, {
                onClick: handleOpen
            })}
            {open && (
                <div className="modal-container">
                    <div className={`modal add-edit-${props.model}-modal`} >
                        {props.form && React.createElement(AddEditFacultyForm, {
                            changeHandler: handleChange,
                            onSubmit: handleSubmit
                        })}
                        <button form={`add-edit-${props.model}-form`} type="submit">Save</button>
                    </div>
                </div>
            )}
        </>
    )
}