import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import CourseSubject, {
  CourseSubject1,
  CourseSubjectType,
  CourseSubjects,
  CourseSubjects1,
} from "../../enums/CourseSubject";
import { Course, CourseQuery } from "../../models/Course";
import { Teacher } from "../../models/Teacher";
import { useSaveCourseMutation } from "../../redux/apiSlice";
import { DynamicSelect, option } from "../common/DynamicSelect";
import { Spinner } from "../common/Spinner";
import { TextInput } from "../common/TextInput";
import Student from "../../models/Student";
import { DynamicSelect as DS } from "../common/DynamicSelect copy";
import { ActionMeta, SingleValue } from "react-select";

interface Props {
  onAfterSubmit: () => any;
  course: Course;
  edit: boolean;
  teachers: Teacher[];
  students: Student[];
}

export const AddEditCourseForm: React.FunctionComponent<Props> = (props) => {
  const [course, setCourse] = useState<CourseQuery>(
    props.edit
      ? ({
          ...props.course,
          teacher: props.course.teacher._id,
          students: props.course.students?.map((x) => x._id),
        } as CourseQuery)
      : {
          _id: "",
          number: "",
          name: "",
          teacher: "",
          subject: undefined,
          students: [],
        }
  );
  const [students, setStudents] = useState<string[] | string>([]);

  const [saveCourse, { isLoading }] = useSaveCourseMutation();

  const handleSelectChange = ({
    name,
    value,
  }: {
    name: string;
    value: any;
  }) => {
    setCourse({ ...course, [name]: value });
  };

  const handleChange = (event: ChangeEvent<any>) => {
    // debugger;
    setCourse({ ...course, [event.target.name]: event.target.value });
  };

  type SubjectOption = { value: string; label: CourseSubject1 };

  const handleSelectChange1 = (option: any, actionMeta: any) => {
    setCourse({ ...course, [actionMeta.name]: option?.value ?? undefined });
  };

  useEffect(() => {
    console.log(students);
  }, [students]);

  const handleStudentChange = ({
    name,
    value,
  }: {
    name: string;
    value: string[] | string;
  }) => {
    // console.log(value);
    // debugger;
    setStudents(value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(`Final course:`);
    console.log(course);
    const _students = [students].flat();
    saveCourse({ ...course, students: _students })
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

  const teacherOptionsReal: option[] = [
    {
      label: "",
      value: {},
    },
    ...props.teachers
      .filter((x) => x.subject === course.subject)
      .map(
        (x) =>
          ({
            label: x.firstName + " " + x.lastName,
            value: x._id,
          } as option)
      ),
  ];

  const studentOptions: option[] = [
    {
      label: "",
      value: "",
    },
    ...props.students.map(
      (x) =>
        ({
          label: x.firstName + " " + x.lastName,
          value: x._id,
        } as option)
    ),
  ];

  const courseSubjectOptions: option[] = [
    {
      label: "",
      value: "",
    },
    ...CourseSubjects.map(
      (x) =>
        ({
          label: x,
          value: x,
        } as option)
    ),
  ];

  const options = CourseSubjects.map((x) => ({
    label: x,
    value: x,
  }));

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      id="add-edit-course-form"
      className="add-edit-form course-form"
    >
      <TextInput
        label="Number:"
        handleChange={handleChange}
        value={course.number}
        name="number"
        required={true}
      />
      <TextInput
        label="Name:"
        handleChange={handleChange}
        value={course.name}
        name="name"
        required={true}
      />
      <DS<{ label: string; value: string }>
        label="Subject"
        name="subject"
        onChange={handleSelectChange1}
        getOptionLabel={(x) => x.label}
        getOptionValue={(x) => x.value}
        options={options}
        value={{
          label: course.subject?.toString() ?? "",
          value: course.subject ?? "",
        }}
      />
      {/* <DS
        label="Teacher"
        onChange={handleSelectChange}
        options={teacherOptionsReal}
        value={course.teacher}
      /> */}
      {/* <DS
        label="Students"
        onChange={(e) => {
          // debugger;
          handleStudentChange(e);
        }}
        options={studentOptions}
        value={students}
        multiple={true}
      /> */}
      <button type="submit">Submit</button>
    </form>
  );
};
