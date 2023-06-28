import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import { GradeLevels, GradeLevelType } from "../../enums/GradeLevel";
import { paginate } from "../../helpers";
import { useModalHooks } from "../../hooks/customHooks";
import { Pagination } from "../../models/Misc";
import { Teacher } from "../../models/Teacher";
import { useGetTeachersQuery } from "../../redux/apiSlice";
import { AddModelButton } from "../common/AddModelButton";
import { DynamicSelect, option } from "../common/DynamicSelect";
import Modal from "../common/Modal";
import PrevNextButtons from "../common/PrevNextButtons";
import { Spinner } from "../common/Spinner";
import { TableListMenu } from "../common/TableListMenu";
import { TeacherCardList } from "../common/TeacherCardList";
import { AddEditTeacherForm } from "./AddEditTeacherForm";

export const TeachersPage: React.FunctionComponent = () => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelType | "All">(
    "All"
  );
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
        selectedGrade === "All" ? true : selectedGrade === x.grade
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

  const handleGradeChange = useCallback(({ value }: { value: any }) => {
    setSelectedGrade(value);
  }, []);

  const gradeOptions: option[] = [
    {
      label: "All",
      value: "All",
    },
    ...GradeLevels.map((x) => ({ label: x, value: x })),
  ];

  return (
    <>
      <TableListMenu>
        <DynamicSelect
          disabled={isLoading}
          label={"Grade"}
          name="Grade"
          value={selectedGrade}
          onSelectChange={handleGradeChange}
          arrayOfOptions={gradeOptions}
        />
        <AddModelButton
          disabled={isLoading}
          model="teacher"
          onClick={() => setOpenModal(true)}
        >
          <p>Add Teacher +</p>
        </AddModelButton>
      </TableListMenu>
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
        page={page}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        disabled={pagination.hasPrevOrNext}
      />
    </>
  );
};
