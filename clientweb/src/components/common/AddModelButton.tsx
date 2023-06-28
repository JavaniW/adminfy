import { Children, PropsWithChildren } from "react";
import "../../styles/AddModelButton.css";

interface Props {
  disabled: boolean;
  model: string;
  onClick: () => void;
}

export const AddModelButton: React.FunctionComponent<
  PropsWithChildren<Props>
> = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={`add-model-button add-${props.model}-button`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};