import "../../styles/StudentCard.css";

interface Props {
  id?: string;
  key?: number;
  onClick?: any;
  header: string;
  studentBirthDay: string;
  studentGrade: string;
}

export const StudentCard: React.FunctionComponent<Props> = (props) => {
  return (
    <div
      onClick={props.onClick}
      key={props.key}
      data-id={props.id}
      className="card student-card"
    >
      <span className="card--header student-card--header">
        <h3>{props.header}</h3>
      </span>
      <span className="student-card--student-birthday">
        <p>DOB: {props.studentBirthDay}</p>
      </span>
      <span className="student-card--student-grade">
        <p>Grade: {props.studentGrade}</p>
      </span>
    </div>
  );
};
