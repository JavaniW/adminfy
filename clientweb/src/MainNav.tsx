import { Link } from "react-router-dom";
import "./styles/MainNav.css";

interface MainNavProps {
  navItemOptions: string[];
}

const isMobile: boolean = true;

export function MainNav(props: MainNavProps) {
  return (
    <nav className="adminfy-main-nav">
      <ul className="adminfy-main-nav-items">
        {!isMobile && (
          <>
            <Link className="adminfy-main-nav-item" to={"/"}>
              Home
            </Link>
            <Link className="adminfy-main-nav-item" to={"/"}>
              Administration
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
          <img
            className="adminfy-main-nav-hamburger-icon"
            src={`/icons8-menu-24.png`}
            alt="hamburger menu"
          />
        </li>
      </ul>
    </nav>
  );
}
