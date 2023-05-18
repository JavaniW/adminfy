import "../../styles/AddEditModal.css";

import { ChangeEvent, SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";

import CourseSubject, { CourseSubjects } from "../../enums/CourseSubject";
import GradeLevel, { GradeLevels } from "../../enums/GradeLevel";
import { Teacher } from "../../models/Teacher";
import { useSaveTeacherMutation } from "../../redux/apiSlice";
import { DynamicSelect } from "../common/DynamicSelect";
import { TextInput } from "../common/TextInput";
import { Spinner } from "../common/Spinner";

interface Props {
  onAfterSubmit: () => any;
  teacher?: Teacher;
  edit: boolean;
}

export const AddEditTeacherForm: React.FunctionComponent<Props> = (props) => {
  const [saveTeacher, { isLoading }] = useSaveTeacherMutation();
  const [teacher, setTeacher] = useState<Teacher>(
    props.edit
      ? props.teacher!
      : ({
          _id: "",
          firstName: "",
          lastName: "",
          subject: CourseSubject.English as CourseSubject,
          grade: GradeLevel.Nine as GradeLevel,
        } as Teacher)
  );

  const handleLabelChange = (event: ChangeEvent<any>) => {
    setTeacher({ ...teacher, [event.target.name]: event.target.value });
  };

  const handleSelectChange = ({
    name,
    value,
  }: {
    name: string;
    value: any;
  }) => {
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    saveTeacher(teacher)
      .unwrap()
      .then(
        () => {
          toast("successfully added", {
            position: "top-right",
            autoClose: 3000,
          });
          props.onAfterSubmit();
        },
        () => console.log("Rejected")
      )
      .catch(console.error);
  };

  if (isLoading) return <Spinner />;

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
};
