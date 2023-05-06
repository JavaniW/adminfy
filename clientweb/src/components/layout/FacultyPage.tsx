import { Faculty } from "../../models/Faculty";
import "../../styles/FacultyPage.css";
import { Header, TableList } from "../common/TableList";
import { nameof } from "../../extensions";
import { useState } from "react";
import GradeLevel, { GradeLevelType, GradeLevels} from "../../enums/GradeLevel";
import { Select } from "../common/Select";
import CourseSubject from "../../enums/CourseSubject";
import { AddEditDrawer } from "../common/AddEditModal";
import ModelType from "../../enums/ModelType";
import FacultyApi from "../../api/facultyApi";
import { AddEditFacultyForm } from "../common/AddEditFacultyForm";

export function FacultyPage() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevelType | "All">("All");
  const [showGrade, setShowGrade] = useState<boolean>(true);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedGrade(event.target.value as GradeLevelType | "All");
    setShowGrade(event.target.value === "All");
  }

  const addFacultyButton = <button className="add-faculty-button"><p>New Faculty</p></button>;
  

  const data: Faculty[] = [
    {
      image: "/spongebob.png",
      firstName: "Frank",
      lastName: "Castle",
      subject: CourseSubject.English,
      grade: GradeLevel.Nine,
    },
    {
      image: "/spongebob.png",
      firstName: "Henry",
      lastName: "Hammer",
      subject: CourseSubject.Math,
      grade: GradeLevel.Ten,
    },
    {
      image: "/spongebob.png",
      firstName: "Lucy",
      lastName: "Dom",
      subject: CourseSubject.Science,
      grade: GradeLevel.Ten,
    },
    {
      image: "/spongebob.png",
      firstName: "DJ",
      lastName: "White",
      subject: CourseSubject.SocialStudies,
      grade: GradeLevel.Eleven,
    },
    {
      image: "/spongebob.png",
      firstName: "Tara",
      lastName: "Pink",
      subject: CourseSubject.English,
      grade: GradeLevel.Twelve,
    },
    {
      image: "/spongebob.png",
      firstName: "Ruckus",
      lastName: "Fam",
      subject: CourseSubject.Math,
      grade: GradeLevel.Eleven,
    },
    {
      image: "/spongebob.png",
      firstName: "Rack",
      lastName: "Up",
      subject: CourseSubject.Science,
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
        <Select default={"All"} label={"Grade"} onChange={handleSelectChange} options={GradeLevels} />
        <AddEditDrawer 
          model={ModelType.Faculty} 
          onSave={(faculty: Faculty) => FacultyApi.saveFaculty(faculty)} 
          trigger={addFacultyButton}
          form={AddEditFacultyForm} 
          />
        <div className="table-list-page">
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
