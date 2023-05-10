import '../../styles/TeachersPage.css';

import { useCallback, useEffect, useState } from 'react';

import TeacherApi from '../../api/teacherApi';
import { GradeLevels, GradeLevelType } from '../../enums/GradeLevel';
import ModelType from '../../enums/ModelType';
import { nameof } from '../../extensions';
import { Teacher } from '../../models/Teacher';
import { AddEditModal } from '../common/AddEditModal';
import { AddEditTeacherForm } from './AddEditTeacherForm';
import { Select } from '../common/Select';
import { Header, TableList } from '../common/TableList';
import { TeachersContext } from '../../Context';
import { DynamicSelect, option } from '../common/DynamicSelect';

export function TeachersPage() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelType | "All">("All");
  const [showGrade, setShowGrade] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const loadData = useCallback(() => {
    TeacherApi.getTeachers()
      .then(results => {
        const _teachers = results.map((x : Teacher )=> x as Teacher);
        setTeachers(_teachers);
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

  const handleSelectChange = useCallback(({name, value} : {name: string, value: any}) => {
    // debugger;
    setSelectedGrade(value);
    setShowGrade(value === "All");
  }, [])

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

  const gradeOptions : option[] = [
    {
      label: "All",
      value: "All",
    },
    ...GradeLevels.map(x => ({label: x, value: x}))
  ];

  return (
    <>
    <div className="teachers-page">
      <DynamicSelect label={"Grade"} name='Grade' value={selectedGrade} onSelectChange={handleSelectChange} arrayOfOptions={gradeOptions} />
          <AddEditModal openModal={handleOpenModal} closeModal={handleCloseModal} open={openModal} form={ModelType.Teacher} trigger={addTeacherButton}>
            <AddEditTeacherForm onAfterSubmit={handleAfterSubmit} />
          </AddEditModal>
        <div className="table-list-page">
          <TeachersContext.Provider value={teachers} >
            <TableList
              data={teachers}
              headers={headers}
              filterSource={nameof<Teacher>("grade")}
              filterValue={selectedGrade}
              />
          </TeachersContext.Provider>
        </div>
    </div>
              </>
  );
}
