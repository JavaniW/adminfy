// import {useState} from "react";
import { Faculty } from "./models/Faculty";
import "./styles/FacultyPage.css";
import { Header, TableList } from "./TableList";
import { nameof } from "./extensions";
import { useEffect, useState } from "react";
import GradeLevel, { gradeOptions, gradeSelectOptions } from "./GradeLevel";

export function FacultyPage() {
  const [selectedGrade, setSelectedGrade] = useState<gradeSelectOptions>("All");
  const [showGrade, setShowGrade] = useState<boolean>();

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedGrade(event.target.value as gradeSelectOptions);
  }

  useEffect(() => {
    setShowGrade(selectedGrade === "All");
    // debugger;
  }, [selectedGrade]);

  const data: Faculty[] = [
    {
      image: "/spongebob.png",
      firstName: "Frank",
      lastName: "Castle",
      subject: "English",
      grade: GradeLevel.Nine,
    },
    {
      image: "/spongebob.png",
      firstName: "Henry",
      lastName: "Hammer",
      subject: "English",
      grade: GradeLevel.Ten,
    },
    {
      image: "/spongebob.png",
      firstName: "Lucy",
      lastName: "Dom",
      subject: "English",
      grade: GradeLevel.Ten,
    },
    {
      image: "/spongebob.png",
      firstName: "DJ",
      lastName: "White",
      subject: "English",
      grade: GradeLevel.Eleven,
    },
    {
      image: "/spongebob.png",
      firstName: "Lucy",
      lastName: "Dom",
      subject: "English",
      grade: GradeLevel.Twelve,
    },
    {
      image: "/spongebob.png",
      firstName: "Ruckus",
      lastName: "Fam",
      subject: "English",
      grade: GradeLevel.Eleven,
    },
    {
      image: "/spongebob.png",
      firstName: "Lucy",
      lastName: "Dom",
      subject: "English",
      grade: GradeLevel.Nine,
    },
  ];

  const headers: Header<Faculty>[] = [
    {
      isOptional: false,
      referenceData: nameof<Faculty>("image"),
      isImg: true,
    },
    {
      headerLabel: "First Name",
      isOptional: false,
      referenceData: nameof<Faculty>("firstName"),
    },
    {
      headerLabel: "Last Name",
      isOptional: false,
      referenceData: nameof<Faculty>("lastName"),
    },
    {
      headerLabel: "Subject",
      isOptional: true,
      referenceData: nameof<Faculty>("subject"),
    },
    {
      headerLabel: "Grade",
      isOptional: true,
      dependentValue: showGrade,
      referenceData: nameof<Faculty>("grade"),
    },
  ];
  // const [faculty, _setFaculty] = useState<Faculty[]>(fac);

  return (
    <div className="table-list-page">
      <label className="table-list-page-select-label">
        <p>Grade Level:</p>
        <select
          className="table-list-page-select"
          name="grade"
          id="grade"
          onChange={handleSelectChange}
          value={selectedGrade}
        >
          {gradeOptions.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
      </label>
      <TableList
        data={data}
        headers={headers}
        filterSource={nameof<Faculty>("grade")}
        filterValue={selectedGrade}
      />
    </div>
  );
}
