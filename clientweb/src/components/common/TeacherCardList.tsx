import { getFullName } from "../../helpers";
import { Teacher } from "../../models/Teacher";
import { TeacherCard } from "./TeacherCard";
import "../../styles/CardList.css";

interface Props {
  data: Teacher[];
  filter?: (x: any) => boolean;
  onClick?: any;
}

export const TeacherCardList: React.FunctionComponent<Props> = (props) => {
  const _data = props.filter ? props.data.filter(props.filter) : props.data;

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
    <div className="card-list teachers-card-list">{_data.map(renderCard)}</div>
  );
};
