import { getFullName } from "../../helpers";
import { Teacher } from "../../models/Teacher";
import { TeacherCard } from "./TeacherCard";
import "../../styles/CardList.css";

interface Props {
  data: Teacher[];
  onClick?: any;
}

export const TeacherCardList: React.FunctionComponent<Props> = (props) => {
  if (props.data.length < 1) {
    return <h4>No teachers. Please add a teacher to see teachers.</h4>;
  }

  const renderCard = (teacher: Teacher, key: number) => (
    <TeacherCard
      onClick={props.onClick}
      id={teacher._id?.toString()}
      key={key}
      header={getFullName(teacher, "firstName", "lastName")}
      teacherSubject={teacher.subject}
      teacherGrade={teacher.grade}
    />
  );

  return (
    <div className="card-list teachers-card-list">
      {props.data.map(renderCard)}
    </div>
  );
};
