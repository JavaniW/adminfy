import "../../styles/AddEditModal.css";

import React, { PropsWithChildren } from "react";

import ModelType from "../../enums/ModelType";

interface Props {
  openModal: () => void;
  closeModal: () => void;
  form: ModelType;
  trigger: JSX.Element;
  open: boolean;
}

export const AddEditModal: React.FunctionComponent<PropsWithChildren<Props>> = (
  props
) => {
  return (
    <>
      {React.cloneElement(props.trigger, {
        onClick: props.openModal,
      })}
      {props.open && (
        <div className="add-edit-modal-container" onClick={props.closeModal}>
          <div
            className={`add-edit-modal`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="close-modal-img"
              src="./close.png"
              alt="close modal"
              onClick={props.closeModal}
            />
            {props.children}
            <button form={`add-edit-${props.form}-form`} type="submit">
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};
