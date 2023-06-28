import "../../styles/TableList.css";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import { GradeLevels, GradeLevelType } from "../../enums/GradeLevel";
import { nameof } from "../../extensions";
import { useModalHooks } from "../../hooks/customHooks";
import Student from "../../models/Student";
import { useGetStudentsQuery } from "../../redux/apiSlice";
import { Action } from "../common/ActionMenu";
import { DynamicSelect, option } from "../common/DynamicSelect";
import Modal from "../common/Modal";
import { Spinner } from "../common/Spinner";
import { Header, TableList } from "../common/TableList";
import { AddEditStudentForm } from "./AddEditStudentForm";
import { TableListMenu } from "../common/TableListMenu";
import { AddModelButton } from "../common/AddModelButton";
import { paginate } from "../../helpers";
import PrevNextButtons from "../common/PrevNextButtons";
import { Pagination } from "../../models/Misc";

export const StudentsPage: React.FunctionComponent = () => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelType | "All">(
    "All"
  );
  const [showGrade, setShowGrade] = useState<boolean>(true);
  const [openModal, setOpenModal, closeModal] = useModalHooks();
  const [selectedStudent, setSelectedStudent] = useState<Student>();
  const [edit, setEdit] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pagination, setPagination] = useState<Pagination<Student>>({
    data: [],
    hasPrevOrNext: { prevDisabled: false, nextDisabled: false },
  });
  const { data: students, isLoading, isSuccess } = useGetStudentsQuery();

  useEffect(() => {
    if (isSuccess) {
      setPagination(paginate(students, page));
    }
  }, [isSuccess, page, students]);

  const handleSelectChange = ({ value }: { value: string }) => {
    setSelectedGrade(value as GradeLevelType | "All");
    setShowGrade(value === "All");
  };

  const handleAfterCloseModal = useCallback(() => {
    setSelectedStudent(undefined);
    setEdit(false);
  }, []);

  const handleAfterSubmit = useCallback(() => {
    closeModal();
  }, [closeModal]);

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
      const studentToEdit = students!.find(
        (x) => x._id === event.currentTarget.dataset!.id
      );
      setEdit(true);
      setSelectedStudent(studentToEdit);
      setOpenModal(true);
    },
    [setOpenModal, students]
  );

  return (
    <>
      <TableListMenu>
        <DynamicSelect
          disabled={isLoading}
          value={selectedGrade}
          name="Grade Level"
          label={"Grade Level"}
          onSelectChange={handleSelectChange}
          arrayOfOptions={studentGradeOptions}
        />
        <AddModelButton
          disabled={isLoading}
          model="student"
          onClick={() => setOpenModal(true)}
        >
          <p>New Student</p>
        </AddModelButton>
      </TableListMenu>
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
      <div className="table-list">
        {isLoading && <Spinner />}
        {students && (
          <TableList
            onClick={handleListItemClick}
            key={nameof<Student>("_id")}
            data={pagination.data}
            headers={headers}
            filterSource={nameof<Student>("gradeLevel")}
            filterValue={selectedGrade}
            actions={actions}
          />
        )}
      </div>
      <PrevNextButtons
        page={page}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        disabled={pagination.hasPrevOrNext}
      />
    </>
  );
};
