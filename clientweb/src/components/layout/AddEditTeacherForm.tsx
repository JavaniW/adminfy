import "../../styles/AddEditModal.css";

import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import TeacherApi from "../../api/teacherApi";
import CourseSubject, { CourseSubjects } from "../../enums/CourseSubject";
import GradeLevel, { GradeLevels } from "../../enums/GradeLevel";
import { Teacher } from "../../models/Teacher";
import { DynamicSelect } from "../common/DynamicSelect";
import { TextInput } from "../common/TextInput";

interface AddEditTeacherFormProps {
  onAfterSubmit: () => any;
  teacher?: Teacher;
  edit: boolean;
}

export function AddEditTeacherForm(props: AddEditTeacherFormProps) {
  const _teacher = props.edit
    ? props.teacher!
    : ({
        _id: "",
        firstName: "",
        lastName: "",
        subject: CourseSubject.English as CourseSubject,
        grade: GradeLevel.Nine as GradeLevel,
      } as Teacher);

  const [teacher, setTeacher] = useState<Teacher>(_teacher);

  function handleLabelChange(event: ChangeEvent<any>) {
    setTeacher({ ...teacher, [event.target.name]: event.target.value });
  }

  function handleSelectChange({ name, value }: { name: string; value: any }) {
    setTeacher({ ...teacher, [name]: value });
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    TeacherApi.saveTeacher(teacher)
      .then(
        (addedTeacher: Teacher) => {
          toast("successfully added", {
            position: "top-right",
            autoClose: 3000,
          });
          props.onAfterSubmit();
        },
        () => {
          console.log("Rejected");
        }
      )
      .catch(console.error);
  }

  useEffect(() => {
    console.log("rendered");
  });

  return (
    <form
      onSubmit={handleSubmit}
      id="add-edit-teacher-form"
      className="add-edit-form course-form"
    >
      <TextInput
        required={true}
        label="First Name:"
        handleChange={handleLabelChange}
        value={teacher.firstName}
        name="firstName"
      />
      <TextInput
        required={true}
        label="Last Name:"
        handleChange={handleLabelChange}
        value={teacher.lastName}
        name="lastName"
      />
      <DynamicSelect
        name="subject"
        onSelectChange={handleSelectChange}
        value={teacher.subject}
        label={"Subject"}
        arrayOfOptions={CourseSubjects.map((x) => ({ label: x, value: x }))}
      />
      <DynamicSelect
        name="grade"
        onSelectChange={handleSelectChange}
        value={teacher.grade}
        label={"Grade"}
        arrayOfOptions={GradeLevels.map((x) => ({ label: x, value: x }))}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
