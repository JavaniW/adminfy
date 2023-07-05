import "../../styles/MainNav.css";

import { Link, Outlet } from "react-router-dom";

import { Dropdown } from "../common/Dropdown";

interface Props {
  navItemOptions: string[];
}

const isMobile: boolean = true;

export const MainNav: React.FunctionComponent<Props> = (props) => {
  const dropdownIcon = (
    <img
      className="adminfy-main-nav-hamburger-icon"
      src={`/icons8-menu-24.png`}
      alt="hamburger menu"
    />
  );

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
    <Link to={"/teacher"}>Teachers</Link>,
    <Link to={"/courses"}>Courses</Link>,
    <Link to={"/students"}>Students</Link>,
  ];

  return (
    <>
      <nav className="adminfy-main-nav">
        <ul className="adminfy-main-nav-list">
          {!isMobile && (
            <>
              <Link className="adminfy-main-nav-item" to={"/"}>
                Teachers
              </Link>
              <Link className="adminfy-main-nav-item" to={"/"}>
                Courses
              </Link>
              <Link className="adminfy-main-nav-item" to={"/"}>
                Settings
              </Link>
            </>
          )}
          <li>
            <Link className="adminfy-main-nav-logo" to={"/"}>
              <h1>ADMINFY</h1>
            </Link>
          </li>
          <li>
            <Dropdown trigger={menuIcon} menu={menu} />
          </li>
        </ul>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};
