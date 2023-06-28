import { getFullName } from "../../helpers";
import { Course } from "../../models/Course";
import { CourseCard } from "./CourseCard";
import "../../styles/CardList.css";

interface Props {
  data: Course[];
  onClick?: any;
}

export const CourseCardList: React.FunctionComponent<Props> = (props) => {
  const renderCard = (course: Course, key: number) => (
    <CourseCard
      onClick={props.onClick}
      id={course._id?.toString()}
      key={key}
      header={course.name}
      courseNumber={course.number}
      courseSubject={course.subject}
      courseTeacher={getFullName(course.teacher, "firstName", "lastName")}
    />
  );

  return (
    <div className="card-list courses-card-list">
      {props.data.map(renderCard)}
    </div>
  );
};
