import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import CourseApi from "../../api/courseApi";
import TeacherApi from "../../api/teacherApi";
import CourseSubject, { CourseSubjects } from "../../enums/CourseSubject";
import { getFullName } from "../../helpers";
import { Course, CourseQuery } from "../../models/Course";
import { Teacher } from "../../models/Teacher";
import { DynamicSelect, option } from "../common/DynamicSelect";
import { TextInput } from "../common/TextInput";

interface Props {
  onAfterSubmit: () => any;
  course?: Course;
  edit: boolean;
  teachers: Teacher[];
}

export const AddEditCourseForm: React.FunctionComponent<Props> = (props) => {
  const _course = props.edit
    ? ({
        ...props.course!,
        teacher: getFullName(props.course!.teacher, "firstName", "lastName"),
      } as CourseQuery)
    : {
        number: "",
        name: "",
        teacher: "",
        subject: "" as CourseSubject,
        students: [],
      };

  const [course, setCourse] = useState<CourseQuery>(_course);

  const [_teacherOptions, setTeacherOptions] = useState<Teacher[]>([]);


  // useEffect(() => {
  //   TeacherApi.getTeachers().then((res) => {
  //     setTeacherOptions(res);
  //   });
  // }, [course, props.course]);

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
    setCourse({ ...course, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    CourseApi.saveCourse(course)
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

  // useEffect(() => {
  //   console.log(props.course);
  //   console.log(props.edit);
  // }, []);

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
      <DynamicSelect
        label="Subject"
        name="subject"
        onSelectChange={handleSelectChange}
        arrayOfOptions={courseSubjectOptions}
        value={course.subject}
      />
      <DynamicSelect
        label="Teacher"
        name="teacher"
        onSelectChange={handleSelectChange}
        arrayOfOptions={teacherOptionsReal}
        value={course.teacher}
      />
    </form>
  );
};
