import "../../styles/AddEditModal.css";
import "../../styles/Page.css";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import { ActionMeta } from "react-select";
import {
  CourseSubjectOption,
  CourseSubjectOptions,
} from "../../enums/CourseSubject";
import { ScreenSize } from "../../enums/ScreenSize";
import { paginate } from "../../helpers";
import { useModalHooks, useScreenSize } from "../../hooks/customHooks";
import { Course, CourseQuery } from "../../models/Course";
import { Pagination } from "../../models/Misc";
import { useGetCoursesQuery } from "../../redux/apiSlice";
import { AddEditPanel } from "../common/AddEditPanel";
import { AddEntityButton } from "../common/AddEntityButton";
import AdminfyModelList from "../common/AdminfyEntityList";
import { CardListMenu } from "../common/CardListMenu";
import { CourseCardList } from "../common/CourseCardList";
import { DynamicSelect } from "../common/DynamicSelect";
import FlexGridLayout from "../common/FlexGridLayout";
import Modal from "../common/Modal";
import PrevNextButtons from "../common/PrevNextButtons";
import { Spinner } from "../common/Spinner";
import { AddEditCourseForm } from "./AddEditCourseForm";

export const CoursesPage: React.FunctionComponent = () => {
  const [selectedSubject, setSelectedSubject] = useState<CourseSubjectOption>();
  const [openModal, setOpenModal, closeModal] = useModalHooks();
  const [selectedCourse, setSelectedCourse] = useState<CourseQuery>();
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

  const screenSize: ScreenSize = useScreenSize();

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
    // setSelectedCourse({} as CourseQuery);
    // setEdit(false);
  }, []);

  const isMobile = screenSize < ScreenSize.Small;

  const resetForm = useCallback(() => {
    setSelectedCourse(undefined);
    console.log("Reset Form");
  }, []);

  const handleAddEntityButtonClick = useCallback(() => {
    if (isMobile) setOpenModal(true);
    else if (edit) closeModal();
    resetForm();
    setEdit(false);
  }, [closeModal, edit, isMobile, resetForm, setOpenModal]);

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
      <h3 className="page-header teacher--page-header">Courses</h3>
      <FlexGridLayout>
        <AdminfyModelList>
          <CardListMenu>
            <DynamicSelect
              isClearable={true}
              isDisabled={isLoadingCourses}
              label={"Subject"}
              options={CourseSubjectOptions}
              value={selectedSubject}
              onChange={handleSelectChange}
            />
            {(isMobile || edit) && (
              <AddEntityButton
                disabled={isLoadingCourses}
                model="course"
                onClick={handleAddEntityButtonClick}
              >
                <p>{!isMobile && edit ? "Cancel" : "New Course"}</p>
              </AddEntityButton>
            )}
          </CardListMenu>
          {isMobile && openModal && (
            <Modal
              header={edit ? "Edit Course" : "Add Course"}
              requestClose={closeModal}
              onAfterClose={handleAfterCloseModal}
              isMobile={isMobile}
            >
              <AddEditPanel header={edit ? "Edit Course" : "Add Course"}>
                <AddEditCourseForm edit={edit} course={selectedCourse} />
              </AddEditPanel>
            </Modal>
          )}
          {isLoadingCourses && <Spinner />}
          {courses && (
            <CourseCardList data={pagination.data} onClick={handleCardClick} />
          )}
          <PrevNextButtons
            show={isSuccess && courses.length > 0}
            page={page}
            onPrev={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
            disabled={pagination.hasPrevOrNext}
          />
        </AdminfyModelList>
        {!isMobile && (
          <AddEditPanel header={edit ? "Edit Course" : "Add Course"}>
            <AddEditCourseForm course={selectedCourse} edit={edit} />
          </AddEditPanel>
        )}
      </FlexGridLayout>
    </>
  );
};
