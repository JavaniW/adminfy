import { useEffect, useState } from "react";
import "./styles/CoursesPage.css";
import { CourseSubject } from "./CourseSubject";
import { CourseList } from "./CourseList";
import { Course } from "./models/Course";

export function CoursesPage() {
  // const [courses, setCourses] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [showSubject, setShowSubject] = useState<boolean>(false);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSubject(event.target.value);
  }

  const courses: Course[] = [
    {
      courseNumber: 1234,
      subject: CourseSubject.Science,
      teacher: "Mr. James",
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.Math,
      teacher: "Mr. James",
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.English,
      teacher: "Mr. James",
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.Math,
      teacher: "Mr. James",
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.English,
      teacher: "Mr. James",
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.History,
      teacher: "Mr. James",
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.SocialStudies,
      teacher: "Mr. James",
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.Science,
      teacher: "Mr. Burke",
    },
  ];

  useEffect(() => {
    setShowSubject(selectedSubject === "all" ? true : false);
  }, [selectedSubject]);

  return (
    <div className="courses-page">
      <select
        className="courses-page-select"
        name="subject"
        id="subject"
        onChange={handleSelectChange}
        value={selectedSubject}
      >
        <option key={"all"} value={"all"} selected>
          All
        </option>
        {Object.values(CourseSubject).map((x, idx) => (
          <option key={idx} value={x}>
            {x}
          </option>
        ))}
      </select>
      <CourseList
        showSubject={showSubject}
        subject={selectedSubject}
        courses={courses}
      />
    </div>
  );
}
