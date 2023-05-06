import { useEffect, useState } from "react";
import { CourseSubject, CourseSubjects } from "../../enums/CourseSubject";
import { Course } from "../../models/Course";
import { Header, TableList } from "../common/TableList";
import { nameof } from "../../extensions";
import { Select } from "../common/Select";
import "../../styles/CoursesPage.css";

export function CoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState<keyof Course | "All">(
    "All"
  );
  const [showSubject, setShowSubject] = useState<boolean>(true);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSubject(event.target.value as keyof Course | "All");
    setShowSubject(event.target.value === "All");
  }

  function handleClick() {
    setOpenDrawer(true);
  }

  const courses: Course[] = [
    {
      courseNumber: 1234,
      subject: CourseSubject.Science,
      teacher: "Mr. James",
      enrolled: 24,
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.Math,
      teacher: "Mr. James",
      enrolled: 24,
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.English,
      teacher: "Mr. James",
      enrolled: 24,
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.Math,
      teacher: "Mr. James",
      enrolled: 24,
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.English,
      teacher: "Mr. James",
      enrolled: 24,
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.History,
      teacher: "Mr. James",
      enrolled: 24,
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.SocialStudies,
      teacher: "Mr. James",
      enrolled: 24,
    },
    {
      courseNumber: 1234,
      subject: CourseSubject.Science,
      teacher: "Mr. Burke",
      enrolled: 24,
    },
  ];

  const headers: Header<Course>[] = [
    {
      headerLabel: "Course Number",
      isOptional: false,
      referenceData: "courseNumber",
    },
    {
      headerLabel: "Subject",
      isOptional: true,
      dependentValue: showSubject,
      referenceData: "subject",
    },
    {
      headerLabel: "Teacher",
      isOptional: false,
      referenceData: "teacher",
    },
    {
      headerLabel: "Enrolled",
      isOptional: false,
      referenceData: "enrolled",
    },
  ];

  return (
    <div className="courses-page">
        <Select default={"All"} options={CourseSubjects} label={"Subject"} onChange={handleSelectChange} />
        <button onClick={handleClick} className="add-course-button"><p>New Course</p></button>
        <div className="table-list-page">
        <TableList
          data={courses}
          headers={headers}
          filterSource={nameof<Course>("subject")}
          filterValue={selectedSubject}
        />
       </div>
    </div>
  );
}
