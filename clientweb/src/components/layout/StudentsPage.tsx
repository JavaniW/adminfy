import '../../styles/TableList.css';

import { useCallback, useEffect, useState } from 'react';

import GradeLevel, { GradeLevels, GradeLevelType } from '../../enums/GradeLevel';
import { nameof } from '../../extensions';
import Student from '../../models/Student';
import { Header, TableList } from '../common/TableList';
import { DynamicSelect, option } from '../common/DynamicSelect';
import { AddEditModal } from '../common/AddEditModal';
import StudentApi from '../../api/studentApi';
import ModelType from '../../enums/ModelType';
import { AddEditStudentForm } from './AddEditStudentForm';

export function StudentsPage() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelType | "All">("All");
  const [showGrade, setShowGrade] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);

  function handleSelectChange({value} : {value: string}) {
    setSelectedGrade(value as GradeLevelType | "All");
    setShowGrade(value === "All");
  }

  const loadData = useCallback(() => {
    StudentApi.getStudents()
      .then(results => {
        const _students = results.map((x : Student )=> x as Student);
        setStudents(_students);
      });
  }, []);

  useEffect(loadData, [loadData]);
  
  const handleOpenModal = useCallback(() => {
      setOpenModal(true);
    }, [setOpenModal]);

  const handleCloseModal = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);

  const handleAfterSubmit = useCallback(() => {
    setOpenModal(false);
    loadData();
  }, [loadData])

  const addStudentButton = <button className="add-student-button"><p>New Student</p></button>;


  // const data: Student[] = [
  //   {
  //     firstName: "Ham",
  //     lastName: "Hooker",
  //     dateOfBirth: "01/02/2004",
  //     gradeLevel: GradeLevel.Ten,
  //   },
  //   {
  //     firstName: "Tom",
  //     lastName: "Tommy",
  //     dateOfBirth: "03/13/2003",
  //     gradeLevel: GradeLevel.Twelve,
  //   },
  //   {
  //     firstName: "Sarah",
  //     lastName: "Love",
  //     dateOfBirth: "07/17/2002",
  //     gradeLevel: GradeLevel.Twelve,
  //   },
  //   {
  //     firstName: "Rusty",
  //     lastName: "Bolt",
  //     dateOfBirth: "12/20/2002",
  //     gradeLevel: GradeLevel.Ten,
  //   },
  //   {
  //     firstName: "Patrick",
  //     lastName: "Star",
  //     dateOfBirth: "02/20/2002",
  //     gradeLevel: GradeLevel.Eleven,
  //   },
  //   {
  //     firstName: "Luke",
  //     lastName: "Skywalker",
  //     dateOfBirth: "11/09/2000",
  //     gradeLevel: GradeLevel.Nine,
  //   },
  // ];

  const headers: Header<Student>[] = [
    {
      label: "First Name",
      referenceData: (x : Student) => x.firstName,
    },
    {
      label: "Last Name",
      referenceData: (x : Student) => x.lastName,
    },
    {
      label: "Birth Date",
      referenceData: (x : Student) => x.dateOfBirth,
    },
    {
      label: "Grade Level",
      referenceData: (x : Student) => x.gradeLevel,
      show: () => showGrade
    },
  ];

  const studentGradeOptions : option[] = [
    {
      label: "All",
      value: "All"
    },
    ...GradeLevels.map(x => ({ label: x, value: x }))
  ]
  return (
    <div className="students-page" >
      <DynamicSelect value={selectedGrade} name='Grade Level' label={"Grade Level"} onSelectChange={handleSelectChange} arrayOfOptions={studentGradeOptions} />
      <AddEditModal open={openModal} openModal={handleOpenModal} closeModal={handleCloseModal} form={ModelType.Course} trigger={addStudentButton}>
        <AddEditStudentForm onAfterSubmit={handleAfterSubmit}/>
      </AddEditModal>
      <div className="table-list-page">
        <TableList
          data={students}
          headers={headers}
          filterSource={nameof<Student>("gradeLevel")}
          filterValue={selectedGrade}
        />
      </div>
    </div>
  );
}
