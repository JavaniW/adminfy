import CourseSubject, {
  CourseSubject1,
  CourseSubjectType,
} from "../../enums/CourseSubject";
import "../../styles/TeacherCard.css";

interface Props {
  id?: string;
  key?: number;
  image?: string;
  header: string;
  teacherSubject: CourseSubject1;
  teacherGrade: string;
}

export const TeacherCard: React.FunctionComponent<Props> = (props) => {
  return (
    <div key={props.key} id={props.id} className="teacher-card">
      {props.image && (
        <div className="teacher-card--img--container">
          <img className="card-img" src={props.image} alt="pic" />
        </div>
      )}
      <span className="teacher-card--header">
        <h3>{props.header}</h3>
      </span>
      <span className="teacher-card--teacher-subject">
        <p>Subject: {props.teacherSubject}</p>
      </span>
      <span className="teacher-card--teacher-grade">
        <p>Grade: {props.teacherGrade}</p>
      </span>
    </div>
  );
};
