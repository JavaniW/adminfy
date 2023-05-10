import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CourseApi from '../../api/courseApi';
import CourseSubject, { CourseSubjects } from '../../enums/CourseSubject';
import { Course } from '../../models/Course';
import { Teacher } from '../../models/Teacher';
import { TextInput } from '../common/TextInput';
import TeacherApi from '../../api/teacherApi';
import { DynamicSelect, option } from '../common/DynamicSelect';

interface AddEditFormProps {
    onAfterSubmit : () => any;
}

export type CourseDto = Omit<Course, "teacher"> & { teacher: string}

export function AddEditCourseForm(props: AddEditFormProps) { 
    const [course, setCourse] = useState<CourseDto>(
        {
            number: "",
            name: "",
            teacher: "",
            subject: "" as CourseSubject,
            students: []
        }
    );

    const [_teacherOptions, setTeacherOptions] = useState<Teacher[]>([]);

    useEffect(() => {
        console.log("rendering...")
        TeacherApi.getTeachers()
            .then(res => {
                setTeacherOptions(res);
            })
    }, [])

    function handleSelectChange ({name, value} : {name: string, value: any}) {
        setCourse({...course, [name]: value});
    };

    function handleChange (event : ChangeEvent<any>) {
        setCourse({...course, [event.target.name]: event.target.value});
    };

    function handleSubmit(event : SyntheticEvent) {
        event.preventDefault();
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

    const teacherOptionsReal : option[] = [
        {
            label: "",
            value: {}
        },
        ..._teacherOptions
        .filter(x => x.subject === course.subject)
        .map(x => (
            {
                label: x.firstName + " " + x.lastName,
                value: x._id
            } as option
        ))
    ];

    const courseSubjectOptions : option[] = [
        {
            label: "",
            value: ""
        },
        ...CourseSubjects
        .map(x => (
            {
                label: x,
                value: x
            } as option
        ))
    ]

    return (
        <form onSubmit={handleSubmit} id="add-edit-course-form" className="add-edit-form course-form">
            <TextInput label='Number:' handleChange={handleChange} value={course.number} name='number' required={true}/>
            <TextInput label='Name:' handleChange={handleChange} value={course.name} name='name' required={true}/>
            <DynamicSelect label="Subject" name='subject' onSelectChange={handleSelectChange} arrayOfOptions={courseSubjectOptions} value={course.subject}/>
            <DynamicSelect label="Teacher" name='teacher' onSelectChange={handleSelectChange} arrayOfOptions={teacherOptionsReal} value={course.teacher}/>
        </form>
    )
}