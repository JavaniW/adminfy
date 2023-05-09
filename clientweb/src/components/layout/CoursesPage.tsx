import '../../styles/CoursesPage.css';
import "../../styles/AddEditModal.css";

import { useCallback, useEffect, useState } from 'react';

import CourseApi from '../../api/courseApi';
import { CourseSubject, CourseSubjects } from '../../enums/CourseSubject';
import GradeLevel from '../../enums/GradeLevel';
import ModelType from '../../enums/ModelType';
import { nameof } from '../../extensions';
import { Course } from '../../models/Course';
import { Teacher } from '../../models/Teacher';
import { AddEditCourseForm } from '../common/AddEditCourseForm';
import { AddEditModal } from '../common/AddEditModal';
import { Select } from '../common/Select';
import { Header, TableList } from '../common/TableList';

export function CoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState<keyof Course | "All">(
    "All"
  );
  const [showSubject, setShowSubject] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>();

  const addCourseButton = <button className="add-course-button"><p>New Course</p></button>;

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSubject(event.target.value as keyof Course | "All");
    setShowSubject(event.target.value === "All");
  }

  function handleOpenModal() {
    setOpenModal(true);
  };

function handleAfterSubmit() {
  setOpenModal(false);
  loadData();
}

const loadData = useCallback(() => {
  CourseApi.getCourses()
    .then(results => {
      const _courses = results.map((x : Course )=> x as Course);
      setCourses(_courses);
    });
}, []);

const teacher : Teacher = {
  image: "",
  firstName: "James",
  lastName: "Gunn",
  grade: GradeLevel.Nine,
  subject: CourseSubject.English
}

useEffect(loadData, [loadData]);

  const _courses: Course[] = [
    {
      number: 1234,
      name: "Intro to Science",
      subject: CourseSubject.Science,
      teacher: teacher,
      students: [],
    },
    {
      number: 1234,
      name: "Intro to Math",
      subject: CourseSubject.Math,
      teacher: teacher,
      students: [],
    },
    {
      number: 1234,
      name: "Intro to English",
      subject: CourseSubject.English,
      teacher: teacher,
      students: [],
    },
    {
      number: 1234,
      name: "Calc I",
      subject: CourseSubject.Math,
      teacher: teacher,
      students: [],
    },
    {
      number: 1234,
      name: "English I",
      subject: CourseSubject.English,
      teacher: teacher,
      students: [],
    }
  ];

  const headers: Header<Course>[] = [
    {
      label: "Course Number",
      referenceData: (x : Course) => x.number,
    },
    {
      label: "Subject",
      referenceData: (x : Course) => x.subject,
    },
    {
      label: "Teacher",
      referenceData: (x : Course) => `${x.teacher.firstName} ${x.teacher.lastName}`,
    },
    {
      label: "Students Enrolled",
      referenceData: (x : Course) => x.students.length,
    }
  ];

  return (
    <div className="courses-page">
        <Select name='Subject' default={"All"} options={CourseSubjects} label={"Subject"} onChange={handleSelectChange} />
        <AddEditModal 
          openModal={handleOpenModal} 
          closeModal={() => setOpenModal(false)} 
          form={ModelType.Course} 
          trigger={addCourseButton} 
          open={openModal}
        >
          <AddEditCourseForm onAfterSubmit={handleAfterSubmit}/>
        </AddEditModal>
        <div className="table-list-page">
          <TableList
            data={_courses}
            headers={headers}
            filterSource={nameof<Course>("subject")}
            filterValue={selectedSubject}
          />
       </div>
    </div>
  );
}
