import { Course } from "./models/Course";

interface CourseListProps {
  showSubject: boolean;
  courses: Course[];
  subject: string | undefined;
}

export function CourseList(props: CourseListProps) {
  return (
    <>
      {props.courses
        .filter((x) => x.subject === props.subject || props.subject === "all")
        .map((x, idx) => (
          <table key={idx} className="courses-list-item">
            <thead>
              <th>Course Number</th>
              {props.showSubject && <th>Subject</th>}
              <th>Teacher</th>
              <th>Enrolled</th>
            </thead>
            <tbody>
              <tr>
                <td>{x.courseNumber.toString()}</td>
                {props.showSubject && <td>{x.subject}</td>}
                <td>{x.teacher}</td>
                <td>{"24"}</td>
              </tr>
            </tbody>
          </table>
        ))}
    </>
  );
}
