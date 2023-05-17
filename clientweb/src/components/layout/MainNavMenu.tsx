import { Link } from 'react-router-dom';

export const MainNavMenu : React.FunctionComponent = () => {

    return (
        <ul className={`adminfy-main-nav-menu`}>
            <li className="adminfy-main-nav-item">
                <Link to={"/teacher"}>
                Falculty
                </Link>
            </li>
            <li className="adminfy-main-nav-item">
                <Link to={"/courses"}>
                Courses
                </Link>
            </li>
            <li className="adminfy-main-nav-item">
                <Link to={"/students"}>
                Students
                </Link>
            </li>
        </ul>
    );
}