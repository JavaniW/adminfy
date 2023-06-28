import "../../styles/Dashboard.css";
import { TeacherCard } from "../common/TeacherCard";
import { CourseCard } from "../common/CourseCard";
import { StudentCard } from "../common/StudentCard";

export const Dashboard: React.FunctionComponent = () => {
  return (
    <div className="main-dashboard">
      <h1>Welcome, Person!</h1>
      <img className="main-user-pic" src="/spongebob.png" alt=" of user" />
      <h2 className="dash-announcements-header">Important Announcements</h2>
      <p className="dash-announcements-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        porta velit urna, nec imperdiet felis eleifend ultricies. Nullam eu
        mauris ex. Sed id cursus magna, sit amet pharetra odio. Pellentesque at
        tortor non neque malesuada pharetra sed nec nunc. Nulla sit amet diam ac
        metus convallis rhoncus ut nec nulla. Sed lobortis lorem dui, vitae
        semper nisl ullamcorper a. Aliquam eleifend varius lacinia. Curabitur
        vitae ipsum in risus efficitur commodo.
      </p>
      <TeacherCard
        image="sjwsw"
        header="Person Long Name"
        teacherSubject="History"
        teacherGrade="11"
      />
      <CourseCard
        header="Intro to Science"
        courseNumber="1321"
        courseSubject="Science"
        courseTeacher="Rich Timmy"
      />
      <StudentCard
        header="Josh William"
        studentBirthDay="03/05/2002"
        studentGrade="11"
      />
    </div>
  );
};

export default Dashboard;
