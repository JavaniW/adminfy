import "../../styles/TableList.css";
import "../../styles/Page.css";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import { ActionMeta } from "react-select";
import { GradeLevelOption, GradeLevelOptions } from "../../enums/GradeLevel";
import { paginate } from "../../helpers";
import { useModalHooks } from "../../hooks/customHooks";
import { Pagination } from "../../models/Misc";
import Student from "../../models/Student";
import { useGetStudentsQuery } from "../../redux/apiSlice";
import { AddModelButton } from "../common/AddModelButton";
import { CardListMenu } from "../common/CardListMenu";
import { DynamicSelect } from "../common/DynamicSelect";
import Modal from "../common/Modal";
import PrevNextButtons from "../common/PrevNextButtons";
import { Spinner } from "../common/Spinner";
import { StudentCardList } from "../common/StudentCardList";
import { AddEditStudentForm } from "./AddEditStudentForm";

export const StudentsPage: React.FunctionComponent = () => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelOption>();
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
        selectedGrade ? selectedGrade.value === x.gradeLevel : true
      );
      setPagination(paginate(filteredStudents, page));
    }
  }, [isSuccess, page, selectedGrade, students]);

  const handleSelectChange = (
    option: GradeLevelOption | null,
    _actionMeta: ActionMeta<GradeLevelOption>
  ) => {
    setSelectedGrade(option ?? undefined);
    setPage(0);
  };

  const handleAfterCloseModal = useCallback(() => {
    setSelectedStudent(undefined);
    setEdit(false);
  }, []);

  const handleAfterSubmit = useCallback(() => {
    closeModal();
  }, [closeModal]);

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
      <h1 className="page-header teacher--page-header">Students</h1>
      <CardListMenu>
        <DynamicSelect
          isClearable={true}
          placeholder="Grade"
          isDisabled={isLoading}
          label="Grade"
          options={GradeLevelOptions}
          value={selectedGrade}
          getOptionLabel={(x) => x.value}
          onChange={handleSelectChange}
        />
        <AddModelButton
          disabled={isLoading}
          model="student"
          onClick={() => setOpenModal(true)}
        >
          <p>New Student</p>
        </AddModelButton>
      </CardListMenu>
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
        show={isSuccess}
        page={page}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        disabled={pagination.hasPrevOrNext}
      />
    </>
  );
};
