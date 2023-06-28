import "../../styles/AddEditModal.css";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import { ActionMeta } from "react-select";
import { CourseSubject1, CourseSubjects } from "../../enums/CourseSubject";
import { paginate } from "../../helpers";
import { useModalHooks } from "../../hooks/customHooks";
import { Course } from "../../models/Course";
import { Pagination } from "../../models/Misc";
import {
  useGetCoursesQuery,
  useGetStudentsQuery,
  useGetTeachersQuery,
} from "../../redux/apiSlice";
import { AddModelButton } from "../common/AddModelButton";
import { CourseCardList } from "../common/CourseCardList";
import { DynamicSelect as DS } from "../common/DynamicSelect copy";
import Modal from "../common/Modal";
import PrevNextButtons from "../common/PrevNextButtons";
import { Spinner } from "../common/Spinner";
import { TableListMenu } from "../common/TableListMenu";
import { AddEditCourseForm } from "./AddEditCourseForm";

export const CoursesPage: React.FunctionComponent = () => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectOption>();
  const [openModal, setOpenModal, closeModal] = useModalHooks();
  const [selectedCourse, setSelectedCourse] = useState<Course>({} as Course);
  const [edit, setEdit] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination<Course>>({
    data: [],
    hasPrevOrNext: { prevDisabled: false, nextDisabled: false },
  });
  const [page, setPage] = useState<number>(0);
  const {
    data: courses,
    isLoading: isLoadingCourses,
    isSuccess,
  } = useGetCoursesQuery();
  const { data: teachers, isLoading: isLoadingTeachers } =
    useGetTeachersQuery();
  const { data: students, isLoading: isLoadingStudents } =
    useGetStudentsQuery();

  type SubjectOption = { value: string; label: CourseSubject1 };

  useEffect(() => {
    if (isSuccess) {
      setPagination(paginate(courses, page));
    }
  }, [courses, isSuccess, page]);

  const handleSelectChange = (
    option: SubjectOption | null,
    _actionMeta: ActionMeta<SubjectOption>
  ) => {
    setSelectedSubject(option ?? undefined);
  };

  const handleAfterCloseModal = useCallback(() => {
    setSelectedCourse({} as Course);
    setEdit(false);
  }, []);

  const handleAfterSubmit = () => {
    setOpenModal(false);
  };

  const handleCardClick = useCallback(
    (event: SyntheticEvent<HTMLTableElement>) => {
      const studentToEdit = courses!.find(
        (x) => x._id === event.currentTarget.dataset!.id
      );
      setEdit(true);
      setSelectedCourse(studentToEdit ?? ({} as Course));
      setOpenModal(true);
    },
    [setOpenModal, courses]
  );

  const options: SubjectOption[] = [
    ...CourseSubjects.map((x) => ({ value: x, label: x })),
  ];

  return (
    <>
      <TableListMenu>
        <DS<SubjectOption>
          label={"Subject"}
          options={options}
          value={selectedSubject}
          onChange={handleSelectChange}
        />
        <AddModelButton
          disabled={isLoadingCourses}
          model="course"
          onClick={() => setOpenModal(true)}
        >
          <p>New Course</p>
        </AddModelButton>
      </TableListMenu>
      {openModal && (
        <Modal
          header="Add Course"
          requestClose={closeModal}
          onAfterClose={handleAfterCloseModal}
        >
          {isLoadingTeachers || isLoadingStudents ? (
            <Spinner />
          ) : (
            <AddEditCourseForm
              teachers={teachers!}
              edit={edit}
              course={selectedCourse}
              onAfterSubmit={handleAfterSubmit}
              students={students!}
            />
          )}
        </Modal>
      )}
      {isLoadingCourses && <Spinner />}
      {courses && (
        <CourseCardList
          data={courses}
          filter={(x: Course) =>
            selectedSubject ? x.subject === selectedSubject?.value : true
          }
          onClick={handleCardClick}
        />
      )}
      <PrevNextButtons
        page={page}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        disabled={pagination.hasPrevOrNext}
      />
    </>
  );
};
