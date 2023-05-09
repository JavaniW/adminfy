import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';

import CourseApi from '../../api/courseApi';
import CourseSubject, { CourseSubjects } from '../../enums/CourseSubject';
import GradeLevel from '../../enums/GradeLevel';
import { Course } from '../../models/Course';
import { Teacher } from '../../models/Teacher';
import { Select } from './Select';

interface AddEditFormProps {
    onAfterSubmit : () => any;
}


export function AddEditCourseForm(props: AddEditFormProps) {
    const [course, setCourse] = useState<Course>(
        {
            number: "",
            name: "",
            teacher: {} as Teacher,
            subject: CourseSubject.English,
            students: []
        }
    )
    
    const teacher : Teacher = {
        _id: "12324",
        image: "",
        firstName: "James",
        lastName: "Gunn",
        grade: GradeLevel.Nine,
        subject: CourseSubject.English
      }

    function handleChange (event : ChangeEvent<any>) {
        setCourse({...course, [event.target.name]: event.target.value});
    };

    function handleSubmit(event : SyntheticEvent) {
        event.preventDefault();
        console.log("Pressed");
        CourseApi.saveCourse(course)
            .then((addedCourse : Course) => {
                console.log(addedCourse);
                toast("successfully added", {
                    position: "top-right",
                    autoClose: 3000
                });
                props.onAfterSubmit();
            })
            .catch(console.error);
    }

    return (
        <form onSubmit={handleSubmit} id="add-edit-teacher-form" className="add-edit-form course-form">
            <label>
                <p>Number:</p>
                <input onChange={handleChange} value={course.number} type="text" name="number" id="number"/>
            </label>
            <label>
                <p>Name:</p>
                <input onChange={handleChange} value={course.name} type="text" name="name" id="name"/>
            </label>
            <Select name='subject' onChange={handleChange} value={course.subject} label={"Subject"} options={CourseSubjects} />
            <Select name='teacher' onChange={handleChange} value={course.teacher} label={"Teacher"} options={[teacher].map(x => `${x.firstName} ${x.lastName}`)}/>
        </form>
    )
}