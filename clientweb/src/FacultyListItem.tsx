import { Faculty } from "./models/Faculty";

interface FacultyListItemProps {
    faculty: Faculty;
}

export function FacultyListItem(props: FacultyListItemProps) {
    return (
        <tr className="faculty-list-item">
            <td>
                <img className="faculty-list-item-img" src={"/spongebob.png"} alt="faculty"></img>
            </td>
            <td>
                <h2 className="faculty-list-item-name">{props.faculty.name}</h2>
            </td>
            <td>
                <h3>{props.faculty.subject}</h3>
            </td>
            <td>
                <h3>{props.faculty.grade}</h3>
            </td>
        </tr>
    );
}