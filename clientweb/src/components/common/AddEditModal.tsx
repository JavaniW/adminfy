import { PropsWithChildren } from "react";
import React from "react";
import "../../styles/Modal.css";
import ModelType from "../../enums/ModelType";

interface AddEditDrawerProps {
    openModal: () => void;
    closeModal: () => void;
    form: ModelType;
    trigger: JSX.Element;
    open: boolean;
}

export function AddEditDrawer(props : PropsWithChildren<AddEditDrawerProps>) {
    return (
        <>
            {React.cloneElement(props.trigger, {
                onClick: props.openModal
            })}
            {props.open && (
                <div className="add-edit-modal-container" onClick={props.closeModal}>
                    <div className={`add-edit-modal`} onClick={e => e.stopPropagation()}>
                        <img className="close-modal-img" src="./close.png" alt="close modal" onClick={props.closeModal}/>
                        {props.children}
                        <button form={`add-edit-${props.form}-form`} type="submit">Save</button>
                    </div>
                </div>
            )}
        </>
    )
}