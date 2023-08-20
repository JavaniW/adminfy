import { PropsWithChildren } from "react";
import "../../styles/FlexGridLayout.css";

interface Props {}

export const FlexGridLayout: React.FunctionComponent<
  PropsWithChildren<Props>
> = (props) => {
  return <div className="main-layout">{props.children}</div>;
};

export default FlexGridLayout;
