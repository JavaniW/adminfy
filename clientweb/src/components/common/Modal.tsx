import { PropsWithChildren, useEffect } from "react";
import "../../styles/Modal.css";

interface Props {
  requestClose: () => void;
  onAfterClose: (...params: any) => any;
  header: string;
}

export const Modal: React.FunctionComponent<PropsWithChildren<Props>> = (
  props
) => {
  const { onAfterClose } = props;
  useEffect(() => {
    return () => onAfterClose();
  }, [onAfterClose]);

  return (
    <div className="modal-container" onClick={props.requestClose}>
      <div className={`modal`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h1 className="modal-header-label">{props.header}</h1>
          <img
            className="close-modal-icon"
            src="./close.png"
            alt="close modal"
            onClick={props.requestClose}
          />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
