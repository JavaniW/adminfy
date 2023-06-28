import "../../styles/TableList.css";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import { GradeLevels, GradeLevelType } from "../../enums/GradeLevel";
import { paginate } from "../../helpers";
import { useModalHooks } from "../../hooks/customHooks";
import { Pagination } from "../../models/Misc";
import Student from "../../models/Student";
import { useGetStudentsQuery } from "../../redux/apiSlice";
import { AddModelButton } from "../common/AddModelButton";
import { DynamicSelect, option } from "../common/DynamicSelect";
import Modal from "../common/Modal";
import PrevNextButtons from "../common/PrevNextButtons";
import { Spinner } from "../common/Spinner";
import { StudentCardList } from "../common/StudentCardList";
import { TableListMenu } from "../common/TableListMenu";
import { AddEditStudentForm } from "./AddEditStudentForm";

export const StudentsPage: React.FunctionComponent = () => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelType | "All">(
    "All"
  );
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
      const filteredStudents = students.filter((x: Student) =>
        selectedGrade === "All" ? true : selectedGrade === x.gradeLevel
      );
      setPagination(paginate(filteredStudents, page));
    }
  }, [isSuccess, page, selectedGrade, students]);

  const handleSelectChange = ({ value }: { value: string }) => {
    setSelectedGrade(value as GradeLevelType | "All");
  };

  const handleAfterCloseModal = useCallback(() => {
    setSelectedStudent(undefined);
    setEdit(false);
  }, []);

  const handleAfterSubmit = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const studentGradeOptions: option[] = [
    {
      label: "All",
      value: "All",
    },
    ...GradeLevels.map((x) => ({ label: x, value: x })),
  ];

  const handleCardClick = useCallback(
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
      {isLoading && <Spinner />}
      {students && (
        <StudentCardList data={pagination.data} onClick={handleCardClick} />
      )}
      <PrevNextButtons
        page={page}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        disabled={pagination.hasPrevOrNext}
      />
    </>
  );
};
