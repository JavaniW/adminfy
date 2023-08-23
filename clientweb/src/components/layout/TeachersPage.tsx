import "../../styles/Page.css";

import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { ActionMeta } from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { GradeLevelOption, GradeLevelOptions } from "../../enums/GradeLevel";
import { paginate } from "../../helpers";
import { useModalHooks, useScreenSize } from "../../hooks/customHooks";
import { Pagination } from "../../models/Misc";
import { Teacher } from "../../models/Teacher";
import { useGetTeachersQuery } from "../../redux/apiSlice";
import { AddEntityButton } from "../common/AddEntityButton";
import { CardListMenu } from "../common/CardListMenu";
import { DynamicSelect } from "../common/DynamicSelect";
import Modal from "../common/Modal";
import PrevNextButtons from "../common/PrevNextButtons";
import { Spinner } from "../common/Spinner";
import { TeacherCardList } from "../common/TeacherCardList";
import { AddEditTeacherForm } from "./AddEditTeacherForm";
import FlexGridLayout from "../common/FlexGridLayout";
import AdminfyEntityList from "../common/AdminfyEntityList";
import { AddEditPanel } from "../common/AddEditPanel";
import { ScreenSize } from "../../enums/ScreenSize";

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
  const screenSize: ScreenSize = useScreenSize();
  const [name, setName] = useState("");

  useEffect(() => {
    if (isSuccess) {
      const filteredTeachers = teachers.filter((x: Teacher) =>
        selectedGrade?.value ? selectedGrade.value === x.grade : true
      );
      setPagination(paginate(filteredTeachers, page));
    }
  }, [isSuccess, page, selectedGrade, teachers]);

  const handleAfterCloseModal = useCallback(() => {
    // setSelectedTeacher(undefined);
    setEdit(false);
  }, []);

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

  const resetForm = useCallback(() => {
    setSelectedTeacher(undefined);
  }, []);

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
  const isMobile = screenSize < ScreenSize.Small;

  const handleAddEntityButtonClick = useCallback(() => {
    if (isMobile) setOpenModal(true);
    else if (edit) closeModal();
    setSelectedTeacher(undefined);
    setEdit(false);
  }, [closeModal, edit, isMobile, setOpenModal]);

  const handleChange = (event: ChangeEvent<any>) => {
    setName(event.target.value);
  };

  return (
    <>
      <h1 className="page-header teacher--page-header">Teachers</h1>
      <FlexGridLayout>
        <AdminfyEntityList>
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
            {(isMobile || edit) && (
              <AddEntityButton
                disabled={isLoading}
                model="teacher"
                onClick={handleAddEntityButtonClick}
                // label={}
              >
                <p>{`${edit ? "Cancel" : "Add Teacher"}`}</p>
              </AddEntityButton>
            )}
          </CardListMenu>
          {isMobile && openModal && (
            <Modal
              requestClose={closeModal}
              header={edit ? "Edit Teacher" : "Add Teacher"}
              onAfterClose={handleAfterCloseModal}
              isMobile={isMobile}
            >
              <AddEditPanel header={`Add Teacher`}>
                <AddEditTeacherForm
                  onAfterSubmit={closeModal}
                  teacher={selectedTeacher}
                  edit={edit}
                />
              </AddEditPanel>
            </Modal>
          )}
          {isLoading && <Spinner />}
          {teachers && (
            <TeacherCardList data={pagination.data} onClick={handleCardClick} />
          )}
          <PrevNextButtons
            show={isSuccess && teachers.length > 0}
            page={page}
            onPrev={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
            disabled={pagination.hasPrevOrNext}
          />
        </AdminfyEntityList>
        {!isMobile && (
          <AddEditPanel header={edit ? "Edit Teacher" : "Add Teacher"}>
            <AddEditTeacherForm
              onAfterSubmit={() => {
                resetForm();
                closeModal();
                setEdit(false);
              }}
              teacher={selectedTeacher}
              edit={edit}
            />
          </AddEditPanel>
        )}
      </FlexGridLayout>
      <input type="text" value={name} onChange={handleChange} />
    </>
  );
};
