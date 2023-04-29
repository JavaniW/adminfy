import { Link, Outlet } from "react-router-dom";
import "./styles/MainNav.css";
import { MainNavMenuToggle } from "./MainNavMenuToggle";

interface MainNavProps {
  navItemOptions: string[];
}

const isMobile: boolean = true;

export function MainNav(props: MainNavProps) {
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
        <MainNavMenuToggle />
      </ul>
    </nav>
    <Outlet />
    </>
  );
}
