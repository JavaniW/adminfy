import "../../styles/StudentCard.css";

interface Props {
  id?: string;
  key?: number;
  header: string;
  studentBirthDay: string;
  studentGrade: string;
}

export const StudentCard: React.FunctionComponent<Props> = (props) => {
  return (
    <div key={props.key} id={props.id} className="student-card">
      <span className="student-card--header">
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
