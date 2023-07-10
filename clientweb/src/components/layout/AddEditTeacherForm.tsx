import "../../styles/AddEditModal.css";
import "react-toastify/dist/ReactToastify.css";

import { ChangeEvent, SyntheticEvent, useState } from "react";
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
  onAfterSubmit: () => any;
  teacher?: Teacher;
  edit: boolean;
}

export const AddEditTeacherForm: React.FunctionComponent<Props> = (props) => {
  const [saveTeacher, { isLoading: isSaving }] = useSaveTeacherMutation();
  const [deleteTeacher, { isLoading: isDeleting }] = useDeleteTeacherMutation();
  const [teacher, setTeacher] = useState<Teacher>(
    props.edit
      ? props.teacher!
      : ({
          _id: "",
          firstName: "",
          lastName: "",
          // subject: undefined,
          // grade: GradeLevel.Nine as GradeLevel,
        } as Teacher)
  );

  const handleTextInpuChange = (event: ChangeEvent<any>) => {
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
      .finally(() => props.onAfterSubmit());
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
      .finally(() => {
        props.onAfterSubmit();
      });
  };

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
        onChange={handleTextInpuChange}
        value={teacher.firstName}
        name="firstName"
      />
      <TextInput
        placeholder="Last Name"
        required={true}
        label="Last Name"
        onChange={handleTextInpuChange}
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
