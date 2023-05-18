import "../../styles/Dropdown.css";

import React, { ReactElement, useState } from "react";

interface Props {
  trigger: ReactElement;
  menu: any[];
}

export const Dropdown: React.FunctionComponent<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <div className="dropdown">
      {React.cloneElement(props.trigger, {
        onClick: handleOpen,
      })}
      {open && (
        <ul className="dropdown-menu">
          {props.menu.map((menuItem, idx) => (
            <li className="dropdown-item" key={idx}>
              {React.cloneElement(menuItem, {
                onClick: () => {
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
