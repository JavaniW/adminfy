import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import GradeLevel, { GradeLevels } from "../../enums/GradeLevel";
import Student from "../../models/Student";
import { useSaveStudentMutation } from "../../redux/apiSlice";
import { DateInput } from "../common/DateInput";
import { DynamicSelect, option } from "../common/DynamicSelect";
import { TextInput } from "../common/TextInput";
import { Spinner } from "../common/Spinner";

interface Props {
  onAfterSubmit: () => void;
  student?: Student;
  edit: boolean;
}

export const AddEditStudentForm: React.FunctionComponent<Props> = (props) => {
  const [student, setStudent] = useState<Student>(
    props.edit
      ? props.student!
      : {
          _id: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gradeLevel: "" as GradeLevel,
        }
  );

  const [saveStudent, { isLoading }] = useSaveStudentMutation();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    saveStudent(student)
      .unwrap()
      .then(() => {
        toast("successfully added", {
          position: "top-right",
          autoClose: 3000,
        });
        props.onAfterSubmit();
      })
      .catch(console.error);
  };

  const handleSelectChange = ({
    name,
    value,
  }: {
    name: string;
    value: any;
  }) => {
    setStudent({ ...student, [name]: value });
  };

  const handleChange = (event: ChangeEvent<any>) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const gradeLevelOptions: option[] = [
    {
      label: "",
      value: "",
    },
    ...GradeLevels.map((x) => ({ label: x, value: x })),
  ];

  if (isLoading) return <Spinner />;

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
};
