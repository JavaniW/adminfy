import "../../styles/TableList.css";
import "../../styles/Page.css";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import { ActionMeta } from "react-select";
import { GradeLevelOption, GradeLevelOptions } from "../../enums/GradeLevel";
import { paginate } from "../../helpers";
import { useModalHooks, useScreenSize } from "../../hooks/customHooks";
import { Pagination } from "../../models/Misc";
import Student from "../../models/Student";
import { useGetStudentsQuery } from "../../redux/apiSlice";
import { AddEntityButton } from "../common/AddEntityButton";
import { CardListMenu } from "../common/CardListMenu";
import { DynamicSelect } from "../common/DynamicSelect";
import Modal from "../common/Modal";
import PrevNextButtons from "../common/PrevNextButtons";
import { Spinner } from "../common/Spinner";
import { StudentCardList } from "../common/StudentCardList";
import { AddEditStudentForm } from "./AddEditStudentForm";
import FlexGridLayout from "../common/FlexGridLayout";
import AdminfyModelList from "../common/AdminfyEntityList";
import { ScreenSize } from "../../enums/ScreenSize";
import { AddEditPanel } from "../common/AddEditPanel";

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
  const screenSize: ScreenSize = useScreenSize();

  console.log(edit);

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
    // setSelectedStudent(undefined);
    // setEdit(false);
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
  const isMobile = screenSize < ScreenSize.Small;

  const handleAddEntityButtonClick = useCallback(() => {
    if (isMobile) setOpenModal(true);
    else if (edit) closeModal();
    setSelectedStudent(undefined);
    setEdit(false);
  }, [closeModal, edit, isMobile, setOpenModal]);

  return (
    <>
      <h1 className="page-header teacher--page-header">Students</h1>
      <FlexGridLayout>
        <AdminfyModelList>
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
            {(isMobile || edit) && (
              <AddEntityButton
                disabled={isLoading}
                model="student"
                onClick={handleAddEntityButtonClick}
              >
                <p>{edit ? "Cancel" : "New Student"}</p>
              </AddEntityButton>
            )}
          </CardListMenu>
          {isMobile && openModal && (
            <Modal
              header={"Add Student"}
              requestClose={closeModal}
              onAfterClose={handleAfterCloseModal}
              isMobile={isMobile}
            >
              <AddEditPanel header={edit ? "Edit Student" : "Add Student"}>
                <AddEditStudentForm
                  student={selectedStudent}
                  onAfterSubmit={handleAfterSubmit}
                  edit={edit}
                />
              </AddEditPanel>
            </Modal>
          )}
          {isLoading && <Spinner />}
          {students && (
            <StudentCardList data={pagination.data} onClick={handleCardClick} />
          )}
          <PrevNextButtons
            show={isSuccess && students.length > 0}
            page={page}
            onPrev={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
            disabled={pagination.hasPrevOrNext}
          />
        </AdminfyModelList>
        {!isMobile && (
          <AddEditPanel header={edit ? "Edit Student" : "Add Student"}>
            <AddEditStudentForm
              onAfterSubmit={closeModal}
              student={selectedStudent}
              edit={edit}
            />
          </AddEditPanel>
        )}
      </FlexGridLayout>
    </>
  );
};
