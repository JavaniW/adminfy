import { useState } from "react";
import GradeLevel, { GradeLevelType, GradeLevels } from "../../enums/GradeLevel";
import Student from "../../models/Student";
import { Header, TableList } from "../common/TableList";
import "../../styles/TableList.css";
import { nameof } from "../../extensions";
import { Select } from "../common/Select";

export function StudentsPage() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelType | "All">("All");
  const [showGrade, setShowGrade] = useState<boolean>(true);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedGrade(event.target.value as GradeLevelType | "All");
    setShowGrade(event.target.value === "All");
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
      headerLabel: "First Name",
      isOptional: false,
      referenceData: "firstName",
    },
    {
      headerLabel: "Last Name",
      isOptional: false,
      referenceData: "lastName",
    },
    {
      headerLabel: "Birth Date",
      isOptional: false,
      referenceData: "dateOfBirth",
    },
    {
      headerLabel: "Grade Level",
      isOptional: true,
      dependentValue: showGrade,
      referenceData: "gradeLevel",
    },
  ];

  return (
    <div className="students-page" >
      <div className="table-list-page">
        <Select default={"All"} label={"Grade Level"} onChange={handleSelectChange} options={GradeLevels} />
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
