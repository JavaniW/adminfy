import { PropsWithChildren } from "react";
import "../../styles/Nav.css";
import StyleLink from "./StyledLink";

export const Nav: React.FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <div className="nav">
      <StyleLink className="nav-item" to={"/teachers"}>
        <h3>Teachers</h3>
      </StyleLink>
      <StyleLink className="nav-item" to={"/courses"}>
        <h3>Courses</h3>
      </StyleLink>
      <StyleLink className="nav-item" to={"/students"}>
        <h3>Students</h3>
      </StyleLink>
    </div>
  );
};
