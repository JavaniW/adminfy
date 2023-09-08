import "../../styles/Dropdown.css";

import React, { ReactElement } from "react";

interface Props {
  trigger: ReactElement;
  menu: any[];
  setOpen: Function;
  open: boolean;
}

export const Dropdown: React.FunctionComponent<Props> = (props) => {
  function handleOpen() {
    props.setOpen(true);
  }

  return (
    <div className="dropdown">
      {React.cloneElement(props.trigger, {
        onClick: handleOpen,
      })}
      {props.open && (
        <ul className="dropdown-menu">
          {props.menu.map((menuItem, idx) => (
            <li className="dropdown-item" key={idx}>
              {React.cloneElement(menuItem, {
                onClick: () => {
                  props.setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
