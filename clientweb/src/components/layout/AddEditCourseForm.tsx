import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";

import { CourseSubjectOptions } from "../../enums/CourseSubject";
import { getFullName, getOptionValue, getOptionValues } from "../../helpers";
import { Course, CourseQuery } from "../../models/Course";
import Student from "../../models/Student";
import { Teacher } from "../../models/Teacher";
import { useSaveCourseMutation } from "../../redux/apiSlice";
import { DynamicSelect } from "../common/DynamicSelect";
import { Spinner } from "../common/Spinner";
import { TextInput } from "../common/TextInput";

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

  const [saveCourse, { isLoading }] = useSaveCourseMutation();

  const handleTextInputChange = (event: ChangeEvent<any>) => {
    setCourse({ ...course, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(`Final course:`);
    console.log(course);
    saveCourse(course)
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

  const teacherOptions = props.teachers.map((x) => ({
    value: x._id!.toString(),
    label: getFullName(x, "firstName", "lastName"),
  }));
  const studentOptions = props.students.map((x) => ({
    value: x._id!.toString(),
    label: getFullName(x, "firstName", "lastName"),
  }));

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      id="add-edit-course-form"
      className="add-edit-form course-form"
    >
      <TextInput
        label="Number"
        placeholder="Number"
        onChange={handleTextInputChange}
        value={course.number}
        name="number"
        required={true}
      />
      <TextInput
        placeholder="Name"
        label="Name"
        onChange={handleTextInputChange}
        value={course.name}
        name="name"
        required={true}
      />
      <DynamicSelect
        isClearable={false}
        label="Subject"
        placeholder="Subject"
        onChange={(newVal) => setCourse({ ...course, subject: newVal!.value })}
        options={CourseSubjectOptions}
        value={getOptionValue(CourseSubjectOptions, course.subject)}
      />
      <DynamicSelect
        placeholder="Teacher"
        label="Teacher"
        isClearable={false}
        options={teacherOptions}
        value={getOptionValue(teacherOptions, course.teacher)}
        onChange={(newVal) =>
          setCourse({ ...course, teacher: newVal!.value.toString() })
        }
      />
      <DynamicSelect
        isMulti={true}
        placeholder="Students"
        label="Students"
        isClearable={false}
        options={studentOptions}
        value={getOptionValues(studentOptions, course.students)}
        onChange={(newVal) => {
          setCourse({ ...course, students: newVal!.map((x) => x.value) });
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
