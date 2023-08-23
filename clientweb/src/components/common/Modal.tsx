import { PropsWithChildren, useEffect } from "react";
import "../../styles/Modal.css";

interface Props {
  requestClose: () => void;
  onAfterClose?: Function;
  header: string;
  isMobile: boolean;
}

export const Modal: React.FunctionComponent<PropsWithChildren<Props>> = (
  props
) => {
  const { onAfterClose } = props;

  useEffect(() => {
    return () => {
      if (onAfterClose) onAfterClose();
    };
  }, [onAfterClose]);

  if (!props.isMobile) return null;

  return (
    <div className="modal-container" onClick={props.requestClose}>
      <div className={`modal`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
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
