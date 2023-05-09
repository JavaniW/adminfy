import '../../styles/TeachersPage.css';

import { useCallback, useEffect, useState } from 'react';

import TeacherApi from '../../api/teacherApi';
import { GradeLevels, GradeLevelType } from '../../enums/GradeLevel';
import ModelType from '../../enums/ModelType';
import { nameof } from '../../extensions';
import { Teacher } from '../../models/Teacher';
import { AddEditModal } from '../common/AddEditModal';
import { AddEditTeacherForm } from '../common/AddEditTeacherForm';
import { Select } from '../common/Select';
import { Header, TableList } from '../common/TableList';

export function TeachersPage() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelType | "All">("All");
  const [showGrade, setShowGrade] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [teacher, setTeacher] = useState<Teacher[]>([]);

  const loadData = useCallback(() => {
    TeacherApi.getTeacher()
      .then(results => {
        const _teacher = results.map((x : Teacher )=> x as Teacher);
        setTeacher(_teacher);
      });
  }, []);

  const handleOpenModal = useCallback(() => {
      setOpenModal(true);
    }, [setOpenModal]);

  const handleCloseModal = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);

  const handleAfterSubmit = useCallback(() => {
    setOpenModal(false);
    loadData();
  }, [loadData]);


  useEffect(loadData, [loadData]);

  const handleSelectChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGrade(event.target.value as GradeLevelType | "All");
    setShowGrade(event.target.value === "All");
  }, []);

  const addTeacherButton = <button className="add-teacher-button"><p>New Teacher</p></button>;

  const headers: Header<Teacher>[] = [
    {
      label: "",
      referenceData: (x : Teacher) => <img src={x.image} alt={"Teacher"} />
    },
    {
      label: "First Name",
      referenceData: (x : Teacher) => x.firstName
    },
    {
      label: "Last Name",
      referenceData: (x : Teacher) => x.lastName
    },
    {
      label: "Subject",
      referenceData: (x : Teacher) => x.subject
    },
    {
      label: "Grade",
      referenceData: (x : Teacher) => x.grade,
      show: () => showGrade
    }
  ]

  return (
    <div className="teachers-page">
        <Select name='Grade' default={"All"} label={"Grade"} onChange={handleSelectChange} options={GradeLevels} />
          <AddEditModal openModal={handleOpenModal} closeModal={handleCloseModal} open={openModal} form={ModelType.Teacher} trigger={addTeacherButton}>
            <AddEditTeacherForm onAfterSubmit={handleAfterSubmit} />
          </AddEditModal>
        <div className="table-list-page">
          <TableList
            data={teacher}
            headers={headers}
            filterSource={nameof<Teacher>("grade")}
            filterValue={selectedGrade}
          />
        </div>
    </div>
  );
}
