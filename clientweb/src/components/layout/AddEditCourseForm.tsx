import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CourseSubjectOptions } from "../../enums/CourseSubject";
import { getFullName, getOptionValue, getOptionValues } from "../../helpers";
import { CourseQuery } from "../../models/Course";
import { StudentOption } from "../../models/Student";
import { TeacherOption } from "../../models/Teacher";
import {
  apiSlice,
  useDeleteCourseMutation,
  useSaveCourseMutation,
} from "../../redux/apiSlice";
import { useAppDispatch } from "../../redux/store";
import { AsyncDynamicSelect } from "../common/AsyncDynamicSelect";
import { DynamicSelect } from "../common/DynamicSelect";
import { Spinner } from "../common/Spinner";
import { TextInput } from "../common/TextInput";

interface Props {
  onAfterSubmit: () => any;
  course?: CourseQuery;
  edit: boolean;
}

export const AddEditCourseForm: React.FunctionComponent<Props> = (props) => {
  const initialCourse = props.course ?? {
    _id: "",
    number: "",
    name: "",
    teacher: "",
    subject: undefined,
    students: [],
  };
  const [course, setCourse] = useState<CourseQuery>(initialCourse);
  const [teacherOptions, setTeacherOptions] = useState<TeacherOption[]>();
  const [studentOptions, setStudentOptions] = useState<TeacherOption[]>();
  const [isLoadingTeacherOptions, setIsLoadingTeacherOptions] =
    useState<boolean>(true);
  const [isLoadingStudentOptions, setIsLoadingStudentOptions] =
    useState<boolean>(true);

  const [saveCourse, { isLoading: isSaving }] = useSaveCourseMutation();
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCourse(
      props.course ?? {
        _id: "",
        number: "",
        name: "",
        teacher: "",
        subject: undefined,
        students: [],
      }
    );
  }, [props.course]);

  const handleTextInputChange = (event: ChangeEvent<any>) => {
    setCourse({ ...course, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    saveCourse(course)
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
      .finally(() => props.onAfterSubmit());
  };

  const handleDelete = (event: SyntheticEvent) => {
    deleteStudent(course._id!.toString())
      .unwrap()
      .then(
        () => {
          toast.success("Course deleted");
          props.onAfterSubmit();
        },
        (err) => {
          toast.error(`${err}`);
        }
      )
      .catch(console.error)
      .finally(() => props.onAfterSubmit());
  };

  const loadStudentOptions = (
    _inputValue: string,
    callback: (options: StudentOption[]) => void
  ) => {
    dispatch(apiSlice.endpoints.getStudents.initiate())
      .unwrap()
      .then(
        (res) => {
          setIsLoadingStudentOptions(false);
          const options = res.map(
            (x) =>
              ({
                value: x._id,
                label: getFullName(x, "firstName", "lastName"),
              } as StudentOption)
          );
          setStudentOptions(options);
          callback(options);
        },
        (err) => {
          console.log("Error");
        }
      );
  };

  const loadTeacherOptions = (
    _inputValue: string,
    callback: (options: TeacherOption[]) => void
  ) => {
    dispatch(apiSlice.endpoints.getTeachers.initiate())
      .unwrap()
      .then(
        (res) => {
          setIsLoadingTeacherOptions(false);
          const options = res.map(
            (x) =>
              ({
                value: x._id,
                label: getFullName(x, "firstName", "lastName"),
              } as TeacherOption)
          );
          setTeacherOptions(options);
          callback(options);
        },
        (err) => {
          console.log("Error");
        }
      );
  };

  if (isSaving || isDeleting) return <Spinner />;

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
        required
        isClearable={false}
        label="Subject"
        placeholder="Subject"
        onChange={(newVal) => setCourse({ ...course, subject: newVal!.value })}
        options={CourseSubjectOptions}
        value={getOptionValue(CourseSubjectOptions, course.subject)}
      />
      <AsyncDynamicSelect
        required
        isLoading={isLoadingTeacherOptions}
        label="Teacher"
        cacheOptions
        defaultOptions
        value={getOptionValue(teacherOptions!, course.teacher)}
        loadOptions={loadTeacherOptions}
        // filterOption={(op, in) => teacherOptions}
        onChange={(newVal) => setCourse({ ...course, teacher: newVal!.value })}
      />
      <AsyncDynamicSelect
        isLoading={isLoadingStudentOptions}
        isClearable={true}
        label="Students"
        cacheOptions
        defaultOptions
        isMulti={true}
        loadOptions={loadStudentOptions}
        onChange={(newVal) =>
          setCourse({ ...course, students: newVal!.map((x) => x.value) })
        }
        value={getOptionValues(studentOptions!, course.students)}
      />
      <div className="edit-form-buttons">
        <button
          type="button"
          disabled={course._id ? false : true}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
