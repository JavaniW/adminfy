import { PropsWithChildren } from "react";
import "../../styles/AdminfyModelList.css";

export const AdminfyModelList: React.FunctionComponent<PropsWithChildren> = (
  props
) => {
  return <div className="adminfy-model-list">{props.children}</div>;
};

export default AdminfyModelList;
