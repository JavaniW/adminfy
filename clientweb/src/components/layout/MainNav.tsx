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

  const menu = [
    <Link to={"/teacher"}>Teacher</Link>,
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
                Teacher
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
            <Dropdown trigger={dropdownIcon} menu={menu} />
          </li>
        </ul>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};
