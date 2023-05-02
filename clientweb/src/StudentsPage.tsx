import { useEffect, useState } from "react";
import GradeLevel from "./GradeLevel";
import Student from "./models/Student";
import { Header, TableList } from "./TableList";
import "./styles/TableList.css";
import { nameof } from "./extensions";

export function StudentsPage() {

  const selectOptions = [
    "All",
    GradeLevel.Nine,
    GradeLevel.Ten,
    GradeLevel.Eleven,
    GradeLevel.Twelve,
  ] as const;

  type selectOptionsType = typeof selectOptions[number];

  const [selectedGrade, setSelectedGrade] = useState<typeof selectOptions[number]>("All");
  const [showGrade, setShowGrade] = useState<boolean>();

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedGrade(event.target.value as selectOptionsType );
  } 

  useEffect(() => {
    setShowGrade(selectedGrade === "All");
    console.log("Rendered");
    // debugger;
  }, [selectedGrade])

  const data: Student[] = [
    {
        firstName: "Ham",
        lastName: "Hooker",
        dateOfBirth: "01/02/2004",
        gradeLevel: GradeLevel.Ten
    },
    {
        firstName: "Tom",
        lastName: "Tommy",
        dateOfBirth: "03/13/2003",
        gradeLevel: GradeLevel.Twelve
    },
    {
        firstName: "Sarah",
        lastName: "Love",
        dateOfBirth: "07/17/2002",
        gradeLevel: GradeLevel.Twelve
    },
    {
        firstName: "Rusty",
        lastName: "Bolt",
        dateOfBirth: "12/20/2002",
        gradeLevel: GradeLevel.Ten
    },
    {
        firstName: "Luke",
        lastName: "Skywalker",
        dateOfBirth: "11/09/2000",
        gradeLevel: GradeLevel.Nine
    }
  ];

  const headers: Header<Student>[] = [
    {
      headerLabel: "First Name",
      isOptional: false,
      referenceData: "firstName"
    },
    {
      headerLabel: "Last Name",
      isOptional: false,
      referenceData: "lastName"
    },
    {
      headerLabel: "Birth Date",
      isOptional: false,
      referenceData: "dateOfBirth"
    },
    {
      headerLabel: "Grade Level",
      isOptional: true,
      dependentValue: showGrade,
      referenceData: "gradeLevel"
    },
  ]

  return (
    <div className="students-page">
      <select
        className="student-page-select"
        name="grade"
        id="grade"
        onChange={handleSelectChange}
        value={selectedGrade}
        defaultValue={"All"}
      >
        {selectOptions.map((x) => (
          <option key={x} value={x}>{x}</option>
        ))
        }
      </select>
      <TableList data={data} headers={headers} filterSource={nameof<Student>("gradeLevel")} filterValue={selectedGrade}/>
    </div>
  );
}
