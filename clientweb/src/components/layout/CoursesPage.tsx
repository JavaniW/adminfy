import "../../styles/AddEditModal.css";

import { SyntheticEvent, useCallback, useState } from "react";

import { CourseSubjects } from "../../enums/CourseSubject";
import { nameof } from "../../extensions";
import { useModalHooks } from "../../hooks/customHooks";
import { Course } from "../../models/Course";
import { useGetCoursesQuery, useGetTeachersQuery } from "../../redux/apiSlice";
import { DynamicSelect, option } from "../common/DynamicSelect";
import Modal from "../common/Modal";
import { Spinner } from "../common/Spinner";
import { Header, TableList } from "../common/TableList";
import { AddEditCourseForm } from "./AddEditCourseForm";
import { AddModelButton } from "../common/AddModelButton";
import { TableListMenu } from "../common/TableListMenu";

export const CoursesPage: React.FunctionComponent = () => {
  const [selectedSubject, setSelectedSubject] = useState<keyof Course | "All">(
    "All"
  );
  const [showSubject, setShowSubject] = useState<boolean>(true);
  const [openModal, setOpenModal, closeModal] = useModalHooks();
  const [selectedCourse, setSelectedCourse] = useState<Course>();
  const [edit, setEdit] = useState<boolean>(false);
  const { data: courses, isLoading: isLoadingCourses } = useGetCoursesQuery();
  const { data: teachers, isLoading: isLoadingTeachers } =
    useGetTeachersQuery();

  const handleSelectChange = ({ value }: { value: string }) => {
    setSelectedSubject(value as keyof Course | "All");
    setShowSubject(value === "All");
  };

  const handleAfterCloseModal = useCallback(() => {
    setSelectedCourse(undefined);
    setEdit(false);
  }, []);

  const handleAfterSubmit = () => {
    setOpenModal(false);
  };

  const handleListItemClick = useCallback(
    (event: SyntheticEvent<HTMLTableElement>) => {
      const studentToEdit = courses!.find(
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
    <>
      <TableListMenu>
        <DynamicSelect
          disabled={isLoadingCourses}
          name="Subject"
          value={selectedSubject}
          arrayOfOptions={options}
          label={"Subject"}
          onSelectChange={handleSelectChange}
        />
        <AddModelButton
          disabled={isLoadingCourses}
          model="course"
          onClick={() => setOpenModal(true)}
        >
          <p>New Course</p>
        </AddModelButton>
      </TableListMenu>
      {openModal && (
        <Modal
          header="Add Course"
          requestClose={closeModal}
          onAfterClose={handleAfterCloseModal}
        >
          {isLoadingTeachers ? (
            <Spinner />
          ) : (
            <AddEditCourseForm
              teachers={teachers!}
              edit={edit}
              course={selectedCourse}
              onAfterSubmit={handleAfterSubmit}
            />
          )}
        </Modal>
      )}
      <div className="table-list">
        {isLoadingCourses && <Spinner />}
        {courses && (
          <TableList
            onClick={handleListItemClick}
            key={nameof<Course>("_id")}
            data={courses}
            headers={headers}
            filterSource={nameof<Course>("subject")}
            filterValue={selectedSubject}
          />
        )}
      </div>
    </>
  );
};
