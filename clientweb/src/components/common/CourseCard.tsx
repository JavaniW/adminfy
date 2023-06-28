import "../../styles/CourseCard.css";

interface Props {
  id?: string;
  _key?: number;
  onClick?: any;
  header: string;
  courseNumber: string | number;
  courseSubject: string;
  courseTeacher: string;
  courseStudentCount?: string;
}

export const CourseCard: React.FunctionComponent<Props> = (props) => {
  return (
    <div
      key={props._key}
      data-id={props.id}
      className="card course-card"
      onClick={props.onClick}
    >
      <span className="card--header course-card--header">
        <h3>{props.header + ` (${props.courseNumber})`}</h3>
      </span>
      <span className="course-card--course-subject">
        <p>Subject: {props.courseSubject}</p>
      </span>
      <span className="course-card--course-teacher">
        <p>Teacher: {props.courseTeacher}</p>
      </span>
      <span className="course-card--course-student-count">
        <p>{props.courseStudentCount ?? 0 + " Students"}</p>
      </span>
    </div>
  );
};
