import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import StudentApi from "../../api/studentApi";
import { DynamicSelect, option } from "../common/DynamicSelect";
import { TextInput } from "../common/TextInput";
import Student from "../../models/Student";
import GradeLevel, { GradeLevels } from "../../enums/GradeLevel";
import { toast } from "react-toastify";
import { DateInput } from "../common/DateInput";

interface AddEditStudentFormProps {
  onAfterSubmit: () => void;
  student?: Student;
  edit: boolean;
}

export function AddEditStudentForm(props: AddEditStudentFormProps) {
  const _student = props.edit
    ? props.student!
    : {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gradeLevel: "" as GradeLevel,
      };
  const [student, setStudent] = useState<Student>(_student);

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    StudentApi.saveStudent(student)
      .then(() => {
        toast("successfully added", {
          position: "top-right",
          autoClose: 3000,
        });
        props.onAfterSubmit();
      })
      .catch(console.error);
  }

  function handleSelectChange({ name, value }: { name: string; value: any }) {
    setStudent({ ...student, [name]: value });
  }

  function handleChange(event: ChangeEvent<any>) {
    setStudent({ ...student, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    console.log("rendered");
  })

  const gradeLevelOptions: option[] = [
    {
      label: "",
      value: "",
    },
    ...GradeLevels.map((x) => ({ label: x, value: x })),
  ];

  return (
    <form
      onSubmit={handleSubmit}
      id="add-edit-course-form"
      className="add-edit-form course-form"
    >
      <TextInput
        label="First Name:"
        handleChange={handleChange}
        value={student.firstName}
        name="firstName"
        required={true}
      />
      <TextInput
        label="Last Name:"
        handleChange={handleChange}
        value={student.lastName}
        name="lastName"
        required={true}
      />
      <DateInput
        label="Birth Date:"
        name="dateOfBirth"
        value={student.dateOfBirth}
        handleChange={handleChange}
      />
      <DynamicSelect
        label="Grade Level"
        name="gradeLevel"
        onSelectChange={handleSelectChange}
        arrayOfOptions={gradeLevelOptions}
        value={student.gradeLevel}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
