import { ChangeEvent, SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";
import GradeLevel, { GradeLevelOptions } from "../../enums/GradeLevel";
import { getOptionValue } from "../../helpers";
import Student from "../../models/Student";
import { useSaveStudentMutation } from "../../redux/apiSlice";
import { DateInput } from "../common/DateInput";
import { DynamicSelect } from "../common/DynamicSelect";
import { Spinner } from "../common/Spinner";
import { TextInput } from "../common/TextInput";

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

  const handleChange = (event: ChangeEvent<any>) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      id="add-edit-course-form"
      className="add-edit-form course-form"
    >
      <TextInput
        placeholder="First Name"
        label="First Name"
        onChange={handleChange}
        value={student.firstName}
        name="firstName"
        required={true}
      />
      <TextInput
        placeholder="Last Name"
        label="Last Name"
        onChange={handleChange}
        value={student.lastName}
        name="lastName"
        required={true}
      />
      <DateInput
        placeholder="Birth Date"
        label="Birth Date:"
        name="dateOfBirth"
        value={student.dateOfBirth}
        handleChange={handleChange}
      />
      <DynamicSelect
        placeholder="Grade"
        label="Grade Level"
        onChange={(newVal) =>
          setStudent({ ...student, gradeLevel: newVal!.value })
        }
        options={GradeLevelOptions}
        value={getOptionValue(GradeLevelOptions, student.gradeLevel)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
