import "../../styles/Page.css";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import { ActionMeta } from "react-select";
import { GradeLevelOption, GradeLevelOptions } from "../../enums/GradeLevel";
import { paginate } from "../../helpers";
import { useModalHooks } from "../../hooks/customHooks";
import { Pagination } from "../../models/Misc";
import { Teacher } from "../../models/Teacher";
import { useGetTeachersQuery } from "../../redux/apiSlice";
import { AddModelButton } from "../common/AddModelButton";
import { CardListMenu } from "../common/CardListMenu";
import Modal from "../common/Modal";
import PrevNextButtons from "../common/PrevNextButtons";
import { Spinner } from "../common/Spinner";
import { TeacherCardList } from "../common/TeacherCardList";
import { AddEditTeacherForm } from "./AddEditTeacherForm";
import { DynamicSelect } from "../common/DynamicSelect";

export const TeachersPage: React.FunctionComponent = () => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelOption>();
  const [openModal, setOpenModal, closeModal] = useModalHooks();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>();
  const [edit, setEdit] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination<Teacher>>({
    data: [],
    hasPrevOrNext: { prevDisabled: false, nextDisabled: false },
  });
  const [page, setPage] = useState<number>(0);

  const { data: teachers, isLoading, isSuccess } = useGetTeachersQuery();

  useEffect(() => {
    if (isSuccess) {
      const filteredTeachers = teachers.filter((x: Teacher) =>
        selectedGrade?.value ? selectedGrade.value === x.grade : true
      );
      setPagination(paginate(filteredTeachers, page));
    }
  }, [isSuccess, page, selectedGrade, teachers]);

  const handleAfterCloseModal = useCallback(() => {
    setSelectedTeacher(undefined);
    setEdit(false);
  }, []);

  const handleAfterSubmit = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleCardClick = useCallback(
    (event: SyntheticEvent<HTMLTableElement>) => {
      const teacherToEdit = teachers!.find(
        (x) => x._id === event.currentTarget.dataset!.id
      );
      setEdit(true);
      setSelectedTeacher(teacherToEdit);
      setOpenModal(true);
    },
    [setOpenModal, teachers]
  );

  const handleGradeChange = useCallback(
    (
      option: GradeLevelOption | null,
      _actionMeta: ActionMeta<GradeLevelOption>
    ) => {
      setSelectedGrade(option ?? undefined);
      setPage(0);
    },
    []
  );

  return (
    <>
      <h1 className="page-header teacher--page-header">Teachers</h1>
      <CardListMenu>
        <DynamicSelect
          isClearable={true}
          isDisabled={isLoading}
          label="Grade"
          options={GradeLevelOptions}
          getOptionLabel={(x) => x.value}
          value={selectedGrade}
          onChange={handleGradeChange}
        />
        <AddModelButton
          disabled={isLoading}
          model="teacher"
          onClick={() => setOpenModal(true)}
        >
          <p>Add Teacher +</p>
        </AddModelButton>
      </CardListMenu>
      {openModal && (
        <Modal
          requestClose={closeModal}
          header="Add Teacher"
          onAfterClose={handleAfterCloseModal}
        >
          <AddEditTeacherForm
            onAfterSubmit={handleAfterSubmit}
            teacher={selectedTeacher}
            edit={edit}
          />
        </Modal>
      )}
      {isLoading && <Spinner />}
      {teachers && (
        <TeacherCardList data={pagination.data} onClick={handleCardClick} />
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
