import { PropsWithChildren } from "react";

export const TableListMenu: React.FunctionComponent<PropsWithChildren> = (
  props
) => {
  return <div className="table-list-menu">{props.children}</div>;
};
