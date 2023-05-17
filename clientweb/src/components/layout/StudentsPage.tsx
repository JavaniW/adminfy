import "../../styles/TableList.css";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import StudentApi from "../../api/studentApi";
import {
  GradeLevels,
  GradeLevelType,
} from "../../enums/GradeLevel";
import { nameof } from "../../extensions";
import { useModalHooks } from "../../hooks/customHooks";
import Student from "../../models/Student";
import { Action } from "../common/ActionMenu";
import { DynamicSelect, option } from "../common/DynamicSelect";
import Modal from "../common/Modal";
import { Header, TableList } from "../common/TableList";
import { AddEditStudentForm } from "./AddEditStudentForm";

export function StudentsPage() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelType | "All">(
    "All"
  );
  const [showGrade, setShowGrade] = useState<boolean>(true);
  const [openModal, setOpenModal, closeModal] = useModalHooks();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student>();
  const [edit, setEdit] = useState<boolean>(false);

  function handleSelectChange({ value }: { value: string }) {
    setSelectedGrade(value as GradeLevelType | "All");
    setShowGrade(value === "All");
  }

  const loadData = useCallback(() => {
    StudentApi.getStudents().then((results) => {
      const _students = results.map((x: Student) => x as Student);
      setStudents(_students);
    });
  }, []);

  const handleAfterCloseModal = useCallback(() => {
    loadData();
    setSelectedStudent(undefined);
    setEdit(false);
  }, [loadData]);

  useEffect(loadData, [loadData]);

  const handleAfterSubmit = useCallback(() => {
    closeModal();
    loadData();
  }, [closeModal, loadData]);

  const actions: Action[] = [
    {
      label: "edit",
      action: () => alert("You want to edit"),
    },
    {
      label: "delete",
      action: () => alert("You want to delete"),
    },
  ];

  const headers: Header<Student>[] = [
    {
      label: "First Name",
      referenceData: (x: Student) => x.firstName,
    },
    {
      label: "Last Name",
      referenceData: (x: Student) => x.lastName,
    },
    {
      label: "Birth Date",
      referenceData: (x: Student) => x.dateOfBirth,
    },
    {
      label: "Grade Level",
      referenceData: (x: Student) => x.gradeLevel,
      show: () => showGrade,
    },
  ];

  const studentGradeOptions: option[] = [
    {
      label: "All",
      value: "All",
    },
    ...GradeLevels.map((x) => ({ label: x, value: x })),
  ];

  const handleListItemClick = useCallback(
    (event: SyntheticEvent<HTMLTableElement>) => {
      const studentToEdit = students.find(
        (x) => x._id === event.currentTarget.dataset!.id
      );
      setEdit(true);
      setSelectedStudent(studentToEdit);
      setOpenModal(true);
    },
    [setOpenModal, students]
  );

  return (
    <div className="students-page">
      <DynamicSelect
        value={selectedGrade}
        name="Grade Level"
        label={"Grade Level"}
        onSelectChange={handleSelectChange}
        arrayOfOptions={studentGradeOptions}
      />
      <button onClick={() => setOpenModal(true)} className="add-student-button">
        <p>New Student</p>
      </button>
      {openModal && (
        <Modal
          header={"Add Student"}
          requestClose={closeModal}
          onAfterClose={handleAfterCloseModal}
        >
          <AddEditStudentForm
            student={selectedStudent}
            onAfterSubmit={handleAfterSubmit}
            edit={edit}
          />
        </Modal>
      )}
      <div className="table-list-page">
        <TableList
          onClick={handleListItemClick}
          key={nameof<Student>("_id")}
          data={students}
          headers={headers}
          filterSource={nameof<Student>("gradeLevel")}
          filterValue={selectedGrade}
          actions={actions}
        />
      </div>
    </div>
  );
}
