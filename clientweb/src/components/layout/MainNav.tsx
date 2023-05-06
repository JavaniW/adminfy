import { Link, Outlet } from "react-router-dom";
import "../../styles/MainNav.css";
import { Dropdown } from "../common/Dropdown";

interface MainNavProps {
  navItemOptions: string[];
}

const isMobile: boolean = true;

export function MainNav(props: MainNavProps) {

  const dropdownIcon = <img
          className="adminfy-main-nav-hamburger-icon"
          src={`/icons8-menu-24.png`}
          alt="hamburger menu"
  />;

  const menu = [
    <Link to={"/faculty"}>
      Faculty
    </Link>,
    <Link to={"/courses"}>
      Courses
    </Link>,
    <Link to={"/students"}>
      Students
    </Link>
  ];

  return (
    <>
      <nav className="adminfy-main-nav">
        <ul className="adminfy-main-nav-list">
          {!isMobile && (
            <>
              <Link className="adminfy-main-nav-item" to={"/"}>
                Faculty
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
}
