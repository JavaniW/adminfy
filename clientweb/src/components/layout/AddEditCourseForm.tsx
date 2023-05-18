import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import CourseSubject, { CourseSubjects } from "../../enums/CourseSubject";
import { Course, CourseQuery } from "../../models/Course";
import { Teacher } from "../../models/Teacher";
import { useSaveCourseMutation } from "../../redux/apiSlice";
import { DynamicSelect, option } from "../common/DynamicSelect";
import { Spinner } from "../common/Spinner";
import { TextInput } from "../common/TextInput";

interface Props {
  onAfterSubmit: () => any;
  course?: Course;
  edit: boolean;
  teachers: Teacher[];
}

export const AddEditCourseForm: React.FunctionComponent<Props> = (props) => {
  const [course, setCourse] = useState<CourseQuery>(
    props.edit
      ? ({
          ...props.course!,
          teacher: props.course!.teacher._id,
        } as CourseQuery)
      : {
          _id: "",
          number: "",
          name: "",
          teacher: "",
          subject: "" as CourseSubject,
          students: [],
        }
  );

  useEffect(() => {
    console.log(`Starting course:`);
    console.log(course);
  }, []);

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
      <button type="submit">Submit</button>
    </form>
  );
};
