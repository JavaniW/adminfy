import "../../styles/TeachersPage.css";

import { SyntheticEvent, useCallback, useState } from "react";

import { GradeLevels, GradeLevelType } from "../../enums/GradeLevel";
import { nameof } from "../../extensions";
import { useModalHooks } from "../../hooks/customHooks";
import { Teacher } from "../../models/Teacher";
import { useGetTeachersQuery } from "../../redux/apiSlice";
import { DynamicSelect, option } from "../common/DynamicSelect";
import Modal from "../common/Modal";
import { Spinner } from "../common/Spinner";
import { Header, TableList } from "../common/TableList";
import { AddEditTeacherForm } from "./AddEditTeacherForm";

export const TeachersPage: React.FunctionComponent = () => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelType | "All">(
    "All"
  );
  const [showGrade, setShowGrade] = useState<boolean>(true);
  const [openModal, setOpenModal, closeModal] = useModalHooks();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>();
  const [edit, setEdit] = useState<boolean>(false);
  const { data: teachers, isLoading } = useGetTeachersQuery();

  const handleAfterCloseModal = useCallback(() => {
    setSelectedTeacher(undefined);
    setEdit(false);
  }, []);

  const handleAfterSubmit = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleTableListItemClick = useCallback(
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
    setShowGrade(value === "All");
  }, []);

  const headers: Header<Teacher>[] = [
    {
      label: "",
      referenceData: (x: Teacher) => <img src={x.image} alt={"Teacher"} />,
    },
    {
      label: "First Name",
      referenceData: (x: Teacher) => x.firstName,
    },
    {
      label: "Last Name",
      referenceData: (x: Teacher) => x.lastName,
    },
    {
      label: "Subject",
      referenceData: (x: Teacher) => x.subject,
    },
    {
      label: "Grade",
      referenceData: (x: Teacher) => x.grade,
      show: () => showGrade,
    },
  ];

  const gradeOptions: option[] = [
    {
      label: "All",
      value: "All",
    },
    ...GradeLevels.map((x) => ({ label: x, value: x })),
  ];

  return (
    <>
      <div className="teachers-page">
        <DynamicSelect
          disabled={isLoading}
          label={"Grade"}
          name="Grade"
          value={selectedGrade}
          onSelectChange={handleGradeChange}
          arrayOfOptions={gradeOptions}
        />
        <button
          disabled={isLoading}
          className="add-teacher-button"
          onClick={() => setOpenModal(true)}
        >
          <p>Add Teacher +</p>
        </button>
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
        <div className="table-list-page">
          {isLoading && <Spinner />}
          {teachers && (
            <TableList
              onClick={handleTableListItemClick}
              key={nameof<Teacher>("_id")}
              data={teachers}
              headers={headers}
              filterSource={nameof<Teacher>("grade")}
              filterValue={selectedGrade}
            />
          )}
        </div>
      </div>
    </>
  );
};
