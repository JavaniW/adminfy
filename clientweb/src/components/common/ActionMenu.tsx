import { SyntheticEvent, useCallback, useState } from "react";
import "../../styles/ActionMenu.css";
import { relative } from "path";

interface ActionMenuProps {
  actions: Action[];
}

export interface Action {
  label: string;
  action: () => any;
}

export function ActionMenu(props: ActionMenuProps) {
  const [showActionMenu, setShowActionMenu] = useState<boolean>(false);

  const openActionMenu = useCallback(() => {
    console.log("Clicked open button");
    setShowActionMenu(true);
    console.log(showActionMenu);
  }, [showActionMenu]);

  return (
    <>
      <th>
        <div className="action-menu">
          <img
            onClick={openActionMenu}
            className="action-menu-icon"
            src="./ellipsis.png"
            alt="ellipsis"
          ></img>
        </div>
        {showActionMenu && (
          <div
            style={{
              position: "absolute",
              width: "50px",
              left: "320px",
              top: "24px",
              height: "100px",
              backgroundColor: "red",
              zIndex: "1",
            }}
          >
            <ul style={{ display: "block", height: "200px" }}>
              {props.actions.map((x, idx) => (
                <li onClick={x.action} key={idx}>
                  {x.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </th>
    </>
  );
}
