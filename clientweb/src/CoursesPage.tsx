import { useEffect, useState } from "react";
import "./styles/CoursesPage.css";
import { CourseSubject } from "./CourseSubject";
import { Course } from "./models/Course";
import { Header, TableList } from "./TableList";
import { nameof } from "./extensions";

export function CoursesPage() {

  const [selectedSubject, setSelectedSubject] = useState<keyof Course | "All">("All");
  const [showSubject, setShowSubject] = useState<boolean>(false);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSubject(event.target.value as keyof Course | "All");
  }

  useEffect(() => {
    setShowSubject(selectedSubject === "All");
    console.log("Rendered");
  }, [selectedSubject])

  const courses: Course[] = [
    {
      courseNumber: 1234,
      subject: CourseSubject.Science,
      teacher: "Mr. James",
      enrolled: 24
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.Math,
      teacher: "Mr. James",
      enrolled: 24
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.English,
      teacher: "Mr. James",
      enrolled: 24
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.Math,
      teacher: "Mr. James",
      enrolled: 24
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.English,
      teacher: "Mr. James",
      enrolled: 24
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.History,
      teacher: "Mr. James",
      enrolled: 24
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.SocialStudies,
      teacher: "Mr. James",
      enrolled: 24
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.Science,
      teacher: "Mr. Burke",
      enrolled: 24
    },
  ];

  const headers: Header<Course>[] = [
    {
      headerLabel: "Course Number",
      isOptional: false,
      referenceData: "courseNumber"
    },
    {
      headerLabel: "Subject",
      isOptional: true,
      dependentValue: showSubject,
      referenceData: "subject"
    },
    {
      headerLabel: "Teacher",
      isOptional: false,
      referenceData: "teacher"
    },
    {
      headerLabel: "Enrolled",
      isOptional: false,
      referenceData: "enrolled"
    },
  ]

  return (
    <div className="courses-page">
      <label>
        Subject:
        <select
          className="courses-page-select"
          name="subject"
          id="subject"
          onChange={handleSelectChange}
          value={selectedSubject}
        >
          <option key={"All"} value={"All"} >
            All
          </option>
          {Object.values(CourseSubject).map((x, idx) => (
            <option key={idx} value={x}>
              {x}
            </option>
          ))}
        </select>
      </label>
      <TableList
        data={courses}
        headers={headers}
        filterSource={nameof<Course>("subject")}
        filterValue={selectedSubject}
      />
    </div>
  );
}
