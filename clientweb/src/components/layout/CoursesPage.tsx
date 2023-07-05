import "../../styles/AddEditModal.css";
import "../../styles/Page.css";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import { ActionMeta } from "react-select";
import {
  CourseSubjectOption,
  CourseSubjectOptions,
} from "../../enums/CourseSubject";
import { paginate } from "../../helpers";
import { useModalHooks } from "../../hooks/customHooks";
import { Course, CourseQuery } from "../../models/Course";
import { Pagination } from "../../models/Misc";
import { useGetCoursesQuery } from "../../redux/apiSlice";
import { AddModelButton } from "../common/AddModelButton";
import { CardListMenu } from "../common/CardListMenu";
import { CourseCardList } from "../common/CourseCardList";
import { DynamicSelect } from "../common/DynamicSelect";
import Modal from "../common/Modal";
import PrevNextButtons from "../common/PrevNextButtons";
import { Spinner } from "../common/Spinner";
import { AddEditCourseForm } from "./AddEditCourseForm";

export const CoursesPage: React.FunctionComponent = () => {
  const [selectedSubject, setSelectedSubject] = useState<CourseSubjectOption>();
  const [openModal, setOpenModal, closeModal] = useModalHooks();
  const [selectedCourse, setSelectedCourse] = useState<CourseQuery>(
    {} as CourseQuery
  );
  const [edit, setEdit] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination<Course>>({
    data: [],
    hasPrevOrNext: { prevDisabled: true, nextDisabled: true },
  });
  const [page, setPage] = useState<number>(0);
  const {
    data: courses,
    isLoading: isLoadingCourses,
    isSuccess,
  } = useGetCoursesQuery();
  const course = edit
    ? selectedCourse
    : {
        _id: "",
        number: "",
        name: "",
        teacher: "",
        subject: undefined,
        students: [],
      };

  useEffect(() => {
    if (isSuccess) {
      const fileredCourses = courses?.filter((x: Course) =>
        selectedSubject ? x.subject === selectedSubject?.value : true
      );
      setPagination(paginate(fileredCourses, page));
    }
  }, [courses, isSuccess, page, selectedSubject]);

  const handleSelectChange = (
    option: CourseSubjectOption | null,
    _actionMeta: ActionMeta<CourseSubjectOption>
  ) => {
    setSelectedSubject(option ?? undefined);
    setPage(0);
  };

  const handleAfterCloseModal = useCallback(() => {
    setSelectedCourse({} as CourseQuery);
    setEdit(false);
  }, []);

  const handleAfterSubmit = () => {
    setOpenModal(false);
  };

  const handleCardClick = useCallback(
    (event: SyntheticEvent<HTMLTableElement>) => {
      let courseToEdit = courses!.find(
        (x) => x._id === event.currentTarget.dataset!.id
      );
      const _courseToEdit = {
        ...courseToEdit,
        teacher: courseToEdit?.teacher._id?.toString(),
        students: courseToEdit?.students.map((x) => x._id?.toString()),
      } as CourseQuery;
      setEdit(true);
      setSelectedCourse(_courseToEdit);
      setOpenModal(true);
    },
    [setOpenModal, courses]
  );

  return (
    <>
      <h1 className="page-header teacher--page-header">Courses</h1>
      <CardListMenu>
        <DynamicSelect
          isClearable={true}
          isDisabled={isLoadingCourses}
          label={"Subject"}
          options={CourseSubjectOptions}
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
      </CardListMenu>
      {openModal && (
        <Modal
          header="Add Course"
          requestClose={closeModal}
          onAfterClose={handleAfterCloseModal}
        >
          <AddEditCourseForm
            // teachers={teachers!}
            edit={edit}
            course={selectedCourse}
            onAfterSubmit={handleAfterSubmit}
            // students={students!}
          />
        </Modal>
      )}
      {isLoadingCourses && <Spinner />}
      {courses && (
        <CourseCardList data={pagination.data} onClick={handleCardClick} />
      )}
      <PrevNextButtons
        show={isSuccess}
        page={page}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        disabled={pagination.hasPrevOrNext}
      />
    </>
  );
};
