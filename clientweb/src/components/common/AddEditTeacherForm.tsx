import '../../styles/Modal.css';

import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';

import TeacherApi from '../../api/teacherApi';
import CourseSubject, { CourseSubjects } from '../../enums/CourseSubject';
import GradeLevel, { GradeLevels } from '../../enums/GradeLevel';
import { Teacher } from '../../models/Teacher';
import { Select } from './Select';
import { TextLabel } from './TextLabel';

interface AddEditTeacherFormProps {
    onAfterSubmit : () => any;
}

export function AddEditTeacherForm(props : AddEditTeacherFormProps) {
    const [teacher, setTeacher] = useState<Teacher>({
        _id: "",
        firstName: "",
        lastName: "",
        subject: CourseSubject.English as CourseSubject,
        grade: GradeLevel.Nine as GradeLevel
     } as Teacher);

    function handleChange (event : ChangeEvent<any>) {
        setTeacher({...teacher, [event.target.name]: event.target.value});
    };

    function handleSubmit(event : SyntheticEvent) {
        event.preventDefault();
        console.log("Pressed");
        TeacherApi.saveTeacher(teacher)
            .then((addedTeacher : Teacher) => {
                console.log("X baby ");
                console.log(addedTeacher);
                toast("successfully added", {
                    position: "top-right",
                    autoClose: 3000
                });
                props.onAfterSubmit();
            }, () => {
                console.log("Rejected");
            })
            .catch(console.error);
    }

    return (
        <form onSubmit={handleSubmit} id="add-edit-teacher-form" className="add-edit-form course-form">
            <TextLabel required={true} label='First Name:' handleChange={handleChange} value={teacher.firstName} id='firstName' name='firstName'/>
            <TextLabel required={true} label='Last Name:' handleChange={handleChange} value={teacher.lastName} id='lastName' name='lastName'/>
            <Select name='subject' onChange={handleChange} value={teacher.subject} label={"subject"} options={CourseSubjects} />
            <Select name='grade' onChange={handleChange} value={teacher.grade} label={"grade"} options={GradeLevels}/>
        </form>
    )
}