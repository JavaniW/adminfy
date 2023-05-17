import "../../styles/AddEditModal.css";
import "../../styles/CoursesPage.css";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import CourseApi from "../../api/courseApi";
import { CourseSubjects } from "../../enums/CourseSubject";
import { nameof } from "../../extensions";
import { useModalHooks } from "../../hooks/customHooks";
import { Course } from "../../models/Course";
import { DynamicSelect, option } from "../common/DynamicSelect";
import Modal from "../common/Modal";
import { Header, TableList } from "../common/TableList";
import { AddEditCourseForm } from "./AddEditCourseForm";

export function CoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState<keyof Course | "All">(
    "All"
  );
  const [showSubject, setShowSubject] = useState<boolean>(true);
  const [openModal, setOpenModal, closeModal] = useModalHooks();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course>();
  const [edit, setEdit] = useState<boolean>(false);

  const loadData = useCallback(() => {
    CourseApi.getCourses().then((results) => {
      const _courses = results.map((x: Course) => x as Course);
      setCourses(_courses);
    });
  }, []);

  function handleSelectChange({ value }: { value: string }) {
    setSelectedSubject(value as keyof Course | "All");
    setShowSubject(value === "All");
  }

  const handleAfterCloseModal = useCallback(() => {
    loadData();
    setSelectedCourse(undefined);
    setEdit(false);
  }, [loadData]);

  function handleAfterSubmit() {
    setOpenModal(false);
    loadData();
  }

  useEffect(loadData, [loadData]);

  const handleListItemClick = useCallback(
    (event: SyntheticEvent<HTMLTableElement>) => {
      const studentToEdit = courses.find(
        (x) => x._id === event.currentTarget.dataset!.id
      );
      setEdit(true);
      setSelectedCourse(studentToEdit);
      setOpenModal(true);
    },
    [setOpenModal, courses]
  );

  const headers: Header<Course>[] = [
    {
      label: "Course Number",
      referenceData: (x: Course) => x.number,
    },
    {
      label: "Subject",
      referenceData: (x: Course) => x.subject,
      show: () => showSubject,
    },
    {
      label: "Teacher",
      referenceData: (x: Course) =>
        `${x.teacher.firstName} ${x.teacher.lastName}`,
    },
    {
      label: "Students Enrolled",
      referenceData: (x: Course) => (x.students ? x.students.length : 0),
    },
  ];

  const options: option[] = [
    {
      label: "All",
      value: "All",
    },
    ...CourseSubjects.map((x) => ({ label: x, value: x })),
  ];

  return (
    <div className="courses-page">
      <DynamicSelect
        name="Subject"
        value={selectedSubject}
        arrayOfOptions={options}
        label={"Subject"}
        onSelectChange={handleSelectChange}
      />
      <button onClick={() => setOpenModal(true)} className="add-course-button">
        <p>New Course</p>
      </button>
      {openModal && (
        <Modal
          header="Add Course"
          requestClose={closeModal}
          onAfterClose={handleAfterCloseModal}
        >
          <AddEditCourseForm
            edit={edit}
            course={selectedCourse}
            onAfterSubmit={handleAfterSubmit}
          />
        </Modal>
      )}
      <div className="table-list-page">
        <TableList
          onClick={handleListItemClick}
          key={nameof<Course>("_id")}
          data={courses}
          headers={headers}
          filterSource={nameof<Course>("subject")}
          filterValue={selectedSubject}
        />
      </div>
    </div>
  );
}
