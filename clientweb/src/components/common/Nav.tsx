import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import "../../styles/Nav.css";

interface Props {}

export const Nav: React.FunctionComponent<PropsWithChildren<Props>> = (
  props
) => {
  return (
    <div className="nav">
      <Link className="nav-item" to={"/teachers"}>
        Teachers
      </Link>
      <Link className="nav-item" to={"/courses"}>
        Courses
      </Link>
      <Link className="nav-item" to={"/students"}>
        Students
      </Link>
    </div>
  );
};
