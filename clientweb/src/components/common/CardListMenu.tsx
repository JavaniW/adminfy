import { PropsWithChildren } from "react";

export const CardListMenu: React.FunctionComponent<PropsWithChildren> = (
  props
) => {
  return <div className="table-list-menu">{props.children}</div>;
};
