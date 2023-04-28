import { Link } from "react-router-dom";
// import { useOutsideClick } from "./hooks/customHooks";
// import { useState } from "react";

/*interface MainNavMenuProps {
    visible: boolean;
}*/

export function MainNavMenu(props : any) {
    // const [visible, setVisible] = useState(props.visible);

    /*function handleClickOutside() {
        setVisible(false);
    }

    const ref = useOutsideClick(handleClickOutside);*/

    return (
        <ul className={`adminfy-main-nav-menu`}>
            <li className="adminfy-main-nav-item">
                <Link to={"/faculty"}>
                Falculty
                </Link>
            </li>
            <li className="adminfy-main-nav-item">
                <Link to={"/"}>
                Courses
                </Link>
            </li>
            <li className="adminfy-main-nav-item">
                <Link to={"/"}>
                Students
                </Link>
            </li>
        </ul>
    );
}