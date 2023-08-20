import { PropsWithChildren } from "react";
import "../../styles/AddEditPanel.css";

interface Props {
  header: string;
}

export const AddEditPanel: React.FunctionComponent<PropsWithChildren<Props>> = (
  props
) => {
  return (
    <div className="add-edit-panel">
      <h1 className="add-edit-panel-header">{props.header}</h1>
      {props.children}
    </div>
  );
};
