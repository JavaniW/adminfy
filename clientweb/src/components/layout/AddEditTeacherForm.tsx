import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditModal.css";

import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CourseSubjectOptions } from "../../enums/CourseSubject";
import { GradeLevelOptions } from "../../enums/GradeLevel";
import { getOptionValue } from "../../helpers";
import { Teacher } from "../../models/Teacher";
import {
  useDeleteTeacherMutation,
  useSaveTeacherMutation,
} from "../../redux/apiSlice";
import { DynamicSelect } from "../common/DynamicSelect";
import { Spinner } from "../common/Spinner";
import { TextInput } from "../common/TextInput";

interface Props {
  teacher?: Teacher;
  edit: boolean;
}

export const AddEditTeacherForm: React.FunctionComponent<Props> = (props) => {
  const initialTeacher = props.edit
    ? props.teacher!
    : ({
        _id: "",
        firstName: "",
        lastName: "",
      } as Teacher);
  const [saveTeacher, { isLoading: isSaving }] = useSaveTeacherMutation();
  const [deleteTeacher, { isLoading: isDeleting }] = useDeleteTeacherMutation();
  const [teacher, setTeacher] = useState<Teacher>(initialTeacher);

  useEffect(() => {
    setTeacher(
      props.teacher ??
        ({
          _id: "",
          firstName: "",
          lastName: "",
        } as Teacher)
    );
  }, [props.teacher]);

  const clearForm = () =>
    setTeacher({
      _id: "",
      firstName: "",
      lastName: "",
    } as Teacher);

  const handleTextInputChange = (event: ChangeEvent<any>) => {
    setTeacher({ ...teacher, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    saveTeacher(teacher)
      .unwrap()
      .then(
        () => {
          toast.success("Successfully added");
        },
        (err) => {
          toast.error(`${err.data}`);
        }
      )
      .catch(console.error)
      .finally(clearForm);
  };

  const handleDelete = (event: SyntheticEvent) => {
    deleteTeacher(teacher._id!.toString())
      .unwrap()
      .then(
        () => {
          toast.success("Teacher deleted");
        },
        (err) => {
          toast.error(`${err.data}`);
        }
      )
      .catch(console.error)
      .finally(clearForm);
  };

  // useEffect(() => console.log(props.edit));

  if (isSaving || isDeleting) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      id="add-edit-teacher-form"
      className="add-edit-form course-form"
    >
      <TextInput
        placeholder="First Name"
        required={true}
        label="First Name"
        onChange={handleTextInputChange}
        value={teacher.firstName}
        name="firstName"
      />
      <TextInput
        placeholder="Last Name"
        required={true}
        label="Last Name"
        onChange={handleTextInputChange}
        value={teacher.lastName}
        name="lastName"
      />
      <DynamicSelect
        required
        placeholder="Subject"
        isClearable={false}
        label="Subject"
        value={getOptionValue(CourseSubjectOptions, teacher.subject)}
        options={CourseSubjectOptions}
        onChange={(newVal) =>
          setTeacher({ ...teacher, subject: newVal!.value })
        }
      />
      <DynamicSelect
        required
        placeholder="Grade"
        isClearable={false}
        label="Grade"
        value={getOptionValue(GradeLevelOptions, teacher.grade)}
        options={GradeLevelOptions}
        getOptionLabel={(x) => x.value}
        onChange={(newVal) => setTeacher({ ...teacher, grade: newVal!.value })}
      />
      <div className="edit-form-buttons">
        <button
          type="button"
          disabled={teacher._id ? false : true}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
