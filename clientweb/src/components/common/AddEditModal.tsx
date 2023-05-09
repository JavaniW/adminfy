import '../../styles/Modal.css';

import React, { PropsWithChildren } from 'react';

import ModelType from '../../enums/ModelType';

interface AddEditModalProps {
    openModal: () => void;
    closeModal: () => void;
    form: ModelType;
    trigger: JSX.Element;
    open: boolean;
}

export function AddEditModal(props : PropsWithChildren<AddEditModalProps>) {
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