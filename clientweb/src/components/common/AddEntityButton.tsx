import { PropsWithChildren } from "react";

interface Props {
  disabled: boolean;
  model: string;
  onClick: () => void;
}

export const AddEntityButton: React.FunctionComponent<
  PropsWithChildren<Props>
> = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={`add-entity-button add-${props.model}-button`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
