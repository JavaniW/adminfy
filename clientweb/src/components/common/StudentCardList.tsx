import { getFullName } from "../../helpers";
import { Student } from "../../models/Student";
import { StudentCard } from "./StudentCard";
import "../../styles/CardList.css";

interface Props {
  data: Student[];
  onClick?: any;
}

export const StudentCardList: React.FunctionComponent<Props> = (props) => {
  if (props.data.length < 1) {
    return <h4>No students. Please add a student to see students.</h4>;
  }

  const renderCard = (student: Student, key: number) => (
    <StudentCard
      onClick={props.onClick}
      id={student._id?.toString()}
      key={key}
      header={getFullName(student, "firstName", "lastName")}
      studentBirthDay={student.dateOfBirth}
      studentGrade={student.gradeLevel}
    />
  );

  return (
    <div className="card-list students-card-list">
      {props.data.map(renderCard)}
    </div>
  );
};
