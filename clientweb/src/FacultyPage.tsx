import { Faculty } from "./models/Faculty";
import "./styles/FacultyPage.css";
import { Header, TableList } from "./TableList";
import { nameof } from "./extensions";
import { useState } from "react";
import GradeLevel, { GradeLevelType, GradeLevels} from "./GradeLevel";
import { Select } from "./Select";

export function FacultyPage() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelType | "All">("All");
  const [showGrade, setShowGrade] = useState<boolean>(true);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedGrade(event.target.value as GradeLevelType | "All");
    setShowGrade(event.target.value === "All");
  }

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
      firstName: "Tara",
      lastName: "Pink",
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
      firstName: "Rack",
      lastName: "Up",
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

  return (
    <div className="faculty-page">
      <div className="table-list-page">
        <Select default={"All"} label={"Grade"} onChange={handleSelectChange} options={GradeLevels} />
        <TableList
          data={data}
          headers={headers}
          filterSource={nameof<Faculty>("grade")}
          filterValue={selectedGrade}
        />
      </div>
    </div>
  );
}
