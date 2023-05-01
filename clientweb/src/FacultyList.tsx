import { FacultyListItem } from "./FacultyListItem";
import { Faculty } from "./models/Faculty";

interface FacultyListProps {
  faculty: Faculty[];
}

export function FacultyList(props: FacultyListProps) {
  return (
    <table className="faculty-list">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Subject</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {props.faculty.map((x, idx) => (
          <FacultyListItem key={idx} faculty={x} />
        ))}
      </tbody>
    </table>
  );
}
