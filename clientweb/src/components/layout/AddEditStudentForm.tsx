import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import GradeLevel, { GradeLevelOptions } from "../../enums/GradeLevel";
import { getOptionValue } from "../../helpers";
import Student from "../../models/Student";
import {
  useDeleteStudentMutation,
  useSaveStudentMutation,
} from "../../redux/apiSlice";
import { DateInput } from "../common/DateInput";
import { DynamicSelect } from "../common/DynamicSelect";
import { Spinner } from "../common/Spinner";
import { TextInput } from "../common/TextInput";

interface Props {
  student?: Student;
  edit: boolean;
}

export const AddEditStudentForm: React.FunctionComponent<Props> = (props) => {
  const initialStudent = props.student ?? {
    _id: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gradeLevel: "" as GradeLevel,
  };
  const [student, setStudent] = useState<Student>(initialStudent);

  const [saveStudent, { isLoading: isSaving }] = useSaveStudentMutation();
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();

  useEffect(() => {
    setStudent(
      props.student ?? {
        _id: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gradeLevel: "" as GradeLevel,
      }
    );
  }, [props.student]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    saveStudent(student)
      .unwrap()
      .then(
        () => {
          toast.success("successfully added");
        },
        (err) => {
          toast.error(`${err.data}`);
        }
      )
      .catch(console.error)
      .finally(clearForm);
  };

  const clearForm = () => {
    setStudent({
      _id: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gradeLevel: "" as GradeLevel,
    });
  };

  const handleDelete = (event: SyntheticEvent) => {
    deleteStudent(student._id!.toString())
      .then(
        () => {
          toast.success("Student deleted");
        },
        (err) => {
          toast.error(`${err.data}`);
        }
      )
      .catch(console.error)
      .finally(clearForm);
  };

  const handleChange = (event: ChangeEvent<any>) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  if (isSaving || isDeleting) return <Spinner />;

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
        getOptionLabel={(x) => x.value}
        options={GradeLevelOptions}
        value={getOptionValue(GradeLevelOptions, student.gradeLevel)}
      />
      <div className="edit-form-buttons">
        <button
          type="button"
          disabled={student._id ? false : true}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
