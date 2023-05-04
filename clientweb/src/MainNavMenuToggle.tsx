import { useState } from "react";
import { MainNavMenu } from "./MainNavMenu";

export function MainNavMenuToggle() {
    const [ menuVisible, setMenuVisible ] = useState(false);

    function onClick() {
        setMenuVisible(!menuVisible);
    }

    return (
        <>
            <li onClick={onClick}>
                <img
                    className="adminfy-main-nav-hamburger-icon"
                    src={`/icons8-menu-24.png`}
                    alt="hamburger menu"
                />
            </li>
            {menuVisible && <MainNavMenu />}
        </>
    );
}