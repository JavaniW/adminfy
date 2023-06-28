import { getFullName } from "../../helpers";
import { Student } from "../../models/Student";
import { StudentCard } from "./StudentCard";
import "../../styles/CardList.css";

interface Props {
  data: Student[];
  filter?: (x: any) => boolean;
  onClick?: any;
}

export const StudentCardList: React.FunctionComponent<Props> = (props) => {
  const _data = props.filter ? props.data.filter(props.filter) : props.data;

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
    <div className="card-list students-card-list">{_data.map(renderCard)}</div>
  );
};
