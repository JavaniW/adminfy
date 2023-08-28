import "../../styles/AdminfyNav.css";

import { Link, Outlet } from "react-router-dom";

import { ScreenSize } from "../../enums/ScreenSize";
import { useScreenSize } from "../../hooks/customHooks";
import { Dropdown } from "../common/Dropdown";
import { Nav } from "../common/Nav";

interface Props {
  navItemOptions: string[];
}

export const AdminfyNav: React.FunctionComponent<Props> = (props) => {
  const screenSize: ScreenSize = useScreenSize();
  const isMobile: boolean = screenSize < ScreenSize.Small;

  const menuIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="#000000"
      viewBox="0 0 256 256"
    >
      <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
    </svg>
  );

  const menu = [
    <Link to={"/teachers"}>Teachers</Link>,
    <Link to={"/courses"}>Courses</Link>,
    <Link to={"/students"}>Students</Link>,
  ];

  return (
    <>
      <nav className="adminfy-main-nav">
        <Link className="adminfy-main-nav-logo" to={"/"}>
          <h1>ADMINFY</h1>
        </Link>
        {!isMobile && <Nav />}
        {isMobile && <Dropdown trigger={menuIcon} menu={menu} />}
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};
