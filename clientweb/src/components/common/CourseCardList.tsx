import { getFullName } from "../../helpers";
import { Course } from "../../models/Course";
import "../../styles/CardList.css";
import { CourseCard } from "./CourseCard";

interface Props {
  data: Course[];
  onClick?: any;
}

export const CourseCardList: React.FunctionComponent<Props> = (props) => {
  if (props.data.length < 1) {
    return <h4>No courses. Please add a course to see courses.</h4>;
  }

  const renderCard = (course: Course, key: number) => (
    <CourseCard
      onClick={props.onClick}
      id={course._id?.toString()}
      key={key}
      header={course.name}
      courseSymbol={course.symbol}
      courseSubject={course.subject}
      courseTeacher={getFullName(course.teacher, "firstName", "lastName")}
      courseStudentCount={course.students.length}
    />
  );

  return (
    <div className="card-list courses-card-list">
      {props.data.map(renderCard)}
    </div>
  );
};
