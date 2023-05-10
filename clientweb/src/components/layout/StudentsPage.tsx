import '../../styles/TableList.css';

import { useState } from 'react';

import GradeLevel, { GradeLevels, GradeLevelType } from '../../enums/GradeLevel';
import { nameof } from '../../extensions';
import Student from '../../models/Student';
import { Select } from '../common/Select';
import { Header, TableList } from '../common/TableList';
import { DynamicSelect, option } from '../common/DynamicSelect';

export function StudentsPage() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelType | "All">("All");
  const [showGrade, setShowGrade] = useState<boolean>(true);

  function handleSelectChange({value} : {value: string}) {
    setSelectedGrade(value as GradeLevelType | "All");
    setShowGrade(value === "All");
  }

  const data: Student[] = [
    {
      firstName: "Ham",
      lastName: "Hooker",
      dateOfBirth: "01/02/2004",
      gradeLevel: GradeLevel.Ten,
    },
    {
      firstName: "Tom",
      lastName: "Tommy",
      dateOfBirth: "03/13/2003",
      gradeLevel: GradeLevel.Twelve,
    },
    {
      firstName: "Sarah",
      lastName: "Love",
      dateOfBirth: "07/17/2002",
      gradeLevel: GradeLevel.Twelve,
    },
    {
      firstName: "Rusty",
      lastName: "Bolt",
      dateOfBirth: "12/20/2002",
      gradeLevel: GradeLevel.Ten,
    },
    {
      firstName: "Patrick",
      lastName: "Star",
      dateOfBirth: "02/20/2002",
      gradeLevel: GradeLevel.Eleven,
    },
    {
      firstName: "Luke",
      lastName: "Skywalker",
      dateOfBirth: "11/09/2000",
      gradeLevel: GradeLevel.Nine,
    },
  ];

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
      <div className="table-list-page">
        <DynamicSelect value={selectedGrade} name='Grade Level' label={"Grade Level"} onSelectChange={handleSelectChange} arrayOfOptions={studentGradeOptions} />
        <TableList
          data={data}
          headers={headers}
          filterSource={nameof<Student>("gradeLevel")}
          filterValue={selectedGrade}
        />
      </div>
    </div>
  );
}
